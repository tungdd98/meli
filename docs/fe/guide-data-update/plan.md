---
type: orchestrator-plan
produced_by: fe-workflow-orchestrator
task_id: guide-data-update
task_type: enhancement
status: confirmed
---

# Workflow Plan — Cập nhật data phần "Hướng Dẫn" (Guide)

**Nguồn dữ liệu:** https://mali.me/vi/pregnancy-parenting-guide/ (trang index 16 chủ đề). Nội dung theo tuần nằm ở sub-page `https://mali.me/vi/guides/pregnancy-week-by-week-v/`. Mỗi danh mục map tới một URL `/vi/guides/...` riêng (xem mục 4).

**Tính năng đã có:** `apps/web/src/routes/_auth/guide/` — types + data + 3 màn đã build ở task trước (`docs/fe/guide/`). Data hiện tại: `-data.ts` chỉ có **4 tuần mẫu (1–4)** cho `weekly-pregnancy`; 11/12 danh mục còn lại `available: false`.

## 1. Task classification

`enhancement` — Sửa/mở rộng một tính năng FE đã tồn tại. Tính năng Guide (route, types, components, 3 màn) đã hoàn thành; yêu cầu lần này là **thay data mẫu bằng nội dung thật** từ mali.me, có thể kèm mở rộng số tuần và bật thêm danh mục. Không phải feature mới (loại trừ `feature`), không phải sửa lỗi (`bug-*`), và quá lớn để là `trivial` (đổ nội dung nhiều tuần/nhiều danh mục, có thể phải mở rộng data model).

## 2. Recommended skill flow

Theo routing table cho `enhancement` (giống `feature`, `fe-collect-context` có thể nhẹ vì cấu trúc data/tính năng đã rõ). **Không bỏ qua bước nào** — các output trong `docs/fe/guide/` thuộc _phạm vi build feature gốc_ (data mẫu 1–4 tuần), khác phạm vi task này, nên không thoả skip rule cho task folder `docs/fe/guide-data-update/`.

1. `fe-collect-context` (nhẹ) → `01-collected-context.md` — gom URL nguồn + map danh mục↔URL + chốt phạm vi.
2. `fe-brainstorm-spec` → `02-spec.md` — chốt phạm vi (số tuần, danh mục), cách lấy nội dung, có cần mở rộng `GuideBlock`/`-types.ts` không.
3. `fe-writing-plan` → `03-plan.md` — kế hoạch sửa `-data.ts` (+ `-types.ts` nếu mở rộng model).
4. `fe-implement` → code (**phải tạo branch trước — đang ở `main`**).
5. `fe-code-review` → review (tuỳ chọn `06-code-review.md`).
6. `fe-test-design` → `04-test-cases.md` — render đúng nội dung mới, điều hướng tuần/danh mục, edge case tuần thiếu.
7. `fe-browser-test` (tuỳ chọn — có Chrome DevTools MCP) → báo cáo inline.
8. `fe-finish-branch` → mở PR.

## 3. Required inputs before start

(Từ `references/child-skill-inputs.md`, theo từng skill trong flow.)

- [x] **Task identifier** — `guide-data-update` (nguồn: yêu cầu người dùng).
- [x] **≥1 source cho `fe-collect-context`** — URL mali.me (index + sub-page `pregnancy-week-by-week-v`) (nguồn: yêu cầu người dùng).
- [x] **Data model & file đích đã tồn tại** — `apps/web/src/routes/_auth/guide/-data.ts`, `-types.ts` (`GuideBlock`/`GuideWeek`/`GuideCategory`) (nguồn: repo).
- [x] **Chrome DevTools MCP** — sẵn cho `fe-browser-test` (tuỳ chọn).
- [x] **Phạm vi danh mục** — **chỉ `weekly-pregnancy`** (chốt với người dùng 2026-06-01). Các danh mục khác giữ nguyên `available: false`.
- [x] **Phạm vi tuần** — **full tuần** (~40 tuần) cho `weekly-pregnancy` (chốt 2026-06-01).
- [x] **Cách dùng nội dung mali.me** — **copy nguyên văn** (chốt 2026-06-01).
- [ ] **Mở rộng data model?** — nội dung thật có cần ảnh/list/định dạng ngoài `italic|heading|paragraph` hiện tại không → xác định ở `fe-brainstorm-spec` sau khi xem nội dung thật.

_Manifest verified: 2026-06-01 (đọc `child-skill-inputs.md` last_verified 2026-05-29, trong 14 ngày — không drift)._

## 4. Missing information

**Đã chốt (2026-06-01):** chỉ `weekly-pregnancy` · full tuần (~40) · copy nguyên văn · giữ data tĩnh trong `-data.ts`. Map danh mục → URL nguồn (giữ tham khảo cho lần mở rộng sau):

