# Onboarding: Khôi phục dữ liệu khi bấm Back

**Ngày:** 2026-05-27  
**Phạm vi:** `apps/web/src/routes/onboarding/`, `apps/web/src/stores/auth.store.ts`

## Vấn đề

Khi user nhập thông tin ở một bước onboarding, bấm Tiếp tục để sang bước tiếp theo, rồi bấm Back — form quay về luôn hiển thị giá trị mặc định (trống / null) thay vì dữ liệu vừa nhập. Nguyên nhân: mỗi form dùng `defaultValues` hardcoded, không đọc từ Zustand store dù dữ liệu đã được lưu vào store sau khi submit.

## Giải pháp

Lưu LMP vào auth store (in-memory), và khởi tạo `defaultValues` của tất cả form onboarding từ dữ liệu đã có trong store.

## Các thay đổi

### 1. `auth.store.ts`

Thêm vào `AuthState`:

- `onboardingLmp: string | null` — ngày kinh cuối dạng `YYYY-MM-DD`, chỉ lưu trong memory
- `_setOnboardingLmp: (lmp: string | null) => void` — action cập nhật field trên

Khởi tạo: `onboardingLmp: null`.  
Reset: gọi `_setOnboardingLmp(null)` khi `signOut` (tùy chọn — store sẽ bị clear khi reload nên không bắt buộc).

### 2. `due-date/index.tsx` (Step 1 — form LMP)

- Đọc `onboardingLmp` từ store
- `defaultValues: { lmp: onboardingLmp ? dayjs(onboardingLmp) : null }`
- Khi submit thành công: gọi `_setOnboardingLmp(values.lmp.format('YYYY-MM-DD'))` trước khi navigate

### 3. `due-date/direct.tsx` (Step 1 — nhập ngày trực tiếp)

- Đọc `profile` từ store
- `defaultValues: { dueDate: profile?.due_date ? dayjs(profile.due_date) : null }`

### 4. `weight.tsx` (Step 2)

`profile` đã được đọc từ store. Thay `defaultValues` từ chuỗi rỗng thành:

```ts
defaultValues: {
  weight_kg: profile?.weight_kg ? String(profile.weight_kg) : '',
  height_cm: profile?.height_cm ? String(profile.height_cm) : '',
}
```

### 5. `baby.tsx` (Step 3)

Thêm `const profile = useAuthStore((state) => state.profile)` và cập nhật `defaultValues`:

```ts
defaultValues: {
  baby_gender: profile?.baby_gender ?? 'unknown',
  baby_name:   profile?.baby_name   ?? '',
  is_twins:    profile?.is_twins    ?? false,
}
```

## Luồng dữ liệu sau khi sửa

```
Step 1 submit → lưu due_date vào store.profile + lưu lmp vào store.onboardingLmp
Step 2 submit → lưu weight/height vào store.profile
Step 3 submit → lưu baby info vào store.profile

Back từ Step 2 → Step 1: form LMP đọc store.onboardingLmp → hiển thị lại
Back từ Step 3 → Step 2: form Weight đọc store.profile → hiển thị lại
```

## Không thay đổi

- Backend API: không thêm field nào
- Kiểu `Profile` trong `@meli/api`: không thay đổi
- Logic tính toán (BMI, calcDueDateFromLmp): không thay đổi
