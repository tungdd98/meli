---
type: orchestrator-plan
produced_by: fe-workflow-orchestrator
task_id: KAN-6
task_type: bug-fix
status: ready-for-confirm
---

# Workflow Plan — KAN-6

> **Ticket:** [KAN-6](https://tungdd-health-tracker.atlassian.net/browse/KAN-6) — [Meli][Phase 1] Khi di chuyển sang màn hình Quản lý cân nặng, bottom nav bị biến mất
>
> **Steps:** Di chuyển sang màn hình Quản lý cân nặng (`/weight`)
> **Actual:** Thanh bottom nav bị biến mất
> **Expected:** Thanh bottom nav được hiển thị

## 1. Task classification

`bug-fix` — Người dùng yêu cầu sửa bug (không phải chỉ điều tra). Bug có triệu chứng rõ ràng và các bước tái hiện, nhưng nguyên nhân gốc chưa được điều tra chính thức nên cần một bước investigation ngắn trước khi sửa. Khả năng cao là lỗi lồng route/layout của route `/weight` (route không nằm trong layout chứa bottom nav).

## 2. Recommended skill flow

1. `fe-bug-investigation` — chưa có report, cần xác định nguyên nhân gốc (dự kiến nhẹ).
2. `fe-writing-plan` — chốt cách sửa từ investigation.
3. `fe-implement` — sửa code (có branch guard).
4. `fe-code-review` — review diff so với plan.
5. `fe-test-design` — viết test cases.
6. `fe-browser-test` _(optional)_ — chạy test trên trình duyệt nếu muốn.
7. `fe-finish-branch` — mở PR, request review.

_Không có bước nào được skip — chưa tồn tại output file `confirmed`/`reviewed` nào trong `docs/fe/KAN-6/`._

## 3. Required inputs before start

(Từ `references/child-skill-inputs.md`, theo từng skill trong flow.)

- [x] Bug description / symptoms / steps — nguồn: ticket KAN-6 (đã lấy qua Jira MCP).
- [x] Jira MCP — khả dụng (đã dùng để đọc ticket).
- [x] Truy cập repo `apps/web` (routes + layout) — nguồn: workspace hiện tại.
- [ ] `05-bug-investigation.md` — sẽ do `fe-bug-investigation` tạo ra (input cho `fe-writing-plan`).
- [ ] `03-plan.md` — sẽ do `fe-writing-plan` tạo ra (input cho `fe-implement` / `fe-test-design`).
- [ ] App đang chạy (`pnpm nx dev web`) + Chrome DevTools MCP — chỉ cần nếu chạy `fe-browser-test`.

_Manifest verified: 2026-05-31 (no drift — `last_verified` 2026-05-29, trong 14 ngày, tất cả child skill v1.0.0)._

## 4. Missing information

- Không có thông tin còn thiếu chặn việc bắt đầu. Mọi input cho bước đầu (`fe-bug-investigation`) đã có sẵn từ ticket + repo.
- Không có secondary task type — đây là bug-fix thuần.

## 5. Execution plan

| #   | Skill                     | Consumes                        | Produces                                | Review gate sau bước                                   |
| --- | ------------------------- | ------------------------------- | --------------------------------------- | ------------------------------------------------------ |
| 1   | `fe-bug-investigation`    | ticket KAN-6, source `apps/web` | `05-bug-investigation.md`               | Dev/tech-lead xác nhận nguyên nhân gốc & ước lượng giờ |
| 2   | `fe-writing-plan`         | `05-bug-investigation.md`       | `03-plan.md`                            | Dev confirm plan                                       |
| 3   | `fe-implement`            | `03-plan.md`                    | source changes (trên branch mới)        | Dev kiểm tra cục bộ                                    |
| 4   | `fe-code-review`          | diff + `03-plan.md`             | inline report (opt `06-code-review.md`) | Dev xử lý findings                                     |
| 5   | `fe-test-design`          | `03-plan.md` (+ context)        | `04-test-cases.md`                      | Dev review test cases                                  |
| 6   | `fe-browser-test` _(opt)_ | `04-test-cases.md`, app chạy    | inline report (opt `07-test-report.md`) | Dev xem kết quả pass/fail                              |
| 7   | `fe-finish-branch`        | branch hoàn chỉnh + docs        | PR                                      | Tech-lead review PR                                    |

## 6. Expected deliverables

- `docs/fe/KAN-6/05-bug-investigation.md` — báo cáo nguyên nhân gốc + phạm vi ảnh hưởng + ước lượng giờ.
- `docs/fe/KAN-6/03-plan.md` — kế hoạch sửa theo file/module.
- `docs/fe/KAN-6/04-test-cases.md` — test cases.
- Source fix trên branch (vd `fix/KAN-6-weight-bottom-nav`) khiến bottom nav hiển thị ở `/weight`.
- **End state:** PR được mở, link tới docs, request tech-lead review.
