# Onboarding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng wizard onboarding 3 bước (ngày dự sinh → cân nặng → thông tin bé) hiển thị sau lần đăng nhập đầu tiên, lưu từng bước vào Supabase `profiles` table.

**Architecture:** Multi-route wizard dùng TanStack Router file-based routing. `routes/onboarding.tsx` là layout parent tại `/onboarding`, các step routes nằm trong `routes/onboarding/` directory. Mỗi bước lưu Supabase ngay khi submit. Auth store giữ `profile` state; `_auth.tsx` redirect vào onboarding nếu `onboarding_completed = false`.

**Tech Stack:** React 19, TanStack Router, MUI v6, `@mui/x-date-pickers` v8, dayjs, Supabase, Zustand, react-hook-form, zod, Vitest.

**Design reference:** `docs/features/onboarding/2026-05-24-onboarding-design.pen` — implement JSX bám sát file này.

---

## File Structure

```
# TẠO MỚI
supabase/migrations/<timestamp>_create_profiles_table.sql  — migration schema
libs/utils/src/lib/bmi.ts                              — calcBmi(), calcWeightGainTip()
libs/utils/src/lib/bmi.spec.ts                        — tests
libs/utils/src/lib/lmp.ts                              — calcDueDateFromLmp(), calcPregnancyWeek()
libs/utils/src/lib/lmp.spec.ts                        — tests
libs/api/src/lib/profiles.ts                           — Profile type + profilesApi
apps/web/src/routes/onboarding.tsx                     — Layout parent tại /onboarding
apps/web/src/routes/onboarding/due-date/index.tsx      — Màn hình 1a: Tính từ LMP  → /onboarding/due-date
apps/web/src/routes/onboarding/due-date/direct.tsx     — Màn hình 1b: Nhập trực tiếp → /onboarding/due-date/direct
apps/web/src/routes/onboarding/weight.tsx              — Màn hình 2: Cân nặng & BMI → /onboarding/weight
apps/web/src/routes/onboarding/baby.tsx                — Màn hình 3: Thông tin bé   → /onboarding/baby

# CHỈNH SỬA
libs/utils/src/index.ts                                — re-export bmi, lmp
libs/api/src/index.ts                                  — re-export profilesApi, Profile
apps/web/src/stores/auth.store.ts                      — thêm profile state + _setProfile
apps/web/src/app/providers.tsx                         — fetch profile trong AuthInitializer
apps/web/src/routes/_auth.tsx                          — thêm onboarding redirect guard
```

---

## Task 0: Database — tạo migration và push lên Supabase

**Files:**

- Create: `supabase/migrations/<timestamp>_create_profiles_table.sql`

- [ ] **Step 1: Tạo migration file**

```bash
supabase migration new create_profiles_table
```

Expected: tạo file `supabase/migrations/<timestamp>_create_profiles_table.sql`

- [ ] **Step 2: Viết SQL vào migration file vừa tạo**

```sql
create table profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  due_date      date,
  weight_kg     numeric(5,1),
  height_cm     numeric(5,1),
  baby_name     text,
  baby_gender   text check (baby_gender in ('male', 'female', 'unknown')),
  is_twins      boolean not null default false,
  onboarding_completed boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users manage own profile"
  on profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
```

- [ ] **Step 3: Push migration lên Supabase remote**

```bash
supabase db push
```

Expected output: `Applying migration <timestamp>_create_profiles_table.sql... done`

Nếu gặp lỗi xác thực, chạy `supabase login` trước.

- [ ] **Step 4: Verify bảng đã tạo**

```bash
supabase db diff
```

Expected: `No schema changes found` (migration đã được apply, không còn diff)

- [ ] **Step 5: Commit**

```bash
git add supabase/migrations/
git commit -m "feat(db): add profiles table migration with RLS and new user trigger"
```

---

## Task 1: Utils — calcBmi + calcWeightGainTip (TDD)

**Files:**

- Create: `libs/utils/src/lib/bmi.ts`
- Create: `libs/utils/src/lib/bmi.spec.ts`

