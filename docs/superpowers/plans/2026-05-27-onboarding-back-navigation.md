# Onboarding Back Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Khôi phục dữ liệu đã nhập vào các form onboarding khi user bấm Back, bằng cách đọc `defaultValues` từ Zustand store.

**Architecture:** Thêm field `onboardingLmp` vào auth store để lưu ngày kinh cuối (in-memory). Cập nhật `defaultValues` của 4 form onboarding để đọc từ `profile` (đã có trong store) và `onboardingLmp` (field mới). Không thay đổi backend hay kiểu `Profile`.

**Tech Stack:** React 19, React Hook Form, Zustand, Zod, TanStack Router, dayjs, TypeScript, Vitest (typecheck only — không có component test setup trong web app)

---

## File Map

| File                                                 | Thay đổi                                                              |
| ---------------------------------------------------- | --------------------------------------------------------------------- |
| `apps/web/src/stores/auth.store.ts`                  | Thêm `onboardingLmp`, `_setOnboardingLmp`                             |
| `apps/web/src/routes/onboarding/due-date/index.tsx`  | Đọc `onboardingLmp` làm `defaultValues`; lưu LMP vào store khi submit |
| `apps/web/src/routes/onboarding/due-date/direct.tsx` | Đọc `profile.due_date` làm `defaultValues`                            |
| `apps/web/src/routes/onboarding/weight.tsx`          | Đọc `profile.weight_kg/height_cm` làm `defaultValues`                 |
| `apps/web/src/routes/onboarding/baby.tsx`            | Đọc `profile.baby_*` làm `defaultValues`                              |

---

## Task 1: Mở rộng auth store với `onboardingLmp`

**Files:**

- Modify: `apps/web/src/stores/auth.store.ts`

- [ ] **Step 1: Thêm `onboardingLmp` và `_setOnboardingLmp` vào interface và store**

Mở file `apps/web/src/stores/auth.store.ts`. Thay toàn bộ nội dung bằng:

```typescript
import { create } from 'zustand';
import { profilesApi, supabase, type Profile } from '@meli/api';

type Session = Awaited<
  ReturnType<typeof supabase.auth.getSession>
>['data']['session'];
type User = NonNullable<Session>['user'];

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  onboardingLmp: string | null;
  _setSession: (session: Session | null) => void;
  _setProfile: (profile: Profile | null) => void;
  _setOnboardingLmp: (lmp: string | null) => void;
  signIn: (email: string, password: string) => Promise<Profile | null>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  profile: null,
  isLoading: false,
  onboardingLmp: null,
  _setSession: (session) => set({ session, user: session?.user ?? null }),
  _setProfile: (profile) => set({ profile }),
  _setOnboardingLmp: (lmp) => set({ onboardingLmp: lmp }),
  signIn: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      const { data: profile } = data.session
        ? await profilesApi.get(data.session.user.id)
        : { data: null };
      set({ session: data.session, user: data.session?.user ?? null });
      set({ profile });
      return profile;
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

Expected: không có lỗi TypeScript.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/stores/auth.store.ts
git commit -m "feat(onboarding): add onboardingLmp field to auth store"
```

---

## Task 2: Khôi phục form LMP (`due-date/index.tsx`)

**Files:**

- Modify: `apps/web/src/routes/onboarding/due-date/index.tsx`

- [ ] **Step 1: Đọc `onboardingLmp` từ store và dùng làm `defaultValues`; lưu LMP khi submit**

Mở file `apps/web/src/routes/onboarding/due-date/index.tsx`. Thay toàn bộ nội dung bằng:

