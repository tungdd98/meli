# Onboarding Feature Design

**Date:** 2026-05-24
**Status:** Approved

## Overview

Multi-step onboarding wizard cho app Meli (theo dõi thai kỳ). Hiển thị sau lần đăng nhập đầu tiên nếu profile chưa hoàn thành onboarding. Gồm 3 bước: ngày dự sinh, cân nặng, thông tin bé.

---

## 1. Routing & Navigation Flow

```
/login
  └─► (nếu profile.onboarding_completed = false)
        └─► /onboarding/due-date          ← Bước 1a: Tính từ ngày kinh cuối (LMP)
              ├─► /onboarding/due-date/direct  ← Bước 1b: Nhập trực tiếp từ bác sĩ
              │     └─► [back] /onboarding/due-date
              └─► [Tiếp tục / Bỏ qua]
                    └─► /onboarding/weight     ← Bước 2: Cân nặng & BMI
                          ├─► [back] /onboarding/due-date
                          └─► [Tiếp tục / Để sau]
                                └─► /onboarding/baby  ← Bước 3: Thông tin bé
                                      ├─► [back] /onboarding/weight
                                      └─► [Tiếp tục / Để sau]
                                            └─► /  (app chính)
```

**Route group `/_onboarding`:**

- `beforeLoad` kiểm tra session hợp lệ (phải đăng nhập), nếu không → redirect `/login`
- Không kiểm tra `onboarding_completed` tại đây (tránh redirect loop)

**Route `/_auth` (đã có):**

- Thêm kiểm tra: nếu `profile.onboarding_completed = false` → redirect `/onboarding/due-date`

**`/onboarding/due-date/direct`** là sub-route của due-date (bước 1b), không phải bước độc lập — back button quay về `/onboarding/due-date`.

---

## 2. Database Schema

```sql
create table profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  due_date      date,
  weight_kg     numeric(5,1),
  height_cm     numeric(5,1),
  baby_name     text,
  baby_gender   text check (baby_gender in ('male', 'female', 'unknown')),
  is_twins      boolean default false,
  onboarding_completed boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users manage own profile"
  on profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create profile khi user đăng ký
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
```

**Quyết định thiết kế:**

- `due_date` lưu kết quả cuối (LMP + 280 ngày hoặc nhập trực tiếp) — không lưu LMP riêng
- `baby_gender` mặc định `'unknown'` khi user không chọn
- Row được tạo tự động qua trigger khi user đăng ký → app chỉ cần `update`, không cần `insert`
- `onboarding_completed = true` chỉ khi user đến bước cuối (baby) và nhấn "Tiếp tục" hoặc "Để sau" — mọi "Bỏ qua" ở bước giữa chỉ skip sang step kế, không set flag này

---

## 3. State & API Layer

**`libs/api/src/lib/profiles.ts`** — service mới:

```ts
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
  get: () => supabase.from('profiles').select('*').single(),
  // RLS đảm bảo chỉ cập nhật row của user hiện tại — không cần .eq('id', userId)
  update: (data: ProfileUpdate) =>
    supabase
      .from('profiles')
      .update(data)
      .eq('id', (await supabase.auth.getUser()).data.user!.id),
};
```

**`libs/utils/src/lib/bmi.ts`** — pure function:

```ts
export const calcBmi = (weightKg: number, heightCm: number): number =>
  weightKg / Math.pow(heightCm / 100, 2);
```

**`auth.store.ts`** — thêm profile state:

```ts
profile: Profile | null
_setProfile: (profile: Profile | null) => void
```

Sau khi `setSession`, fetch profile từ Supabase và lưu vào store để `_auth.tsx` kiểm tra `onboarding_completed`.

**Không dùng Zustand cho onboarding draft state** — mỗi step tự quản lý form cục bộ bằng `react-hook-form` + `zod`, gọi `profilesApi.update()` trực tiếp khi submit. Không có state dùng chung giữa các step.

---

## 4. Component Structure & UI

**File structure:**

```
apps/web/src/routes/
├── _onboarding.tsx                    ← Layout wrapper
├── _onboarding/
│   ├── due-date.tsx                   ← Màn hình 1a: Tính từ LMP
│   ├── due-date.direct.tsx            ← Màn hình 1b: Nhập trực tiếp
│   ├── weight.tsx                     ← Màn hình 2: Cân nặng & BMI
│   └── baby.tsx                       ← Màn hình 3: Thông tin bé

libs/utils/src/lib/
└── bmi.ts

libs/api/src/lib/
└── profiles.ts
```

**Layout `_onboarding.tsx`:**

- Nền trắng, full viewport, `maxWidth: 390px` căn giữa (mobile-first)
- Logo baby image ở trên cùng
- `<Outlet />` phía dưới
- Không có header/nav

**Pattern chung cho mỗi step:**

- `useForm` + `zodResolver` cho validation cục bộ
- Back button (`<`) dùng `navigate({ to: '/onboarding/...' })` cụ thể (không dùng `navigate(-1)` để tránh history stack bất định)
- Nút "Tiếp tục": `disabled` khi form chưa valid
- Nút "Để sau" / "Bỏ qua": `navigate` sang step kế, không gọi API

**Due date — Màn hình 1a (`due-date.tsx`):**

- Date picker cho LMP (ngày đầu tiên kỳ kinh cuối)
- Tính preview `due_date = lmp + 280 ngày` hiển thị dưới input
- Khi "Tiếp tục": `profilesApi.update({ due_date })` → `/onboarding/weight`
- Link "Nếu biết từ bác sĩ" → navigate `/onboarding/due-date/direct`
- Nút "Bỏ qua": navigate `/onboarding/weight`, không gọi API (cùng hành vi "Để sau")

**Due date — Màn hình 1b (`due-date.direct.tsx`):**

- Date picker nhập trực tiếp `due_date`
- Link "Tính ngày dự sinh" → navigate back `/onboarding/due-date`
- Khi "Tiếp tục": `profilesApi.update({ due_date })` → `/onboarding/weight`
- Nút "Bỏ qua": navigate `/onboarding/weight`, không gọi API (cùng hành vi "Để sau")

**Weight — Màn hình 2 (`weight.tsx`):**

- Hai input: `weight_kg` (kg) và `height_cm` (cm)
- Khi cả hai có giá trị hợp lệ → hiển thị card BMI động dùng `calcBmi()`
- Card BMI hiển thị số BMI và tip tăng cân khuyến nghị; tuần thai tính từ `due_date` trong profile — nếu `due_date = null` (user đã skip bước 1), hiển thị "tuần thứ 0" và mức tăng từ 0 kg (đúng như mockup trạng thái trống)
- Nút "Tiếp tục": `profilesApi.update({ weight_kg, height_cm })` → `/onboarding/baby`
- Nút "Để sau": navigate `/onboarding/baby` không lưu

**Baby — Màn hình 3 (`baby.tsx`):**

- Input text: `baby_name`
- MUI `Select`: `baby_gender` — options: `male / female / unknown` (default: `unknown`)
- Link toggle "Bạn có mang thai đôi không?": toggle `is_twins`
- Khi "Tiếp tục": `profilesApi.update({ baby_name, baby_gender, is_twins, onboarding_completed: true })` → `/`
- Nút "Để sau": `profilesApi.update({ onboarding_completed: true })` → `/`

---

## 5. Out of Scope

- Mali Community section (không implement)
- Settings/Profile page để hoàn thiện profile sau (feature riêng, cần design doc riêng)
- Push notifications, personalized content dựa trên profile (feature sau)