1. **Phạm vi danh mục.** ✅ Chỉ `weekly-pregnancy` (`/vi/guides/pregnancy-week-by-week-v/`).
   | Danh mục (trong app) | URL mali.me |
   |---|---|
   | weekly-pregnancy (Thai kỳ hàng tuần) | `/vi/guides/pregnancy-week-by-week-v/` |
   | baby-growth-monthly (Bé theo tháng) | `/vi/guides/baby-monthly-update-vi/` |
   | pregnancy-signs (Dấu hiệu mang thai) | `/vi/guides/how-to-get-pregnant-vi/` |
   | food-for-mom (Thực phẩm cho mẹ bầu) | `/vi/guides/what-to-eat-during-pregnancy-breastfeeding-vn/` |
   | breastfeeding (Nuôi con bằng sữa mẹ) | `/vi/guides/breastfeeding-guide-vn/` |
   | baby-health (Sức khỏe của bé) | `/vi/guides/babys-health-vn/` |
   | first-aid (Sơ cứu) | `/vi/guides/first-aid-cpr-children-kids-vn/` |
   | baby-feeding (Cho bé ăn) | `/vi/guides/feeding-your-baby-vn/` |
   | yoga-for-mom (Yoga cho mẹ bầu) | `/vi/guides/yoga-for-moms-vn/` |
   | food-for-baby (Thực phẩm cho bé) | `/vi/guides/babys-food-vn/` |
   | childcare-cautions (Điều cần tránh) | `/vi/guides/things-to-avoid-vn/` |
   | mental-health (Sức khỏe tâm thần) | `/vi/guides/mental-health-vn/` |
2. **Phạm vi tuần.** ✅ Full ~40 tuần.
3. **Bản quyền nội dung.** ✅ Copy nguyên văn.
4. **Cấu trúc data target.** ✅ Giữ data tĩnh trong `-data.ts`.

**Rủi ro kỹ thuật cần xử lý ở `fe-collect-context` (advisor lưu ý):** "copy nguyên văn" mâu thuẫn với cách `WebFetch` hoạt động — nó tóm tắt/diễn giải qua một model nhỏ, không trả về text nguyên bản. Bước collect-context phải: (a) xác định nội dung tất cả tuần nằm trên 1 trang hay mỗi tuần một sub-page (~40 lượt fetch — quyết định effort); (b) kiểm tra mali.me là HTML tĩnh hay SPA JS-rendered (nếu SPA thì `WebFetch` trả về rỗng → dùng Chrome DevTools MCP đọc DOM); (c) chốt cách trích xuất giữ nguyên văn (DOM innerText / HTML thô, không phải bản tóm tắt của WebFetch). Nếu trang là SPA và việc lấy ~40 tuần quá nặng → hỏi lại người dùng có chấp nhận subset không.

Phân loại không mơ hồ; không có task type phụ.

## 5. Execution plan

| #   | Skill                        | Tiêu thụ                         | Sản xuất                                                                           | Gate review của người              |
| --- | ---------------------------- | -------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------- |
| 1   | `fe-collect-context`         | URL nguồn + repo data hiện tại   | `01-collected-context.md` (map danh mục↔URL, mẫu nội dung 1 tuần, phạm vi đề xuất) | Duyệt context & chốt phạm vi mục 4 |
| 2   | `fe-brainstorm-spec`         | `01-collected-context.md`        | `02-spec.md` (phạm vi cuối, có mở rộng `-types.ts` không, quy ước nội dung)        | Duyệt spec                         |
| 3   | `fe-writing-plan`            | `02-spec.md`                     | `03-plan.md` (các bước sửa `-data.ts`/`-types.ts`)                                 | Duyệt plan                         |
| 4   | `fe-implement`               | `03-plan.md`                     | Sửa source (sau khi **tạo branch** từ `main`)                                      | Tự review diff                     |
| 5   | `fe-code-review`             | diff + `02-spec.md`/`03-plan.md` | review (tuỳ chọn `06-code-review.md`)                                              | Xử lý góp ý                        |
| 6   | `fe-test-design`             | `02-spec.md` (+`03-plan.md`)     | `04-test-cases.md`                                                                 | Duyệt test cases                   |
| 7   | `fe-browser-test` (tuỳ chọn) | `04-test-cases.md` + app chạy    | báo cáo inline                                                                     | Quyết chạy auto test hay không     |
| 8   | `fe-finish-branch`           | branch hoàn tất                  | PR                                                                                 | Duyệt & merge                      |

## 6. Expected deliverables

Tại `docs/fe/guide-data-update/`: `01-collected-context.md`, `02-spec.md`, `03-plan.md`, `04-test-cases.md` (+ tuỳ chọn `06-code-review.md`, báo cáo browser-test).

Trong source: cập nhật `apps/web/src/routes/_auth/guide/-data.ts` (nội dung tuần/danh mục thật, có thể bật thêm `available: true`); nếu cần mở rộng định dạng nội dung thì cập nhật `-types.ts`.

Trạng thái cuối: PR mở với data Guide đã cập nhật từ nguồn mali.me, theo đúng phạm vi đã chốt.

> Lưu ý vị trí file: theo orchestrator mặc định plan nằm ở `~/.claude/fe-docs/<repo>/<id>/`, nhưng repo này đã có quy ước đặt fe-docs trong `docs/fe/<slug>/` (vd `docs/fe/guide/`). Plan này theo quy ước repo để đồng bộ với artifact sẵn có.
