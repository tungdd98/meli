---
type: collected-context
step: 1
produced_by: fe-collect-context
task_id: settings
task_type_hint: feature
status: ready-for-confirm
created_at: 2026-05-31
---

# Collected Context — settings (Phase 1: Thông tin cá nhân + Đăng xuất)

## 1. Sources

| #   | Source                               | Type                  | Location / Link                                              |
| --- | ------------------------------------ | --------------------- | ------------------------------------------------------------ |
| 1   | IMG_8115.PNG (màn Cài đặt)           | design image (mockup) | docs/features/settings/IMG_8115.PNG                          |
| 2   | IMG_8116.PNG (màn Thông tin cá nhân) | design image (mockup) | docs/features/settings/IMG_8116.PNG                          |
| 3   | plan.md (orchestrator plan)          | orchestrator-plan     | docs/fe/settings/plan.md                                     |
| 4   | settings route stub                  | source code           | apps/web/src/routes/\_auth/settings.tsx                      |
| 5   | profilesApi + Profile type           | source code           | libs/api/src/lib/profiles.ts                                 |
| 6   | auth store (signOut)                 | source code           | apps/web/src/stores/auth.store.ts                            |
| 7   | profiles table migration             | SQL migration         | supabase/migrations/20260525134326_create_profiles_table.sql |

## 2. Summary per source

### Source 1 — IMG_8115.PNG (màn Cài đặt / danh sách Cài đặt)

Màn danh sách Cài đặt dạng mobile. Tiêu đề section "Cài đặt" ở trên cùng, dưới đó là một danh sách các thẻ (card) hàng:

- "Thông tin cá nhân" — icon người, có chevron `>` (điều hướng).
- "Ngôn ngữ" — icon cờ Việt Nam, có chevron `>`.
- "Tự động mở các video" — hàng có toggle switch (đang bật, màu hồng).

Tiếp theo là section "Về chúng tôi" với các hàng có chevron `>`: "Về Mali", "Đánh giá ứng dụng", "Hỗ trợ chúng tôi", "Các điều khoản", "Chính sách bảo mật".
Cuối màn là một thẻ riêng "Đăng xuất" (không có chevron).
Dưới cùng là bottom navigation 5 tab: "Trang chủ", "Hướng Dẫn", "Cộng đồng", "Nhật ký", "Thêm" — tab "Thêm" đang active (màu hồng).

### Source 2 — IMG_8116.PNG (màn Thông tin cá nhân)

Màn chi tiết "Thông tin cá nhân" dạng mobile. Header màu hồng có nút back `<` bên trái và nút `...` (more) bên phải. Giữa màn là ảnh đại diện hình tròn (placeholder xám) với một icon camera nhỏ ở góc dưới phải (gợi ý đổi ảnh).
Bên dưới là các trường:

- "Tên bạn:" — input text, giá trị mẫu "Đức Tùng Đặng".
- "Ngày sinh của bạn:_" — input ngày, giá trị mẫu "22 / tháng 5 / 2006" (có dấu `_` bắt buộc).
- "Bạn là" — dropdown select, giá trị mẫu "Mẹ".
- "Cân nặng của bạn*" — input, giá trị mẫu "42" (có dấu `*`).
- "Chiều cao của bạn:_" — input, giá trị mẫu "150" (có dấu `_`).
- "Email:" — text hiển thị "ddtung901@gmail.com" (dạng read-only, không có khung input).

Cuối màn cũng có bottom navigation 5 tab giống màn Cài đặt, tab "Thêm" active.
Mockup không hiển thị nút "Lưu" / CTA submit nào.

### Source 3 — plan.md (orchestrator plan)

Plan đã phân loại task là `feature`. Phase 1 chỉ gồm "Thông tin cá nhân" + "Đăng xuất"; các mục khác (Ngôn ngữ, toggle video, section "Về chúng tôi") để phase sau. Plan liệt kê flow skill từ collect-context → finish-branch và đã nêu sẵn 6 điểm cần làm rõ (schema lệch mockup, avatar upload, hành vi lưu, đăng xuất, hiển thị mục ngoài phase, mapping bottom nav).

### Source 4 — apps/web/src/routes/\_auth/settings.tsx

Route `/_auth/settings` hiện chỉ là stub: render một `Box` với `Typography variant="h4"` chữ "Cài đặt". Chưa có danh sách, chưa có điều hướng tới màn con nào.

### Source 5 — libs/api/src/lib/profiles.ts

