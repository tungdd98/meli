---
type: bug-investigation
produced_by: fe-bug-investigation
task_id: KAN-6
severity: P3
reproduction_rate: always
estimate_hours: 1
report_language: vi
status: ready-for-review
---

# Bug Investigation — KAN-6 Bottom nav biến mất ở màn hình Quản lý cân nặng

> Viết bằng tiếng Việt, khớp ngôn ngữ hội thoại. Mục 1 dành cho người không chuyên kỹ thuật (BA/QC); các mục sau dành cho tech lead.

## 1. Tóm tắt (cho tất cả mọi người)

Khi người dùng mở màn hình **Quản lý cân nặng** (`/weight`), thanh điều hướng dưới cùng (bottom nav: Trang chủ / Hướng dẫn / AI / Cài đặt) không hiển thị. Hậu quả là từ màn hình này người dùng không thể chuyển nhanh sang các mục khác bằng thanh điều hướng quen thuộc; họ phải bấm nút quay lại (mũi tên ở góc trên) để về Trang chủ rồi mới đi tiếp.

Nguyên nhân không phải lỗi ngẫu nhiên: màn hình Quản lý cân nặng **chưa bao giờ** được gắn thanh điều hướng dưới cùng kể từ khi nó được tạo ra. Đây là một thiếu sót khi dựng màn hình, không phải hồi quy do thay đổi gần đây. Lỗi xảy ra **100%** mỗi lần vào màn hình. Mức độ ưu tiên đánh giá là **P3** (ảnh hưởng trải nghiệm điều hướng, không gây mất dữ liệu hay chặn nghiệp vụ).

## 2. Reproduction

- **Steps:**
  1. Đăng nhập và hoàn tất onboarding.
  2. Từ Trang chủ, mở màn hình Quản lý cân nặng (`/weight`).
  3. Quan sát đáy màn hình.
- **Kết quả thực tế:** Không có thanh bottom nav.
- **Kết quả mong đợi:** Thanh bottom nav hiển thị (như ở Trang chủ, Hướng dẫn).
- **Reproduction rate:** always (100%).
- **Environment:** Không phụ thuộc trình duyệt/OS — lỗi nằm ở mã nguồn màn hình, tái hiện trên mọi môi trường.

## 3. Root cause (cho tech lead)

Bottom nav trong app **không** được render ở layout dùng chung. Mỗi màn hình tự render component `<AppBottomNav>` của riêng nó. Bằng chứng:

- `apps/web/src/routes/__root.tsx:9-16` — root layout chỉ render `<Outlet />`, không có bottom nav.
- `apps/web/src/routes/_auth.tsx:12` — layout `_auth` cũng chỉ là `<Outlet />`, không có bottom nav.
- Các màn hình hoạt động đúng đều **tự render** `<AppBottomNav>` làm phần tử cuối:
  - `apps/web/src/routes/_auth/index.tsx:142` → `<AppBottomNav value={0} />`
  - `apps/web/src/routes/_auth/guide/index.tsx:57` → `<AppBottomNav value={1} />`
  - `apps/web/src/routes/_auth/guide/$categorySlug/index.tsx:106`
  - `apps/web/src/routes/_auth/guide/$categorySlug/$week.tsx:109`

Màn hình `apps/web/src/routes/_auth/weight.tsx` (component `WeightPage`, dòng 325-509) **không import và không render** `<AppBottomNav>`. Nó dựng riêng một `Box` cao `100dvh` gồm `AppBar` + vùng nội dung cuộn + `Fab`, nhưng kết thúc ở dòng 507 mà không có thanh điều hướng.

**Commit giới thiệu lỗi:** `db599c3` — _"feat(weight): add weight tracking screen with chart, history list, and CRUD dialogs"_ (2026-05-28). Kiểm chứng: trong commit này file `weight.tsx` có 0 lần xuất hiện `AppBottomNav` (`git show db599c3:apps/web/src/routes/_auth/weight.tsx | grep -c AppBottomNav` → `0`). Như vậy đây là thiếu sót ngay từ khi tạo màn hình, không phải hồi quy.

