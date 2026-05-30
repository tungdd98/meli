---
type: test-report
produced_by: fe-browser-test
depends_on: 04-test-cases.md
status: draft
---

# Test Report — guide (Tính năng "Hướng Dẫn")

- **Môi trường:** `http://localhost:4200` (dev server đang chạy), branch `feat/guide-feature`.
- **Công cụ:** Chrome DevTools MCP.
- **Session:** browser đã có phiên đăng nhập + onboarding hoàn tất (qua được auth guard `_auth`).
- **Ngày chạy:** 2026-05-30.
- **Kết quả:** 15/15 PASS (TC-14 fail ban đầu, đã fix + verify lại).

| ID    | Kết quả           | Ghi chú / Bằng chứng                                                                                                                                                                                  |
| ----- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TC-01 | ✅ PASS           | `/guide`: header "HƯỚNG DẪN", 12 danh mục; chỉ "thai kỳ hàng tuần" là button, 11 mục còn lại có nhãn "Sắp có" (StaticText, không tương tác); tab "Hướng dẫn" active.                                  |
| TC-02 | ✅ PASS           | Bấm danh mục → `/guide/weekly-pregnancy`, header có back + tên danh mục, 4 dòng tuần (Tuần đầu tiên → Tuần thứ 4) kèm dòng phụ.                                                                       |
| TC-03 | ✅ PASS           | Bấm "Tuần thứ 2" → `/guide/weekly-pregnancy/2`: hero, back, tiêu đề, dòng phụ, block nghiêng → heading đậm → đoạn thường đúng thứ tự; KHÔNG có nút góc phải.                                          |
| TC-04 | ✅ PASS           | Thẻ "Sắp có" render `StaticText` (không có role button) → không điều hướng. Xác nhận cấu trúc + ảnh chụp (thẻ mờ + chip).                                                                             |
| TC-05 | ✅ PASS           | Back từ danh sách → `/guide`.                                                                                                                                                                         |
| TC-06 | ✅ PASS           | Back từ chi tiết → `/guide/weekly-pregnancy`.                                                                                                                                                         |
| TC-07 | ✅ PASS           | `/guide/khong-ton-tai` → redirect `/guide`, không crash.                                                                                                                                              |
| TC-08 | ✅ PASS           | `/guide/first-aid` (slug có thật, `available: false`) → redirect `/guide`.                                                                                                                            |
| TC-09 | ✅ PASS           | `/guide/weekly-pregnancy/99` → "Not Found".                                                                                                                                                           |
| TC-10 | ✅ PASS           | `/guide/weekly-pregnancy/abc` → "Not Found".                                                                                                                                                          |
| TC-11 | ✅ PASS           | Bottom nav: "Trang chủ" → `/`; "Hướng dẫn" → `/guide`. (home cũng dùng `AppBottomNav` sau refactor.)                                                                                                  |
| TC-12 | ✅ PASS           | Chi tiết 375px: nội dung không bị bottom nav (fixed) che, có khoảng đệm đáy.                                                                                                                          |
| TC-13 | ✅ PASS           | Lưới 375px: 3 cột, thẻ vuông, nhãn xuống dòng gọn, "Sắp có" mờ, thẻ available nổi bật.                                                                                                                |
| TC-14 | ✅ PASS (sau fix) | Ban đầu FAIL: lưới 1280px kéo dãn full viewport. Đã fix (bọc 3 màn guide trong container `maxWidth: 480, mx: 'auto'`); verify lại ở 1280px: lưới giới hạn 480px căn giữa, thẻ kích thước bình thường. |
| TC-15 | ✅ PASS           | Danh sách 375px: mỗi dòng full-width, icon trái + tiêu đề/dòng phụ + chevron phải, tiêu đề xuống dòng an toàn.                                                                                        |

## Coverage

- Acceptance criteria AC1–AC7 đều PASS qua các case tương ứng.
- AC8 (design-system) đã được code review xác nhận; runtime layout phù hợp ngoại trừ AC6 responsive trên màn rộng (TC-14).

## Defect đã xử lý

- **D1 (TC-14) — RESOLVED:** Lưới/danh sách/chi tiết guide không giới hạn chiều rộng trên viewport rộng (vi phạm spec §6).
  - **Fix:** bọc nội dung 3 màn guide trong container `maxWidth: 480, mx: 'auto'`.
  - **Verify:** chạy lại TC-14 ở 1280px → PASS; build/typecheck/lint xanh.
