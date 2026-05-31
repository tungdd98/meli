---
type: orchestrator-plan
produced_by: fe-workflow-orchestrator
task_id: settings
task_type: feature
status: ready-for-confirm
---

# Workflow Plan — settings (Phase 1: Thông tin cá nhân + Đăng xuất)

**Design:** docs/features/settings/IMG_8115.PNG (màn Cài đặt), docs/features/settings/IMG_8116.PNG (màn Thông tin cá nhân)

## 1. Task classification

`feature` — Màn Cài đặt hiện chỉ là stub (`apps/web/src/routes/_auth/settings.tsx` chỉ render tiêu đề "Cài đặt"). Phase này bổ sung chức năng FE mới: danh sách Cài đặt + màn "Thông tin cá nhân" + hành động "Đăng xuất". Không phải sửa một feature đã hoàn thiện nên xếp `feature` (route stub coi như khung trống), không phải `enhancement`.

## 2. Recommended skill flow

Theo routing table cho `feature`:

1. `fe-collect-context` → `01-collected-context.md`
2. `fe-brainstorm-spec` → `02-spec.md`
3. `fe-writing-plan` → `03-plan.md`
4. `fe-implement` (có branch guard) → source
5. `fe-code-review` → review inline / `06-code-review.md`
6. `fe-test-design` → `04-test-cases.md`
7. `fe-browser-test` (tùy chọn — sẽ hỏi trước khi chạy)
8. `fe-finish-branch` → mở PR

Không bước nào được skip: chưa có output file nào trong `docs/fe/settings/`.

## 3. Required inputs before start

(Từ `references/child-skill-inputs.md`, theo từng skill trong flow.)

- [x] **Task identifier** — slug `settings`, phase 1 (Thông tin cá nhân + Đăng xuất). Nguồn: yêu cầu của user.
- [x] **≥1 source cho collect-context** — 2 mockup: `docs/features/settings/IMG_8115.PNG`, `docs/features/settings/IMG_8116.PNG`. Nguồn: user cung cấp.
- [x] **Mô tả phạm vi phase** — chỉ "Thông tin cá nhân" + "Đăng xuất" (các mục Ngôn ngữ, toggle video, "Về chúng tôi" để phase sau). Nguồn: user.
- [x] **Context code nền** — route stub `_auth/settings.tsx`; `profilesApi` (`libs/api/src/lib/profiles.ts`); `useAuthStore.signOut()` (`apps/web/src/stores/auth.store.ts`); migration `profiles`. Nguồn: repo (đã khảo sát).
- [ ] **02-spec.md** — sẽ do `fe-brainstorm-spec` sinh ra (cần làm rõ các gap mục 4 trước).
- [ ] **03-plan.md** — sẽ do `fe-writing-plan` sinh ra.
- [ ] **Diff để review / branch hoàn chỉnh** — sinh ra ở `fe-implement`.
- [ ] **Tech-lead handle cho PR** (optional) — chưa có; hỏi khi tới `fe-finish-branch`.

_Manifest verified: 2026-05-31 (no drift — `child-skill-inputs.md` last_verified 2026-05-29, < 14 ngày; 9 child skill đều v1.0.0)._

## 4. Missing information

Cần chốt ở bước `fe-brainstorm-spec` (đây là rủi ro chính của phase này):

1. **Schema lệch mockup ⚠️** — Màn "Thông tin cá nhân" có _Tên bạn_, _Ngày sinh của bạn_, _Bạn là_ (vai trò = Mẹ). Bảng `profiles` hiện **không có** các cột này (chỉ có `due_date, weight_kg, height_cm, baby_name, baby_gender, is_twins, onboarding_completed`). Quyết định cần: thêm migration cột mới (`display_name`, `birth_date`, `role`...) hay map lại field? `weight_kg`/`height_cm` đã có sẵn. _Email_ lấy từ `auth.user.email` (read-only).
2. **Avatar upload** — icon camera trên ảnh đại diện: dùng Supabase Storage hay để ngoài phase 1? Cần xác nhận scope.
3. **Hành vi lưu** — mockup không có nút "Lưu". Field là input chỉnh sửa được → cần làm rõ: auto-save on blur, hay có CTA lưu, hay màn read-only ở phase này?
4. **Đăng xuất** — `signOut()` đã có nhưng chưa clear store/redirect. Cần chốt: sau logout clear `session/profile`, điều hướng về `/login`, có dialog xác nhận không.
5. **Danh sách Cài đặt** — các mục ngoài phase (Ngôn ngữ, toggle video, Về chúng tôi) hiển thị disabled hay ẩn hoàn toàn?
6. **Bottom nav** — tab "Thêm" trỏ về route `_auth/settings`? (cần xác nhận mapping điều hướng).

Không có secondary task type — phân loại `feature` rõ ràng.

## 5. Execution plan

| #   | Skill                          | Consume                             | Produce                                          | Review gate (thủ công)                                     |
| --- | ------------------------------ | ----------------------------------- | ------------------------------------------------ | ---------------------------------------------------------- |
| 1   | `fe-collect-context`           | 2 mockup + context code đã khảo sát | `01-collected-context.md` (gộp nguồn + list gap) | Dev xác nhận context & gap đầy đủ                          |
| 2   | `fe-brainstorm-spec`           | `01-...md`                          | `02-spec.md`                                     | **Chốt 6 gap mục 4** (đặc biệt schema) trước khi sang plan |
| 3   | `fe-writing-plan`              | `02-spec.md`                        | `03-plan.md`                                     | Dev duyệt plan (kể cả migration nếu có)                    |
| 4   | `fe-implement`                 | `03-plan.md`                        | source (tạo branch trước khi sửa)                | Dev review tay sau implement                               |
| 5   | `fe-code-review`               | diff + spec + plan                  | review inline / `06-code-review.md`              | Dev xử lý finding                                          |
| 6   | `fe-test-design`               | `02-spec.md` + `03-plan.md`         | `04-test-cases.md`                               | Dev duyệt test cases                                       |
| 7   | `fe-browser-test` _(optional)_ | `04-test-cases.md` + app chạy       | report inline                                    | Hỏi dev có chạy không                                      |
| 8   | `fe-finish-branch`             | branch + docs 02/03/04              | PR                                               | Tech-lead review                                           |

## 6. Expected deliverables

Trong `docs/fe/settings/`: `01-collected-context.md`, `02-spec.md`, `03-plan.md`, `04-test-cases.md` (+ `06-code-review.md` nếu tạo).

Trong source:

- Màn danh sách Cài đặt (route `_auth/settings`) với entry "Thông tin cá nhân" + "Đăng xuất" (mục khác theo quyết định gap #5).
- Route màn "Thông tin cá nhân" (form RHF + zod, dùng `@meli/ui` `FormTextField`/`FormSelect`/`FormDatePicker`, đọc/ghi qua `profilesApi`).
- Logout hoàn chỉnh (clear store + redirect `/login`) — có thể kèm migration Supabase nếu chốt thêm cột profile.

**End state:** PR được mở, link spec/plan/test-cases, chờ tech-lead review.
