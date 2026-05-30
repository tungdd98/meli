---
type: test-cases
produced_by: fe-test-design
depends_on: 02-spec.md, 03-plan.md
status: draft
---

# Test Cases — guide (Tính năng "Hướng Dẫn")

Derived from `02-spec.md` acceptance criteria và `03-plan.md`. Mỗi case chạy được thủ công hoặc qua `fe-browser-test`. App chạy `pnpm nx dev web`; vào sau khi đã đăng nhập + onboarding (route `_auth`).

Acceptance criteria (spec §7) đánh số AC1–AC8 theo thứ tự xuất hiện.

| ID    | Title                                           | Type       | Preconditions                                      | Steps                                                                | Expected result                                                                                                                                                                                                            |
| ----- | ----------------------------------------------- | ---------- | -------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TC-01 | Lưới danh mục hiển thị đúng                     | happy      | Đã đăng nhập, ở bất kỳ màn nào                     | 1. Mở `/guide` (hoặc bấm tab "Hướng dẫn")                            | Header "HƯỚNG DẪN"; lưới 3 cột gồm 12 thẻ đúng nhãn mockup; tab "Hướng dẫn" active ở bottom nav                                                                                                                            |
| TC-02 | Vào danh mục thai kỳ hàng tuần                  | happy      | Đang ở `/guide`                                    | 1. Bấm thẻ "Cập nhật thông tin thai kỳ hàng tuần"                    | Điều hướng tới `/guide/weekly-pregnancy`; hiển thị danh sách các tuần mẫu (Tuần đầu tiên… đến Tuần thứ 4); header có tên danh mục + nút back                                                                               |
| TC-03 | Mở chi tiết một tuần                            | happy      | Đang ở `/guide/weekly-pregnancy`                   | 1. Bấm dòng "Tuần thứ 2 của thai kỳ"                                 | Điều hướng tới `/guide/weekly-pregnancy/2`; hiển thị ảnh hero placeholder, nút back tròn góc trái, tiêu đề "Tuần thứ 2 của thai kỳ", dòng phụ, nội dung phân block (nghiêng/đậm/thường) đúng thứ tự; KHÔNG có nút góc phải |
| TC-04 | Thẻ danh mục "Sắp có" không điều hướng          | edge       | Đang ở `/guide`                                    | 1. Bấm thẻ "Sơ cứu" (hoặc bất kỳ danh mục `available: false`)        | Không điều hướng; thẻ hiển thị mờ + chip "Sắp có"; URL không đổi                                                                                                                                                           |
| TC-05 | Back từ danh sách về lưới                       | happy      | Đang ở `/guide/weekly-pregnancy`                   | 1. Bấm nút back ở header                                             | Quay lại `/guide` (lưới danh mục)                                                                                                                                                                                          |
| TC-06 | Back từ chi tiết về danh sách                   | happy      | Đang ở `/guide/weekly-pregnancy/2`                 | 1. Bấm nút back tròn góc trái                                        | Quay lại `/guide/weekly-pregnancy` (danh sách tuần)                                                                                                                                                                        |
| TC-07 | Truy cập trực tiếp slug không hợp lệ            | error      | —                                                  | 1. Mở URL `/guide/khong-ton-tai`                                     | Redirect về `/guide`; không crash                                                                                                                                                                                          |
| TC-08 | Truy cập trực tiếp danh mục chưa available      | error      | —                                                  | 1. Mở URL `/guide/first-aid` (slug có thật nhưng `available: false`) | Redirect về `/guide`; không crash                                                                                                                                                                                          |
| TC-09 | Truy cập tuần không tồn tại                     | error      | —                                                  | 1. Mở URL `/guide/weekly-pregnancy/99`                               | Hiển thị notFound (không render chi tiết, không crash)                                                                                                                                                                     |
| TC-10 | Truy cập tuần không phải số                     | error      | —                                                  | 1. Mở URL `/guide/weekly-pregnancy/abc`                              | Hiển thị notFound; không crash                                                                                                                                                                                             |
| TC-11 | Bottom nav điều hướng giữa tab                  | happy      | Đang ở `/guide`                                    | 1. Bấm tab "Trang chủ" 2. Bấm lại tab "Hướng dẫn"                    | Lần 1 về `/`; lần 2 trở lại `/guide`; tab active cập nhật đúng                                                                                                                                                             |
| TC-12 | Nội dung dài cuộn được, không bị bottom nav che | edge       | Đang ở `/guide/weekly-pregnancy/2`                 | 1. Cuộn xuống cuối nội dung                                          | Nội dung cuộn mượt; phần cuối không bị bottom nav (fixed) che; có khoảng đệm đáy                                                                                                                                           |
| TC-13 | Lưới responsive trên viewport hẹp               | responsive | —                                                  | 1. Mở `/guide` ở viewport ~375px                                     | Lưới giữ 3 cột, thẻ vuông không vỡ layout, nhãn xuống dòng gọn                                                                                                                                                             |
| TC-14 | Lưới responsive trên viewport rộng              | responsive | —                                                  | 1. Mở `/guide` ở viewport ≥1024px                                    | Layout không vỡ; nội dung không kéo dãn gây khó đọc (theo spec §6 — giới hạn chiều rộng nội dung)                                                                                                                          |
| TC-15 | Danh sách tuần responsive                       | responsive | Đang ở `/guide/weekly-pregnancy` ở viewport ~375px | 1. Quan sát các dòng                                                 | Mỗi dòng full-width: icon trái + tiêu đề/dòng phụ + chevron phải; tiêu đề dài xuống dòng an toàn                                                                                                                           |

## Coverage notes

- Acceptance criteria covered:
  - AC1 (lưới + tab active) → TC-01, TC-11
  - AC2 (vào danh mục thai kỳ → danh sách tuần) → TC-02
  - AC3 (danh mục "Sắp có" disable, không điều hướng) → TC-04
  - AC4 (danh sách → chi tiết tuần) → TC-03
  - AC5 (màn chi tiết: hero, back trái, tiêu đề/phụ, block, KHÔNG nút phải) → TC-03
  - AC6 (nút back quay lại cấp trên) → TC-05, TC-06
  - AC7 (URL slug/week không hợp lệ → notFound/redirect, không crash) → TC-07, TC-08, TC-09, TC-10
  - AC8 (UI dùng @meli/ui + theme tokens, không hard-code) → kiểm tra bằng code review (đã pass), không phải test runtime; gián tiếp qua TC-12..TC-15 về layout/spacing
- Bổ sung ngoài AC: TC-12 (cuộn/bottom nav che), TC-13–TC-15 (responsive chi tiết).
- Out of scope: 11 danh mục khác chỉ kiểm tra trạng thái disabled (TC-04), không kiểm tra nội dung; nút share/export (đã bỏ ở v1); nội dung đủ 40 tuần; ảnh asset thật.