```typescript
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import { PregnantWomanRounded } from '@mui/icons-material';
import dayjs, { type Dayjs } from 'dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormDatePicker } from '@meli/ui';
import { profilesApi } from '@meli/api';
import { calcDueDateFromLmp } from '@meli/utils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuthStore } from '../../../stores/auth.store';
import {
  FooterActions,
  InlineLinkRow,
  WizardHero,
  WizardTopBar,
} from '../-shared';

export const Route = createFileRoute('/onboarding/due-date/')({
  component: DueDateLmpPage,
});

const schema = z.object({
  lmp: z.custom<Dayjs>().nullable(),
});

type FormValues = z.infer<typeof schema>;

function DueDateLmpPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const onboardingLmp = useAuthStore((state) => state.onboardingLmp);

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { lmp: onboardingLmp ? dayjs(onboardingLmp) : null },
  });

  const lmp = watch('lmp');
  const dueDateStr = lmp ? calcDueDateFromLmp(lmp.format('YYYY-MM-DD')) : null;

  const onSubmit = async (values: FormValues) => {
    if (!values.lmp || !user) return;

    const nextDueDate = calcDueDateFromLmp(values.lmp.format('YYYY-MM-DD'));
    await profilesApi.update(user.id, { due_date: nextDueDate });
    const profile = useAuthStore.getState().profile;
    if (profile) {
      useAuthStore
        .getState()
        ._setProfile({ ...profile, due_date: nextDueDate });
    }
    useAuthStore.getState()._setOnboardingLmp(values.lmp.format('YYYY-MM-DD'));
    navigate({ to: '/onboarding/weight' });
  };

  return (
    <Stack
      gap={3}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <WizardTopBar step={1} />
      <WizardHero
        icon={<PregnantWomanRounded />}
        title="Ngày dự sinh của bạn"
        description="Chọn ngày đầu tiên của kỳ kinh cuối để Meli ước tính mốc thai kỳ."
      />

      <Stack gap={2} sx={{ flex: 1 }}>
        <FormDatePicker
          name="lmp"
          control={control}
          label="Ngày đầu kỳ kinh cuối"
        />

        {dueDateStr && (
          <Card>
            <CardContent>
              <Stack gap={1}>
                <Typography color="primary.main" variant="subtitle2">
                  Dự sinh ước tính
                </Typography>
                <Typography variant="h2">
                  {dayjs(dueDateStr).format('DD/MM/YYYY')}
                </Typography>
                <Typography color="text.secondary" variant="caption">
                  Bạn có thể thay đổi thông tin này sau trong hồ sơ.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        )}

        <InlineLinkRow
          label="Đã có ngày từ bác sĩ?"
          action="Nhập trực tiếp"
          onClick={() => navigate({ to: '/onboarding/due-date/direct' })}
        />
      </Stack>

      <FooterActions
        type="submit"
        disabled={!lmp || isSubmitting}
        skipLabel="Bỏ qua"
        onSkip={() => navigate({ to: '/onboarding/weight' })}
      />
    </Stack>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm nx typecheck web
```