- [ ] **Step 1: Viết test cho calcBmi và calcWeightGainTip**

```ts
// libs/utils/src/lib/bmi.spec.ts
import { describe, it, expect } from 'vitest';
import { calcBmi, calcWeightGainTip } from './bmi';

describe('calcBmi', () => {
  it('tính đúng BMI', () => {
    expect(calcBmi(58.5, 162)).toBeCloseTo(22.3, 1);
  });
  it('tính đúng BMI — underweight case', () => {
    expect(calcBmi(42, 150)).toBeCloseTo(18.7, 1);
  });
});

describe('calcWeightGainTip', () => {
  it('trả về tip tuần 0 khi weekNumber = 0', () => {
    const tip = calcWeightGainTip(22, 0);
    expect(tip).toContain('tuần thứ 0');
    expect(tip).toContain('0 kg');
  });
  it('trả về tip với khoảng tăng cân cho BMI bình thường', () => {
    const tip = calcWeightGainTip(22, 24);
    expect(tip).toContain('24');
    expect(tip).toMatch(/\d+\.\d+ - \d+\.\d+ kg/);
  });
  it('underweight (BMI < 18.5) có min gain cao hơn normal', () => {
    const getMin = (tip: string) =>
      parseFloat(tip.match(/khoảng ([\d.]+)/)![1]);
    expect(getMin(calcWeightGainTip(17, 20))).toBeGreaterThan(
      getMin(calcWeightGainTip(22, 20)),
    );
  });
  it('overweight (BMI >= 25) có min gain thấp hơn normal', () => {
    const getMin = (tip: string) =>
      parseFloat(tip.match(/khoảng ([\d.]+)/)![1]);
    expect(getMin(calcWeightGainTip(27, 20))).toBeLessThan(
      getMin(calcWeightGainTip(22, 20)),
    );
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận FAIL**

```bash
pnpm nx test utils -- --run
```

Expected: lỗi `Cannot find module './bmi'`

- [ ] **Step 3: Implement bmi.ts**

```ts
// libs/utils/src/lib/bmi.ts
export function calcBmi(weightKg: number, heightCm: number): number {
  return weightKg / Math.pow(heightCm / 100, 2);
}

function gainRange(bmi: number): [number, number] {
  if (bmi < 18.5) return [12.5, 18];
  if (bmi < 25) return [11.5, 16];
  if (bmi < 30) return [7, 11.5];
  return [5, 9];
}

export function calcWeightGainTip(bmi: number, weekNumber: number): string {
  if (weekNumber === 0)
    return 'Khi thai kỳ bước sang tuần thứ 0, mức cân nặng tăng lý tưởng của bạn từ 0 kg.';
  const [minTotal, maxTotal] = gainRange(bmi);
  const ratio = weekNumber / 40;
  const minGain = (minTotal * ratio).toFixed(1);
  const maxGain = (maxTotal * ratio).toFixed(1);
  return `Tuần thai thứ ${weekNumber}: mức tăng gợi ý hiện tại khoảng ${minGain} - ${maxGain} kg.`;
}
```

- [ ] **Step 4: Chạy test để xác nhận PASS**

```bash
pnpm nx test utils -- --run
```

Expected: tất cả test PASS

- [ ] **Step 5: Commit**

```bash
git add libs/utils/src/lib/bmi.ts libs/utils/src/lib/bmi.spec.ts
git commit -m "feat(utils): add calcBmi and calcWeightGainTip"
```

---

## Task 2: Utils — calcDueDateFromLmp + calcPregnancyWeek (TDD)

**Files:**

- Create: `libs/utils/src/lib/lmp.ts`
- Create: `libs/utils/src/lib/lmp.spec.ts`

- [ ] **Step 1: Viết test cho lmp utils**

```ts
// libs/utils/src/lib/lmp.spec.ts
import { describe, it, expect } from 'vitest';
import dayjs from 'dayjs';
import { calcDueDateFromLmp, calcPregnancyWeek } from './lmp';

