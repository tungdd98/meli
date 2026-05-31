---
type: fe-plan
produced_by: fe-writing-plan
depends_on: 02-spec.md
status: draft
---

# Implementation Plan — settings (Phase 1: Thông tin cá nhân + Đăng xuất)

## Goal

Biến route stub `/_auth/settings` thành màn danh sách Cài đặt (Thông tin cá nhân + Đăng xuất) và thêm màn con `/_auth/settings/profile` xem/sửa hồ sơ, kèm migration thêm cột profile, hoàn thiện luồng đăng xuất và refactor validation cân/cao dùng chung.

## Approach

Triển khai từ dưới lên: trước hết là lớp dữ liệu (migration + types + store), rồi lớp dùng chung (refactor validation), sau đó UI (màn list → màn profile → dialog logout). Bám theo `02-spec.md`. Tái dùng tối đa: `AppBottomNav`, `@meli/ui` form components (`FormTextField`, `FormDatePicker`), pattern form RHF+zod của `onboarding/weight.tsx` và `login.tsx`. Backend chỉ là 1 migration cộng cột — RLS own-profile và trigger tạo profile đã có sẵn.

## Implementation steps

1. **Migration thêm cột profile** — tạo migration mới thêm `display_name text` và `birth_date date` vào bảng `profiles` (`supabase migration new add_profile_personal_fields` → `supabase/migrations/<ts>_add_profile_personal_fields.sql`). Chạy `supabase db reset` để verify replay.

2. **Cập nhật Profile types + API** — thêm `display_name: string | null` và `birth_date: string | null` vào `Profile` và (`display_name?`, `birth_date?`) vào `ProfileUpdate` (`libs/api/src/lib/profiles.ts`). `profilesApi.update` đã upsert generic nên không cần đổi logic.

3. **Hoàn thiện `signOut` trong store** — sau `supabase.auth.signOut()` gọi `set({ session: null, user: null, profile: null })` (`apps/web/src/stores/auth.store.ts`). Redirect để cho component xử lý (giữ store thuần, không phụ thuộc router).

4. **Refactor validation dùng chung** — tách helper `numericString(min, max, minMessage, maxMessage)` (hiện inline trong `onboarding/weight.tsx`) ra `libs/utils/src/lib/validation.ts`, export qua `libs/utils/src/index.ts`. Cập nhật `onboarding/weight.tsx` import từ `@meli/utils` thay cho định nghĩa cục bộ (giữ nguyên hành vi). Lưu ý: `numericString` trả về zod schema — đặt ở `@meli/utils` chấp nhận phụ thuộc `zod` (đã là dep của repo).

5. **Component settings row** — thêm component hàng cài đặt (icon + label + chevron, có `onClick`) vào `@meli/ui` (vd `libs/ui/src/lib/components/SettingsRow/`) và export qua `ui.ts`; tránh style card cục bộ trong route. (Nếu cân nhắc scope, có thể để inline trong `SettingsPage` nhưng ưu tiên design-system-first.)

6. **Màn danh sách Cài đặt** — viết `SettingsPage` (`apps/web/src/routes/_auth/settings.tsx`): tiêu đề "Cài đặt", row "Thông tin cá nhân" → `navigate({ to: '/settings/profile' })`, thẻ "Đăng xuất" mở dialog. Gắn `AppBottomNav value={3}` + padding-bottom tránh che. Ẩn hoàn toàn các mục ngoài phase.

7. **Dialog xác nhận đăng xuất + luồng logout** — dùng MUI `Dialog` (chưa có Dialog trong `@meli/ui`): xác nhận → gọi `useAuthStore.signOut()` → `navigate({ to: '/login' })`; xử lý lỗi (snackbar/Alert), chặn double-click khi đang xử lý. Đặt trong `SettingsPage` (hoặc tách `LogoutConfirmDialog` cùng route).