Expected: không có lỗi TypeScript.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/routes/onboarding/due-date/index.tsx
git commit -m "fix(onboarding): restore LMP date from store when navigating back"
```

---

## Task 3: Khôi phục form nhập trực tiếp (`due-date/direct.tsx`)

**Files:**

- Modify: `apps/web/src/routes/onboarding/due-date/direct.tsx`

- [ ] **Step 1: Đọc `profile.due_date` từ store và dùng làm `defaultValues`**

Mở file `apps/web/src/routes/onboarding/due-date/direct.tsx`. Thay toàn bộ nội dung bằng:

```typescript
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import {
  EventAvailableRounded,
  MedicalInformationRounded,
} from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormDatePicker } from '@meli/ui';
import dayjs, { type Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { profilesApi } from '@meli/api';
import { useAuthStore } from '../../../stores/auth.store';
import {
  FooterActions,
  InlineLinkRow,
  WizardHero,
  WizardTopBar,
} from '../-shared';

export const Route = createFileRoute('/onboarding/due-date/direct')({
  component: DueDateDirectPage,
});

const schema = z.object({
  dueDate: z.custom<Dayjs>().nullable(),
});

type FormValues = z.infer<typeof schema>;

function DueDateDirectPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      dueDate: profile?.due_date ? dayjs(profile.due_date) : null,
    },
  });

  const dueDate = watch('dueDate');

  const onSubmit = async (values: FormValues) => {
    if (!values.dueDate || !user) return;

    const dueDateStr = values.dueDate.format('YYYY-MM-DD');
    await profilesApi.update(user.id, { due_date: dueDateStr });
    const currentProfile = useAuthStore.getState().profile;
    if (currentProfile) {
      useAuthStore
        .getState()
        ._setProfile({ ...currentProfile, due_date: dueDateStr });
    }
    navigate({ to: '/onboarding/weight' });
  };

  return (
    <Stack
      gap={3}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <WizardTopBar
        step={1}
        onBack={() => navigate({ to: '/onboarding/due-date' })}
      />
      <WizardHero
        icon={<EventAvailableRounded />}
        title="Nhập ngày dự sinh"
        description="Dùng ngày dự sinh bác sĩ đã thông báo để cá nhân hóa hành trình của bạn."
      />

      <Stack gap={2} sx={{ flex: 1 }}>
        <FormDatePicker name="dueDate" control={control} label="Ngày dự sinh" />

        <Card>
          <CardContent sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <MedicalInformationRounded color="primary" fontSize="small" />
            <Typography color="text.secondary" variant="caption">
              Nếu ngày này thay đổi sau lần khám tiếp theo, bạn vẫn có thể cập
              nhật trong hồ sơ.
            </Typography>
          </CardContent>
        </Card>

        <InlineLinkRow
          label="Muốn tính từ kỳ kinh cuối?"
          action="Tính ngày dự sinh"
          onClick={() => navigate({ to: '/onboarding/due-date' })}
        />
      </Stack>

      <FooterActions
        type="submit"
        disabled={!dueDate || isSubmitting}
        skipLabel="Bỏ qua"
        onSkip={() => navigate({ to: '/onboarding/weight' })}
      />
    </Stack>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm nx typecheck web
```

Expected: không có lỗi TypeScript.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/routes/onboarding/due-date/direct.tsx
git commit -m "fix(onboarding): restore due date from profile when navigating back"
```

---

## Task 4: Khôi phục form cân nặng (`weight.tsx`)

**Files:**

- Modify: `apps/web/src/routes/onboarding/weight.tsx`

- [ ] **Step 1: Dùng `profile` đã có để khởi tạo `defaultValues`**

Trong `apps/web/src/routes/onboarding/weight.tsx`, tìm block `useForm`:

```typescript
const {
  control,
  formState: { isSubmitting, isValid },
  handleSubmit,
  watch,
} = useForm<WeightFormValues>({
  resolver: zodResolver(weightSchema),
  defaultValues: { height_cm: '', weight_kg: '' },
  mode: 'onChange',
});
```

Thay bằng:

```typescript
const {
  control,
  formState: { isSubmitting, isValid },
  handleSubmit,
  watch,
} = useForm<WeightFormValues>({
  resolver: zodResolver(weightSchema),
  defaultValues: {
    weight_kg: profile?.weight_kg ? String(profile.weight_kg) : '',
    height_cm: profile?.height_cm ? String(profile.height_cm) : '',
  },
  mode: 'onChange',
});
```

- [ ] **Step 2: Typecheck**

```bash
pnpm nx typecheck web
```

Expected: không có lỗi TypeScript.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/routes/onboarding/weight.tsx
git commit -m "fix(onboarding): restore weight and height from profile when navigating back"
```

---

## Task 5: Khôi phục form thông tin bé (`baby.tsx`)

**Files:**

- Modify: `apps/web/src/routes/onboarding/baby.tsx`

- [ ] **Step 1: Thêm `profile` từ store và dùng làm `defaultValues`**

Trong `apps/web/src/routes/onboarding/baby.tsx`, tìm dòng:

```typescript
const user = useAuthStore((state) => state.user);
```

Thêm dòng sau ngay phía dưới:

```typescript
const profile = useAuthStore((state) => state.profile);
```

- [ ] **Step 2: Cập nhật `defaultValues` trong `useForm`**

Tìm block `useForm`:

```typescript
const {
  control,
  formState: { isSubmitting },
  handleSubmit,
} = useForm<BabyFormValues>({
  defaultValues: { baby_gender: 'unknown', baby_name: '', is_twins: false },
  resolver: zodResolver(babySchema),
});
```

Thay bằng:

```typescript
const {
  control,
  formState: { isSubmitting },
  handleSubmit,
} = useForm<BabyFormValues>({
  defaultValues: {
    baby_gender: profile?.baby_gender ?? 'unknown',
    baby_name: profile?.baby_name ?? '',
    is_twins: profile?.is_twins ?? false,
  },
  resolver: zodResolver(babySchema),
});
```

- [ ] **Step 3: Typecheck**

```bash
pnpm nx typecheck web
```

Expected: không có lỗi TypeScript.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/routes/onboarding/baby.tsx
git commit -m "fix(onboarding): restore baby info from profile when navigating back"
```

---

## Task 6: Kiểm tra thủ công

- [ ] **Step 1: Chạy dev server**

```bash
pnpm nx dev web
```

- [ ] **Step 2: Test luồng Back từ Step 3 → Step 2**

1. Đăng nhập và vào onboarding
2. Step 1: nhập ngày kinh cuối → bấm Tiếp tục
3. Step 2: nhập cân nặng và chiều cao → bấm Tiếp tục
4. Step 3: bấm nút Back (←)
5. Kiểm tra: form Step 2 phải hiển thị lại giá trị cân nặng và chiều cao vừa nhập

- [ ] **Step 3: Test luồng Back từ Step 2 → Step 1**

1. Từ Step 2, bấm nút Back (←)
2. Kiểm tra: form Step 1 phải hiển thị lại ngày kinh cuối vừa nhập

- [ ] **Step 4: Test form nhập trực tiếp**

1. Ở Step 1, bấm "Nhập trực tiếp"
2. Nhập ngày dự sinh → bấm Tiếp tục
3. Ở Step 2, bấm Back
4. Bấm "Tính ngày dự sinh" → quay lại form LMP (trống, đúng — vì đã nhập direct)
5. Bấm Back → về form direct
6. Kiểm tra: form direct phải hiển thị lại ngày vừa nhập