describe('calcDueDateFromLmp', () => {
  it('cộng đúng 280 ngày từ LMP', () => {
    expect(calcDueDateFromLmp('2025-09-12')).toBe('2026-06-19');
  });
  it('trả về YYYY-MM-DD format', () => {
    expect(calcDueDateFromLmp('2025-01-01')).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('calcPregnancyWeek', () => {
  it('trả về 0 khi dueDate là null', () => {
    expect(calcPregnancyWeek(null)).toBe(0);
  });
  it('trả về 40 khi đã qua ngày dự sinh', () => {
    expect(calcPregnancyWeek('2020-01-01')).toBe(40);
  });
  it('trả về tuần đúng cho ngày dự sinh 70 ngày nữa', () => {
    const dueDate = dayjs().add(70, 'day').format('YYYY-MM-DD');
    expect(calcPregnancyWeek(dueDate)).toBe(30);
  });
  it('trả về 0 khi dueDate hơn 280 ngày nữa', () => {
    const dueDate = dayjs().add(300, 'day').format('YYYY-MM-DD');
    expect(calcPregnancyWeek(dueDate)).toBe(0);
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận FAIL**

```bash
pnpm nx test utils -- --run
```

Expected: lỗi `Cannot find module './lmp'`

- [ ] **Step 3: Implement lmp.ts**

```ts
// libs/utils/src/lib/lmp.ts
import dayjs from 'dayjs';

export function calcDueDateFromLmp(lmpDateStr: string): string {
  return dayjs(lmpDateStr).add(280, 'day').format('YYYY-MM-DD');
}

export function calcPregnancyWeek(dueDateStr: string | null): number {
  if (!dueDateStr) return 0;
  const daysRemaining = dayjs(dueDateStr).diff(dayjs(), 'day');
  if (daysRemaining <= 0) return 40;
  if (daysRemaining >= 280) return 0;
  return 40 - Math.floor(daysRemaining / 7);
}
```

- [ ] **Step 4: Chạy test để xác nhận PASS**

```bash
pnpm nx test utils -- --run
```

Expected: tất cả test PASS

- [ ] **Step 5: Re-export từ index**

Trong `libs/utils/src/index.ts`, thêm 2 dòng sau dòng export utils hiện tại:

```ts
export * from './lib/bmi.js';
export * from './lib/lmp.js';
```

- [ ] **Step 6: Commit**

```bash
git add libs/utils/src/lib/lmp.ts libs/utils/src/lib/lmp.spec.ts libs/utils/src/index.ts
git commit -m "feat(utils): add calcDueDateFromLmp and calcPregnancyWeek"
```

---

## Task 3: API — profiles service

**Files:**

- Create: `libs/api/src/lib/profiles.ts`
- Modify: `libs/api/src/index.ts`

- [ ] **Step 1: Tạo profiles.ts**

```ts
// libs/api/src/lib/profiles.ts
import { supabase } from './supabase';

export type Profile = {
  id: string;
  due_date: string | null;
  weight_kg: number | null;
  height_cm: number | null;
  baby_name: string | null;
  baby_gender: 'male' | 'female' | 'unknown' | null;
  is_twins: boolean;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
};

export type ProfileUpdate = {
  due_date?: string | null;
  weight_kg?: number | null;
  height_cm?: number | null;
  baby_name?: string | null;
  baby_gender?: 'male' | 'female' | 'unknown';
  is_twins?: boolean;
  onboarding_completed?: boolean;
};

export const profilesApi = {
  get: (userId: string) =>
    supabase.from('profiles').select('*').eq('id', userId).single<Profile>(),

  update: (userId: string, data: ProfileUpdate) =>
    supabase.from('profiles').update(data).eq('id', userId),
};
```

- [ ] **Step 2: Re-export từ api index**

Trong `libs/api/src/index.ts`, thêm dòng sau dòng export supabase hiện tại:

```ts
export {
  profilesApi,
  type Profile,
  type ProfileUpdate,
} from './lib/profiles.js';
```

- [ ] **Step 3: Commit**

```bash
git add libs/api/src/lib/profiles.ts libs/api/src/index.ts
git commit -m "feat(api): add profilesApi service"
```

---

## Task 4: Auth store — thêm profile state

**Files:**

- Modify: `apps/web/src/stores/auth.store.ts`

- [ ] **Step 1: Cập nhật auth.store.ts — thêm profile field và \_setProfile action**

File đầy đủ sau khi sửa:

```ts
// apps/web/src/stores/auth.store.ts
import { create } from 'zustand';
import { supabase } from '@meli/api';
import type { Profile } from '@meli/api';

type Session = Awaited<
  ReturnType<typeof supabase.auth.getSession>
>['data']['session'];
type User = NonNullable<Session>['user'];

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  _setSession: (session: Session | null) => void;
  _setProfile: (profile: Profile | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  profile: null,
  isLoading: false,
  _setSession: (session) => set({ session, user: session?.user ?? null }),
  _setProfile: (profile) => set({ profile }),
  signIn: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({ session: data.session, user: data.session?.user ?? null });
    } finally {
      set({ isLoading: false });
    }
  },
  signOut: async () => {
    await supabase.auth.signOut();
  },
}));
```

- [ ] **Step 2: Typecheck**

```bash
pnpm nx typecheck web
```

Expected: không có lỗi type

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/stores/auth.store.ts
git commit -m "feat(auth): add profile state to auth store"
```

---

## Task 5: Providers — fetch profile trong AuthInitializer

**Files:**

- Modify: `apps/web/src/app/providers.tsx`

- [ ] **Step 1: Thêm import profilesApi và cập nhật AuthInitializer**

Thêm import:

```ts
import { profilesApi } from '@meli/api';
```

Thay toàn bộ function `AuthInitializer`:

```ts
function AuthInitializer({ children }: { children: ReactNode }) {
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      useAuthStore.getState()._setSession(session)
      if (session) {
        const { data: profile } = await profilesApi.get(session.user.id)
        useAuthStore.getState()._setProfile(profile)
      }
      setAuthReady(true)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      useAuthStore.getState()._setSession(session)
      if (session) {
        const { data: profile } = await profilesApi.get(session.user.id)
        useAuthStore.getState()._setProfile(profile)
      } else {
        useAuthStore.getState()._setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!authReady) {
    return (
      <Box sx={{ alignItems: 'center', display: 'flex', height: '100dvh', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return children
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm nx typecheck web
```

Expected: không có lỗi type

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/app/providers.tsx
git commit -m "feat(auth): fetch profile in AuthInitializer after session"
```

---

## Task 6: Auth guard — redirect vào onboarding

**Files:**

- Modify: `apps/web/src/routes/_auth.tsx`

- [ ] **Step 1: Thêm onboarding redirect vào \_auth.tsx**

```ts
// apps/web/src/routes/_auth.tsx
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from '../stores/auth.store'

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const { session, profile } = useAuthStore.getState()
    if (!session) throw redirect({ to: '/login' })
    if (profile && !profile.onboarding_completed) {
      throw redirect({ to: '/onboarding/due-date' })
    }
  },
  component: () => <Outlet />,
})
```

- [ ] **Step 2: Typecheck**

```bash
pnpm nx typecheck web
```

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/routes/_auth.tsx
git commit -m "feat(auth): redirect to onboarding when profile not completed"
```

---

## Task 7: Onboarding layout

**Files:**

- Create: `apps/web/src/routes/onboarding.tsx`
- Create directories: `apps/web/src/routes/onboarding/due-date/`

- [ ] **Step 1: Tạo layout route tại /onboarding**

```ts
// apps/web/src/routes/onboarding.tsx
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Box } from '@mui/material'
import { useAuthStore } from '../stores/auth.store'

export const Route = createFileRoute('/onboarding')({
  beforeLoad: () => {
    const { session } = useAuthStore.getState()
    if (!session) throw redirect({ to: '/login' })
  },
  component: OnboardingLayout,
})

function OnboardingLayout() {
  return (
    <Box sx={{ bgcolor: 'background.default', display: 'flex', justifyContent: 'center', minHeight: '100dvh' }}>
      <Box sx={{ maxWidth: 390, width: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  )
}
```

- [ ] **Step 2: Tạo directory structure**

```bash
mkdir -p apps/web/src/routes/onboarding/due-date
```

- [ ] **Step 3: Typecheck**

```bash
pnpm nx typecheck web
```

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/routes/onboarding.tsx
git commit -m "feat(onboarding): add onboarding layout route"
```

---

## Task 8: Màn hình 1a — Due date từ LMP

**Files:**

- Create: `apps/web/src/routes/onboarding/due-date/index.tsx`

**Design reference:** Frame "01 Due date from LMP" trong `.pen` file.
**Tokens màu:** `primary.main` (meli-primary), theme `background.paper` (meli-paper), `text.primary`, `text.secondary`. Stroke `$meli-coral-100` = `#F08180` (lấy từ design).

**Layout:** Top bar (progress dots, bước 1 active, không có back button) → Hero (icon `PregnantWomanRounded` 54px trong vòng tròn 108px) → Form → Spacer → Footer.

**Progress dots:** 3 pills, gap 6. Active = width 28, height 8, borderRadius 9999, fill `primary.main`. Inactive = width 8, height 8, borderRadius 9999, fill `#F08180`.

- [ ] **Step 1: Tạo due-date/index.tsx**

```ts
// apps/web/src/routes/onboarding/due-date/index.tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { PregnantWomanRounded } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { Dayjs } from 'dayjs'
import { profilesApi } from '@meli/api'
import { calcDueDateFromLmp } from '@meli/utils'
import { useAuthStore } from '../../../stores/auth.store'

export const Route = createFileRoute('/onboarding/due-date/')({
  component: DueDateLmpPage,
})

function DueDateLmpPage() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const [lmp, setLmp] = useState<Dayjs | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const dueDateStr = lmp ? calcDueDateFromLmp(lmp.format('YYYY-MM-DD')) : null

  const handleContinue = async () => {
    if (!dueDateStr || !user) return
    setIsSubmitting(true)
    await profilesApi.update(user.id, { due_date: dueDateStr })
    setIsSubmitting(false)
    navigate({ to: '/onboarding/weight' })
  }

  const handleSkip = () => navigate({ to: '/onboarding/weight' })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack sx={{ height: '100dvh', p: '32px 24px 24px' }} gap="20px">
        {/* Top bar: progress dots only (no back button — first step) */}
        {/* Hero: PregnantWomanRounded trong vòng tròn, title "Ngày dự sinh của bạn", description */}
        {/* Form:
              - DatePicker label "Ngày đầu kỳ kinh cuối" với icon CalendarMonthRounded
              - Due date preview card (chỉ hiện khi dueDateStr !== null):
                  eyebrow "Dự sinh ước tính" (primary color, 12px bold)
                  date hiển thị format DD/MM/YYYY (24px bold)
                  copy "Bạn có thể thay đổi thông tin này sau trong hồ sơ." (secondary, 13px)
              - Link row: "Đã có ngày từ bác sĩ?" + link "Nhập trực tiếp" → /onboarding/due-date/direct
        */}
        {/* Spacer: flex: 1 */}
        {/* Footer:
              Button "Tiếp tục" variant="contained" disabled={!lmp || isSubmitting} onClick={handleContinue}
              Button "Bỏ qua" variant="text" onClick={handleSkip}
        */}
      </Stack>
    </LocalizationProvider>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm nx typecheck web
```

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/routes/onboarding/due-date/index.tsx
git commit -m "feat(onboarding): add due date LMP screen"
```

---

## Task 9: Màn hình 1b — Nhập ngày dự sinh trực tiếp

**Files:**

- Create: `apps/web/src/routes/onboarding/due-date/direct.tsx`

**Design reference:** Frame "01b Direct due date" trong `.pen` file.

**Layout:** Top bar (back button + progress bước 1 active) → Hero (icon `EventAvailableRounded`) → Form → Spacer → Footer.

**Back button:** Box 40×40, borderRadius 20, bgcolor `background.paper`, border `1.5px solid #F08180`, icon `ChevronLeftRounded` 22px.

- [ ] **Step 1: Tạo due-date/direct.tsx**

```ts
// apps/web/src/routes/onboarding/due-date/direct.tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { EventAvailableRounded, ChevronLeftRounded, MedicalInformationRounded } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { Dayjs } from 'dayjs'
import { profilesApi } from '@meli/api'
import { useAuthStore } from '../../../stores/auth.store'

export const Route = createFileRoute('/onboarding/due-date/direct')({
  component: DueDateDirectPage,
})

function DueDateDirectPage() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const [dueDate, setDueDate] = useState<Dayjs | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContinue = async () => {
    if (!dueDate || !user) return
    setIsSubmitting(true)
    await profilesApi.update(user.id, { due_date: dueDate.format('YYYY-MM-DD') })
    setIsSubmitting(false)
    navigate({ to: '/onboarding/weight' })
  }

  const handleSkip = () => navigate({ to: '/onboarding/weight' })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack sx={{ height: '100dvh', p: '32px 24px 24px' }} gap="20px">
        {/* Top bar: back button (→ /onboarding/due-date) + progress bước 1 active */}
        {/* Hero: EventAvailableRounded icon, title "Nhập ngày dự sinh", description */}
        {/* Form:
              - DatePicker label "Ngày dự sinh" với icon CalendarMonthRounded
              - Doctor note card (fill coral-50 = #FFF0F0, icon MedicalInformationRounded primary):
                  "Nếu ngày này thay đổi sau lần khám tiếp theo, bạn vẫn có thể cập nhật trong hồ sơ."
              - Link row: "Muốn tính từ kỳ kinh cuối?" + link "Tính ngày dự sinh" → /onboarding/due-date
        */}
        {/* Spacer */}
        {/* Footer: Button "Tiếp tục" disabled={!dueDate || isSubmitting} + Button "Bỏ qua" */}
      </Stack>
    </LocalizationProvider>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm nx typecheck web
```

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/routes/onboarding/due-date/direct.tsx
git commit -m "feat(onboarding): add direct due date input screen"
```

---

## Task 10: Màn hình 2 — Cân nặng & BMI

**Files:**

- Create: `apps/web/src/routes/onboarding/weight.tsx`

**Design reference:** Frame "02 Weight and BMI" trong `.pen` file.

**Layout:** Top bar (back button → `/onboarding/due-date` + progress bước 2 active) → Hero (`MonitorWeightRounded`) → Form → Spacer → Footer.

**BMI card:** Chỉ render khi cả 2 input hợp lệ. Bên trái: label "BMI của bạn" (13px, secondary). Bên phải: value (28px bold, text.primary). Dưới: tip string từ `calcWeightGainTip`. Style: cornerRadius 20, fill `background.paper`, border `1.5px solid #F08180`.

- [ ] **Step 1: Tạo weight.tsx**

```ts
// apps/web/src/routes/onboarding/weight.tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Box, Button, Stack, Typography } from '@mui/material'
import { MonitorWeightRounded, ChevronLeftRounded } from '@mui/icons-material'
import { profilesApi } from '@meli/api'
import { calcBmi, calcWeightGainTip, calcPregnancyWeek } from '@meli/utils'
import { useAuthStore } from '../../stores/auth.store'

const weightSchema = z.object({
  weight_kg: z.coerce.number().min(20, 'Tối thiểu 20 kg').max(300, 'Tối đa 300 kg'),
  height_cm: z.coerce.number().min(50, 'Tối thiểu 50 cm').max(300, 'Tối đa 300 cm'),
})

type WeightFormValues = z.infer<typeof weightSchema>

export const Route = createFileRoute('/onboarding/weight')({
  component: WeightPage,
})

function WeightPage() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const profile = useAuthStore((s) => s.profile)

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, isSubmitting },
  } = useForm<WeightFormValues>({
    resolver: zodResolver(weightSchema),
    mode: 'onChange',
  })

  const [weightKg, heightCm] = watch(['weight_kg', 'height_cm'])
  const bmi = isValid && weightKg && heightCm ? calcBmi(weightKg, heightCm) : null
  const weekNumber = calcPregnancyWeek(profile?.due_date ?? null)
  const weightTip = bmi !== null ? calcWeightGainTip(bmi, weekNumber) : null

  const onSubmit = async (values: WeightFormValues) => {
    if (!user) return
    await profilesApi.update(user.id, {
      weight_kg: values.weight_kg,
      height_cm: values.height_cm,
    })
    navigate({ to: '/onboarding/baby' })
  }

  const handleSkip = () => navigate({ to: '/onboarding/baby' })

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ height: '100dvh', p: '32px 24px 24px' }}
      gap="20px"
    >
      {/* Top bar: back button (→ /onboarding/due-date) + progress bước 2 active */}
      {/* Hero: MonitorWeightRounded icon, title "Cân nặng của mẹ", description */}
      {/* Form:
            - Input "Cân nặng hiện tại": {...register('weight_kg')}, type="number", icon ScaleRounded bên trái, "kg" label bên phải
            - Input "Chiều cao": {...register('height_cm')}, type="number", icon HeightRounded bên trái, "cm" label bên phải
            - BMI card (chỉ render khi bmi !== null):
                Row: label "BMI của bạn" (trái) + value `{bmi.toFixed(1)}` (phải, 28px bold)
                Text: weightTip (13px, secondary)
      */}
      {/* Spacer */}
      {/* Footer:
            Button type="submit" variant="contained" disabled={!isValid || isSubmitting}: "Tiếp tục"
            Button variant="text" onClick={handleSkip}: "Để sau"
      */}
    </Stack>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm nx typecheck web
```

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/routes/onboarding/weight.tsx
git commit -m "feat(onboarding): add weight and BMI screen"
```

---

## Task 11: Màn hình 3 — Thông tin bé

**Files:**

- Create: `apps/web/src/routes/onboarding/baby.tsx`

**Design reference:** Frame "03 Baby info" trong `.pen` file.

**Layout:** Top bar (back button → `/onboarding/weight` + progress bước 3 active) → Hero (`ChildCareRounded`) → Form → Spacer → Footer.

**Twins toggle:** Row ngang — bên trái `FavoriteRounded` (primary) + label "Mang thai đôi", bên phải custom toggle switch (width 46, height 28, cornerRadius 9999). Off: fill `#F08180`, knob trái. On: fill `primary.main`, knob phải. Implement bằng MUI `Switch` với custom `sx`.

**Quan trọng — profile sync:** Sau khi update `onboarding_completed: true`, cập nhật luôn auth store để tránh redirect loop khi navigate về `/`:

```ts
useAuthStore.getState()._setProfile({
  ...useAuthStore.getState().profile!,
  onboarding_completed: true,
});
```

- [ ] **Step 1: Tạo baby.tsx**

```ts
// apps/web/src/routes/onboarding/baby.tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Box, Button, MenuItem, Select, Stack, Switch, Typography } from '@mui/material'
import { ChildCareRounded, ChevronLeftRounded, FavoriteRounded } from '@mui/icons-material'
import { profilesApi } from '@meli/api'
import { useAuthStore } from '../../stores/auth.store'

const babySchema = z.object({
  baby_name: z.string().optional(),
  baby_gender: z.enum(['unknown', 'male', 'female']).default('unknown'),
  is_twins: z.boolean().default(false),
})

type BabyFormValues = z.infer<typeof babySchema>

export const Route = createFileRoute('/onboarding/baby')({
  component: BabyPage,
})

function BabyPage() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<BabyFormValues>({
    resolver: zodResolver(babySchema),
    defaultValues: { baby_gender: 'unknown', is_twins: false },
  })

  const completeOnboarding = () => {
    useAuthStore.getState()._setProfile({
      ...useAuthStore.getState().profile!,
      onboarding_completed: true,
    })
    navigate({ to: '/' })
  }

  const onSubmit = async (values: BabyFormValues) => {
    if (!user) return
    await profilesApi.update(user.id, {
      baby_name: values.baby_name || null,
      baby_gender: values.baby_gender,
      is_twins: values.is_twins,
      onboarding_completed: true,
    })
    completeOnboarding()
  }

  const handleSkip = async () => {
    if (!user) return
    await profilesApi.update(user.id, { onboarding_completed: true })
    completeOnboarding()
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ height: '100dvh', p: '32px 24px 24px' }}
      gap="20px"
    >
      {/* Top bar: back button (→ /onboarding/weight) + progress bước 3 active */}
      {/* Hero: ChildCareRounded icon, title "Thông tin của bé", description */}
      {/* Form:
            - Input "Tên của bé": {...register('baby_name')}, icon BadgeRounded bên trái
            - Controller baby_gender → MUI Select:
                MenuItem value="unknown": "Chưa biết"
                MenuItem value="male": "Bé trai"
                MenuItem value="female": "Bé gái"
            - Twins toggle row: FavoriteRounded + "Mang thai đôi" (trái) + Controller is_twins → Switch (phải)
      */}
      {/* Spacer */}
      {/* Footer:
            Button type="submit" variant="contained" disabled={isSubmitting}: "Tiếp tục"
            Button variant="text" onClick={handleSkip}: "Để sau"
      */}
    </Stack>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm nx typecheck web
```

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/routes/onboarding/baby.tsx
git commit -m "feat(onboarding): add baby info screen"
```

---

## Task 12: Smoke test — kiểm tra flow trong browser

- [ ] **Step 1: Khởi động dev server**

```bash
pnpm nx dev web
```

- [ ] **Step 2: Kiểm tra các scenario trong browser**

1. Đăng nhập với user chưa completed onboarding → redirect sang `/onboarding/due-date`
2. Màn hình 1a: chọn LMP → preview card due date hiện đúng → "Tiếp tục" → sang `/onboarding/weight`
3. Màn hình 1a: link "Nhập trực tiếp" → sang `/onboarding/due-date/direct`
4. Màn hình 1b: back button → về `/onboarding/due-date`
5. Màn hình 1a: "Bỏ qua" → sang weight, Supabase `due_date` vẫn null
6. Màn hình 2: nhập weight + height → BMI card hiện với số đúng + tip → "Tiếp tục" → sang baby
7. Màn hình 2: "Để sau" → sang baby, Supabase `weight_kg/height_cm` vẫn null
8. Màn hình 3: "Tiếp tục" → `onboarding_completed = true` trong DB, redirect `/`
9. Màn hình 3: "Để sau" → `onboarding_completed = true` trong DB, redirect `/`
10. Login lại sau khi completed → đi thẳng vào app, không onboard lại

- [ ] **Step 3: Typecheck toàn bộ project**

```bash
pnpm nx run-many -t typecheck
```

Expected: không có lỗi

- [ ] **Step 4: Commit cuối**

```bash
git add .
git commit -m "feat(onboarding): complete onboarding flow"
```

---

## Notes cho implementer

**Supabase:** Schema được apply tự động qua Task 0 (`supabase db push`). Không cần thao tác tay trong dashboard.

**LocalizationProvider:** Có thể đặt trong `onboarding.tsx` layout thay vì từng screen để dùng chung.

**DatePicker styling:** Custom `sx` trên `DatePicker`/`TextField` để match design (height 56, borderRadius 16, stroke `#F08180`). Tham chiếu chi tiết trong `.pen` file.

**MUI Switch — Twins toggle:** Custom `sx` để match design (width 46, height 28, borderRadius pill). Xem component "Toggle off" trong `.pen` frame "03 Baby info".
