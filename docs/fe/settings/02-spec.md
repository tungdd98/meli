---
type: fe-spec
produced_by: fe-brainstorm-spec
task_id: settings
depends_on: 01-collected-context.md
status: draft
---

# FE Spec — settings (Phase 1: Thông tin cá nhân + Đăng xuất)

## 1. Overview

Phase 1 của màn Cài đặt biến route stub `/_auth/settings` thành màn danh sách Cài đặt thật với 2 mục: "Thông tin cá nhân" (điều hướng tới màn con) và "Đăng xuất". Màn con "Thông tin cá nhân" (`/_auth/settings/profile`) cho người dùng (mẹ) xem và chỉnh sửa hồ sơ: tên, ngày sinh, cân nặng, chiều cao; xem email (read-only). "Đăng xuất" hoàn thiện luồng `signOut` hiện chưa clear store / chưa redirect. Các mục ngoài phase (Ngôn ngữ, tự động mở video, "Về chúng tôi", upload avatar, vai trò "Bạn là") để phase sau.

## 2. Screens & components

| Screen / component       | Responsibility                                                                                                                | Notes                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `SettingsPage`           | Danh sách Cài đặt: row "Thông tin cá nhân" (chevron → `/settings/profile`), thẻ "Đăng xuất" (mở dialog xác nhận). Bottom nav. | Route `/_auth/settings` (thay stub). Dùng `AppBottomNav value={3}`.                          |
| `ProfilePage`            | Form xem/sửa hồ sơ + avatar placeholder + email read-only + nút "Lưu". Header back → `/settings`. Bottom nav.                 | Route mới `/_auth/settings/profile`. `AppBottomNav value={3}`.                               |
| `LogoutConfirmDialog`    | Dialog xác nhận trước khi đăng xuất.                                                                                          | Có thể inline trong `SettingsPage` bằng MUI `Dialog`; tái dùng `@meli/ui` nếu có sẵn dialog. |
| Settings row (list item) | Hàng cài đặt dạng card: icon trái + label + chevron phải, bấm điều hướng.                                                     | Ưu tiên thêm/tái dùng component trong `@meli/ui` thay vì style cục bộ.                       |
| Shared validation module | Helper zod `numericString(min,max,...)` + range cân/cao, refactor tách từ `onboarding/weight.tsx`.                            | Đặt tại `@meli/utils` (hoặc module schema dùng chung); cả onboarding và ProfilePage import.  |

## 3. States

**SettingsPage**

- **Loading:** Không cần fetch riêng — danh sách tĩnh. Trạng thái logout: trong khi `signOut` chạy, disable nút trong dialog (spinner/`isLoading`).
- **Empty:** N/A (danh sách cố định 2 mục).
- **Error:** `signOut` lỗi → giữ ở màn, hiện thông báo lỗi (snackbar/alert), không redirect.
- **Success:** Logout thành công → store đã clear → redirect `/login`.

**ProfilePage**

- **Loading:** Đọc profile từ `useAuthStore.profile` (đã nạp khi đăng nhập). Nếu chưa có → gọi `profilesApi.get(user.id)`; hiển thị skeleton/loading khi đợi.
- **Empty:** Profile mới (cột rỗng) → field trống, placeholder. Email luôn có từ `auth.user.email`.
- **Error:** `profilesApi.update` lỗi → giữ form, hiện lỗi (snackbar/alert), không mất dữ liệu đã nhập; nút "Lưu" bật lại.
- **Success:** Update thành công → cập nhật `useAuthStore._setProfile`, hiện xác nhận (snackbar "Đã lưu") — ở lại màn.

## 4. API consumed

| Endpoint                                               | Method        | Request                                                  | Response  | Error handling                                  |
| ------------------------------------------------------ | ------------- | -------------------------------------------------------- | --------- | ----------------------------------------------- |
| `profilesApi.get(userId)`                              | SELECT/upsert | `userId`                                                 | `Profile` | Lỗi → state error trên ProfilePage              |
| `profilesApi.update(userId, data)`                     | upsert        | `{ display_name?, birth_date?, weight_kg?, height_cm? }` | `Profile` | Lỗi → snackbar, không redirect, form giữ nguyên |
| `supabase.auth.signOut()` (qua `useAuthStore.signOut`) | —             | —                                                        | void      | Lỗi → snackbar, không clear/redirect            |
| `auth.user.email` (từ store)                           | —             | —                                                        | `string`  | N/A (read-only hiển thị)                        |

**Thay đổi backend/types cần kèm:**

- Migration mới: `ALTER TABLE profiles ADD COLUMN display_name text`, `ADD COLUMN birth_date date`. (RLS own-profile đã có.)
- `Profile` + `ProfileUpdate` (`libs/api/src/lib/profiles.ts`) thêm `display_name: string | null`, `birth_date: string | null`.
- `useAuthStore.signOut`: sau `supabase.auth.signOut()` → `set({ session: null, user: null, profile: null })`.

## 5. Edge cases