**Lưu ý phụ về layout:** Các màn hình đúng còn thêm padding dưới cho vùng cuộn để nội dung không bị thanh nav (fixed, cao 64px — `libs/ui/src/lib/components/BottomNav/BottomNav.tsx:27-30`) che mất. Ví dụ `guide/index.tsx:31` dùng `pb: 10`. Vùng cuộn của `weight.tsx:381` (`flex: 1, overflowY: 'auto'`) hiện không có padding dưới — khi thêm nav cần bổ sung để dòng cuối bảng và Fab không bị che.

## 4. Impact scope

- **Màn hình/luồng bị ảnh hưởng:** Chỉ màn hình Quản lý cân nặng (`/weight`). Các màn hình khác có nav hoạt động bình thường.
- **Người dùng / dữ liệu bị ảnh hưởng:** Tất cả người dùng vào màn hình cân nặng. Không ảnh hưởng dữ liệu — thuần điều hướng/UI.
- **Rủi ro hồi quy khi sửa:** Thấp. Thay đổi gói gọn trong `weight.tsx`. Rủi ro duy nhất là layout: nếu thêm nav mà không thêm padding dưới, dòng cuối bảng/Fab có thể bị nav che. Cần xác minh trực quan sau khi sửa.

## 5. Fix options

| Option | Approach                                                                                                            | Pros                                            | Cons                                                                                                                                                                                                         | Est. (hours) |
| ------ | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| A      | Thêm `<AppBottomNav value={?} />` vào cuối `WeightPage` + thêm padding dưới cho vùng cuộn (giống các màn hình khác) | Khớp đúng pattern hiện có, nhỏ gọn, rủi ro thấp | Lặp lại pattern per-page (đã là hiện trạng của codebase)                                                                                                                                                     | 1            |
| B      | Nâng bottom nav lên layout dùng chung (`_auth.tsx`) để mọi màn hình con tự có nav                                   | Loại bỏ trùng lặp, tránh tái diễn lỗi này       | Phạm vi lớn hơn: phải refactor 4+ màn hình đang tự render nav, xử lý `value` theo route, và các màn hình "detail" cố tình không muốn nav (cần rà soát) → rủi ro hồi quy cao hơn, ngoài scope của một bug-fix | 3-4          |

## 6. Recommendation

Chọn **Option A**. Đây là bug-fix nên cần thay đổi tối thiểu, khớp pattern hiện có và rủi ro thấp nhất. Cụ thể trong `apps/web/src/routes/_auth/weight.tsx`:

- Import `AppBottomNav` từ `../../components/AppBottomNav`.
- Render `<AppBottomNav value={...} />` làm phần tử cuối của `Box` gốc (sau `Fab`).
- Bổ sung padding dưới cho vùng cuộn (`weight.tsx:381`, ví dụ `pb: 10` như `guide/index.tsx`) để bảng và Fab không bị nav che.
- Lưu ý `value`: `/weight` không nằm trong 4 tab của nav (`NAV_ROUTES = ['/', '/guide', '/ai', '/settings']` — `AppBottomNav.tsx:17`). Cần thống nhất với BA/design xem nên highlight tab nào (gợi ý: Trang chủ `value={0}`, vì có nút back về `/`), hoặc cho phép không tab nào active. Đây là điểm cần làm rõ trước khi code.

Option B (đưa nav lên layout chung) là cải tiến kiến trúc tốt nên cân nhắc tách thành task refactor riêng, không gộp vào bug-fix này.

## 7. Effort estimate

- **Total:** ~1 giờ.
  - Điều tra: đã hoàn tất.
  - Sửa code (`weight.tsx`: thêm nav + padding): ~0.5h.
  - Làm rõ `value` của tab với BA/design + kiểm tra trực quan (nav hiển thị, không che nội dung/Fab): ~0.5h.
