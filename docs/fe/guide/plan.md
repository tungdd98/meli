---
type: orchestrator-plan
produced_by: fe-workflow-orchestrator
task_id: guide
task_type: feature
status: ready-for-confirm
---

# Workflow Plan — Tính năng "Hướng Dẫn" (Guide)

**Design:** `docs/features/guide/IMG_8112.PNG`, `IMG_8113.PNG`, `IMG_8114.PNG` (mockup ảnh, không phải `.pen`)

## 1. Task classification

`feature` — Tính năng FE hoàn toàn mới. Route `_auth/guide.tsx` hiện chỉ là stub rỗng (chỉ có tiêu đề "Hướng dẫn"). Mockup mô tả 3 màn hình mới với phân cấp dữ liệu thật: lưới danh mục → danh sách bài viết theo danh mục → chi tiết bài viết.

## 2. Recommended skill flow

Theo routing table cho `feature` (không có output file nào tồn tại trong `docs/fe/guide/` → không bỏ qua bước nào):

1. `fe-collect-context` → `01-collected-context.md`
2. `fe-brainstorm-spec` → `02-spec.md`
3. `fe-writing-plan` → `03-plan.md`
4. `fe-implement` → code (yêu cầu tạo branch trước, đang ở `main`)
5. `fe-code-review` → review inline (tùy chọn `06-code-review.md`)
6. `fe-test-design` → `04-test-cases.md`
7. `fe-browser-test` (tùy chọn — có Chrome DevTools MCP) → báo cáo inline
8. `fe-finish-branch` → mở PR

## 3. Required inputs before start

(Từ `references/child-skill-inputs.md`, theo từng skill trong flow.)

- [x] **Task identifier** — `guide` (nguồn: yêu cầu người dùng).
- [x] **≥1 source cho `fe-collect-context`** — 3 mockup tại `docs/features/guide/` (lưới danh mục, danh sách tuần thai kỳ, chi tiết bài viết).
- [x] **Design system** — `@meli/ui`, MUI v6 theme, `shape.*` tokens (đã có trong repo).
- [x] **Route nền** — `apps/web/src/routes/_auth/guide.tsx` (stub đã tồn tại, TanStack Router file-based).
- [x] **Chrome DevTools MCP** — sẵn sàng cho `fe-browser-test` (tùy chọn).
- [x] **Nguồn dữ liệu nội dung** — **JSON/data tĩnh** trong repo (chốt với người dùng 2026-05-30). Không cần Supabase/migration. Vị trí cụ thể (`@meli/utils` vs data file cục bộ) chốt ở `fe-writing-plan`.
- [x] **Phạm vi v1** — **chỉ danh mục "Cập nhật thông tin thai kỳ hàng tuần"** (lưới + danh sách tuần + chi tiết tuần). Các danh mục khác để placeholder.
- [ ] **Schema/cấu trúc nội dung** — mô hình category → list (tuần) → article cho dữ liệu tĩnh. Định nghĩa cụ thể trong `fe-brainstorm-spec`.
- [ ] **Branch làm việc** — đang ở `main` (protected). `fe-implement` sẽ chặn nếu chưa tạo branch.

_Manifest verified: 2026-05-30 (no drift — `child-skill-inputs.md` last_verified 2026-05-29, < 14 ngày, tất cả child skill v1.0.0)._

## 4. Missing information

Đã chốt với người dùng (2026-05-30): **nguồn = JSON/data tĩnh**, **phạm vi = chỉ danh mục "thai kỳ hàng tuần"**.

Còn cần làm rõ khi vào `fe-brainstorm-spec`:

- **Mô hình & vị trí dữ liệu tĩnh**: cấu trúc category → list (40 tuần) → article (hero image + tiêu đề + các đoạn). Đặt ở `@meli/utils` hay data file trong app? Có cần đủ nội dung 40 tuần hay chỉ vài tuần mẫu?
- **Action ở màn chi tiết**: Nút back + nút góc trên phải (chia sẻ?) làm gì.
- **Ảnh**: dùng asset thật hay placeholder; nguồn ảnh.
- **Điều hướng**: cần 3 sub-route (lưới index, danh sách theo danh mục, chi tiết bài viết) — chốt cấu trúc URL trong plan.

Không có secondary task type; phân loại `feature` rõ ràng.

## 5. Execution plan

| #   | Skill                   | Tiêu thụ              | Sản xuất                                  | Review gate                            |
| --- | ----------------------- | --------------------- | ----------------------------------------- | -------------------------------------- |
| 1   | `fe-collect-context`    | 3 mockup + mô tả      | `01-collected-context.md` + danh sách gap | Dev xác nhận context & gap             |
| 2   | `fe-brainstorm-spec`    | `01-...md`            | `02-spec.md`                              | Dev chốt spec (đặc biệt nguồn dữ liệu) |
| 3   | `fe-writing-plan`       | `02-spec.md`          | `03-plan.md`                              | Dev duyệt plan (file/module level)     |
| 4   | `fe-implement`          | `03-plan.md`          | code (sau khi tạo branch)                 | Dev review code thủ công               |
| 5   | `fe-code-review`        | diff + spec/plan      | review inline                             | Dev xử lý finding                      |
| 6   | `fe-test-design`        | `02-spec.md` (+ `03`) | `04-test-cases.md`                        | Dev duyệt test cases                   |
| 7   | `fe-browser-test` (opt) | `04-...md` + app chạy | báo cáo pass/fail                         | Dev quyết định chạy hay bỏ             |
| 8   | `fe-finish-branch`      | branch + docs         | PR                                        | Tech-lead review PR                    |

Các gate review thủ công giữa mỗi bước — không tự động chạy cả chuỗi.

## 6. Expected deliverables

Trong `docs/fe/guide/`: `01-collected-context.md`, `02-spec.md`, `03-plan.md`, `04-test-cases.md` (+ tùy chọn `06-code-review.md`).

Code: màn Hướng Dẫn hoàn chỉnh trong `apps/web/src/routes/_auth/guide*` (lưới danh mục + danh sách theo danh mục + chi tiết bài viết), dùng `@meli/ui` + MUI theme, có thể kèm layer dữ liệu trong `@meli/api`.

End state: PR mở, liên kết spec/plan/test-cases, gửi tech-lead review.