8. **Màn Thông tin cá nhân** — tạo route mới `apps/web/src/routes/_auth/settings/profile.tsx` (`/_auth/settings/profile`). Form RHF+zod (`mode: 'onChange'`):
   - `display_name` (FormTextField, optional, trim);
   - `birth_date` (FormDatePicker, bắt buộc, không tương lai — cần `LocalizationProvider`/`AdapterDayjs` cục bộ vì ngoài onboarding);
   - `weight_kg` (FormTextField number, `numericString(20,300,...)`, adornment kg);
   - `height_cm` (FormTextField number, `numericString(50,300,...)`, adornment cm);
   - Email read-only từ `auth.user.email`.
     Default values từ `useAuthStore.profile`; nếu thiếu → `profilesApi.get(user.id)`. Nút "Lưu" disable khi `!isValid || isSubmitting`; submit → `profilesApi.update` → `useAuthStore._setProfile(...)` → thông báo đã lưu. Header back → `/settings`; avatar placeholder tròn + icon camera disabled; giữ `AppBottomNav value={3}`.
     Lưu ý: TanStack Router file-based — `settings.tsx` (leaf) + `settings/profile.tsx` (child) cần `settings` thành layout/parent; kiểm tra cấu trúc route (có thể đổi `settings.tsx` → `settings/index.tsx`). `routeTree.gen.ts` tự sinh, không sửa tay.

9. **Verify build/lint/types** — `pnpm nx typecheck web`, `pnpm nx lint web`, `pnpm nx test utils` (helper refactor) và chạy dev kiểm tra luồng.

## Risk points

- **Cấu trúc route TanStack** — thêm child `settings/profile` trong khi `settings.tsx` là leaf: phải chuyển `settings` thành thư mục (`settings/index.tsx` + `settings/profile.tsx`) để route tree hợp lệ. Mitigation: làm ở step 8, để `routeTree.gen.ts` tự sinh, không sửa tay; chạy dev để regenerate.
- **Refactor `numericString`** — di chuyển có thể làm hỏng `onboarding/weight.tsx`. Mitigation: giữ chữ ký y nguyên, cập nhật import cùng commit, chạy typecheck + thử onboarding.
- **Migration trên môi trường đã có dữ liệu** — cột mới nullable nên an toàn (không default bắt buộc). Mitigation: `supabase db reset` ở local; cột nullable, không phá dữ liệu cũ.
- **`zod` ở `@meli/utils`** — đảm bảo `zod` là dependency của lib `utils` (tránh lỗi module boundary/peer). Mitigation: kiểm tra `package.json`/import; zod đã dùng rộng trong repo.
- **Đồng bộ store sau update** — quên `_setProfile` khiến UI cũ. Mitigation: theo pattern `onboarding/weight.tsx` đã có.
- **Logout redirect** — store không tự điều hướng; nếu quên `navigate` ở component, user kẹt lại. Mitigation: điều hướng `/login` ngay sau `signOut` trong handler; `_auth.beforeLoad` cũng chặn khi mất session.

## Test approach

- **Unit (`@meli/utils`)** — test cho `numericString` (biên min/max, không phải số) sau refactor; đảm bảo `onboarding/weight.tsx` vẫn xanh.
- **Component/manual** — kiểm tra: list hiển thị đúng 2 mục, điều hướng tới profile, load/sửa/lưu profile, validation birth_date/weight/height, dialog logout + clear store + redirect.
- **Browser (tùy chọn)** — `fe-browser-test` có thể chạy `04-test-cases.md` sau khi `fe-test-design` sinh test cases.
- Tham chiếu `04-test-cases.md` (sẽ tạo ở bước `fe-test-design`).

## Out of scope

- Upload avatar (Supabase Storage) — chỉ placeholder, camera disabled.
- Field vai trò "Bạn là" — bỏ (app cho mẹ).
- Các mục Ngôn ngữ, tự động mở video, section "Về chúng tôi" — ẩn, làm phase sau.
- Nút `...` ở header màn profile — bỏ.
- Đổi cấu trúc `AppBottomNav` (vẫn 4 tab như hiện tại).