`profilesApi` có 2 method: `get(userId)` (đọc profile, tự upsert hàng rỗng nếu chưa có) và `update(userId, data)` (upsert). Type `Profile` / `ProfileUpdate` gồm các field: `due_date`, `weight_kg`, `height_cm`, `baby_name`, `baby_gender` (`'male'|'female'|'unknown'`), `is_twins`, `onboarding_completed`, cùng `id/created_at/updated_at`. KHÔNG có field tên người (display name), ngày sinh người dùng (birth date), hay vai trò (role/"Bạn là").

### Source 6 — apps/web/src/stores/auth.store.ts

Zustand auth store giữ `session`, `user`, `profile`, `isLoading`, `onboardingLmp`. `signIn` đăng nhập + nạp profile vào store. `signOut` hiện chỉ gọi `supabase.auth.signOut()` — KHÔNG clear `session/user/profile` trong store và KHÔNG điều hướng. `user.email` có sẵn từ session (nguồn cho field Email read-only).

### Source 7 — supabase/migrations/...create_profiles_table.sql

Tạo bảng `profiles` khóa chính `id` tham chiếu `auth.users(id)`. Các cột: `due_date, weight_kg numeric(5,1), height_cm numeric(5,1), baby_name, baby_gender (check male/female/unknown), is_twins, onboarding_completed`, `created_at`, `updated_at`. RLS bật, policy "Users manage own profile" (`auth.uid() = id`). Có trigger `on_auth_user_created` tự tạo hàng profile khi user mới đăng ký. Không có cột tên/ngày sinh người dùng/vai trò.

## 3. Consolidated requirement

Phase 1 của màn Cài đặt yêu cầu xây dựng (a) màn danh sách Cài đặt tại route `_auth/settings` (hiện là stub) hiển thị ít nhất entry "Thông tin cá nhân" (điều hướng) và hành động "Đăng xuất", và (b) màn con "Thông tin cá nhân" hiển thị/chỉnh sửa ảnh đại diện, Tên, Ngày sinh, vai trò ("Bạn là"), Cân nặng, Chiều cao, và Email (read-only từ auth user). Dữ liệu profile đọc/ghi qua `profilesApi`; tuy nhiên bảng `profiles` hiện chỉ có `weight_kg`/`height_cm` khớp mockup, còn Tên/Ngày sinh/Vai trò chưa có cột tương ứng. "Đăng xuất" cần hoàn thiện luồng `signOut` (hiện chưa clear store / chưa redirect). Cả hai màn dùng bottom navigation 5 tab với tab "Thêm" active. Các mục Ngôn ngữ, toggle video và section "Về chúng tôi" nằm ngoài phase 1.

## 4. Open gaps / missing information

- [ ] **Schema lệch mockup**: Field "Tên bạn", "Ngày sinh của bạn", "Bạn là" (vai trò) không có cột trong bảng `profiles`. Cần quyết định: thêm migration cột mới (vd `display_name`, `birth_date`, `role`) hay map lại field hiện có. (Needed from: BA/tech-lead + quyết định ở fe-brainstorm-spec)
- [ ] **Giá trị "Bạn là"**: danh sách lựa chọn vai trò (mockup chỉ thấy "Mẹ") chưa rõ đầy đủ các option. (Needed from: BA/PM)
- [ ] **Avatar upload**: icon camera trên ảnh đại diện — có nằm trong scope phase 1 không, và nếu có thì dùng Supabase Storage hay giải pháp nào. (Needed from: PM/tech-lead)
- [ ] **Hành vi lưu**: mockup không có nút "Lưu". Cần xác định auto-save (on blur), có CTA submit, hay màn read-only ở phase này. (Needed from: BA/PM)
- [ ] **Đơn vị Cân nặng / Chiều cao**: mockup hiển thị số trần (42, 150) không kèm đơn vị; xác nhận kg/cm và validation. (Needed from: BA)
- [ ] **Luồng Đăng xuất**: sau logout có clear `session/user/profile` trong store + redirect `/login` không, và có dialog xác nhận không. (Needed from: PM/tech-lead)
- [ ] **Hiển thị mục ngoài phase**: các mục Ngôn ngữ, toggle video, section "Về chúng tôi" — ẩn hoàn toàn hay hiển thị disabled ở phase 1. (Needed from: PM)
- [ ] **Mapping bottom nav**: tab "Thêm" trỏ tới route `_auth/settings`? Cần xác nhận mapping điều hướng 5 tab. (Needed from: PM/tech-lead)
- [ ] **Header màn Thông tin cá nhân**: nút `...` (more) ở góc phải làm gì — có nằm trong scope phase 1 không. (Needed from: BA/PM)

## 5. Suggested task type

`feature` — Route `_auth/settings` hiện chỉ là stub; phase này bổ sung danh sách Cài đặt mới + màn con "Thông tin cá nhân" + hoàn thiện luồng Đăng xuất, không phải chỉnh sửa feature đã có.