- **display_name** (Tên): optional (mockup không có `*`). Trim khoảng trắng; cho phép rỗng → lưu `null`.
- **birth_date** (Ngày sinh): bắt buộc (`*`). Validate: ngày hợp lệ, **không ở tương lai**. Dùng `FormDatePicker` + dayjs (cần `LocalizationProvider`/`AdapterDayjs` cục bộ vì ngoài route onboarding). Lưu dạng `YYYY-MM-DD`.
- **weight_kg** (Cân nặng): bắt buộc, 20–300 kg, cho 1 chữ số thập phân (numeric(5,1)). Tái dùng `numericString(20, 300, ...)`.
- **height_cm** (Chiều cao): bắt buộc, 50–300 cm. Tái dùng `numericString(50, 300, ...)`.
- **Email**: read-only, lấy từ `auth.user.email`; nếu thiếu (hiếm) → ẩn dòng hoặc hiển thị "—".
- **Nút "Lưu"**: disable khi `!isValid || isSubmitting` (giống pattern onboarding `mode: 'onChange'`).
- **Avatar**: chỉ placeholder; icon camera disabled (không bắt sự kiện) — tránh tạo kỳ vọng upload.
- **Logout race**: chặn bấm "Đăng xuất" nhiều lần khi đang xử lý.
- **Guard điều hướng**: cả 2 route nằm dưới `_auth` (đã có guard session + onboarding ở layout) — không lặp guard trong component.

## 6. Responsive behavior

- Mobile-first (mockup là mobile). Bố cục dọc 1 cột, các card/row full-width với spacing theo theme.
- Bottom nav cố định đáy (`AppBottomNav`), nội dung có padding-bottom tránh bị che (theo pattern các màn `_auth` hiện có, vd `pb`).
- Trên màn rộng hơn: giữ 1 cột, giới hạn max-width container cho dễ đọc (theo convention sẵn có của app nếu có); không cần layout đa cột.
- Form field full-width, label trên input; dùng `@meli/ui` `FormTextField`/`FormSelect`/`FormDatePicker`.

## 7. Acceptance criteria

- [ ] Given đã đăng nhập, When mở `/settings`, Then thấy đúng 2 mục: "Thông tin cá nhân" (có chevron) và "Đăng xuất"; KHÔNG thấy Ngôn ngữ / toggle video / "Về chúng tôi".
- [ ] Given ở `/settings`, When bấm "Thông tin cá nhân", Then điều hướng tới `/settings/profile`.
- [ ] Given ở `/settings/profile`, When màn load, Then field Tên/Ngày sinh/Cân nặng/Chiều cao hiển thị giá trị từ profile (nếu có) và Email hiển thị read-only từ tài khoản.
- [ ] Given form hợp lệ, When bấm "Lưu", Then `profilesApi.update` được gọi với `display_name/birth_date/weight_kg/height_cm`, store cập nhật, và có thông báo đã lưu.
- [ ] Given Ngày sinh để trống hoặc là ngày tương lai, When submit, Then hiện lỗi validation và KHÔNG gọi update.
- [ ] Given Cân nặng ngoài 20–300 hoặc Chiều cao ngoài 50–300, When submit, Then hiện lỗi validation tương ứng.
- [ ] Given ở `/settings/profile`, When bấm back, Then quay về `/settings`; bottom nav vẫn hiển thị (tab Cài đặt active).
- [ ] Given ở `/settings`, When bấm "Đăng xuất", Then hiện dialog xác nhận; When xác nhận, Then store `session/user/profile` được clear và điều hướng `/login`.
- [ ] Given bấm "Đăng xuất" rồi Hủy, Then ở lại `/settings`, không đăng xuất.
- [ ] Avatar hiển thị placeholder tròn; icon camera không kích hoạt hành động nào.
- [ ] Helper validation cân/cao được tách dùng chung; `onboarding/weight.tsx` vẫn hoạt động như cũ sau refactor.

## 8. Open questions resolved

- **Schema lệch mockup** → Thêm migration cột `display_name` (text), `birth_date` (date) vào `profiles`; cập nhật type + `profilesApi`. `weight_kg`/`height_cm` dùng cột có sẵn.
- **Giá trị "Bạn là" (vai trò)** → Bỏ field; app dành cho mẹ, không cần role.
- **Avatar upload** → Ngoài scope phase 1: chỉ placeholder, icon camera disabled.
- **Hành vi lưu** → Có nút "Lưu" (CTA submit) gọi `profilesApi.update` một lần.
- **Đơn vị cân/cao** → kg & cm; tái dùng helper `numericString` + range (20–300 kg / 50–300 cm) refactor từ `onboarding/weight.tsx`, adornment kg/cm.
- **Luồng Đăng xuất** → Dialog xác nhận → clear `session/user/profile` → redirect `/login`.
- **Hiển thị mục ngoài phase** → Ẩn hoàn toàn.
- **Mapping bottom nav** → Tái dùng `AppBottomNav`; tab "Cài đặt" (index 3) → `/settings`. Cả màn list và màn con đều hiển thị bottom nav.
- **Header nút `...`** → Bỏ ở phase 1; màn con chỉ có nút back → `/settings`.
