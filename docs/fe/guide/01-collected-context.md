---
type: collected-context
step: 1
produced_by: fe-collect-context
task_id: guide
task_type_hint: feature
status: ready-for-confirm
created_at: 2026-05-30
---

# Collected Context — guide

Tính năng "Hướng Dẫn" (Guide): màn nội dung hướng dẫn dành cho mẹ bầu, gồm lưới
danh mục → danh sách bài viết theo danh mục → chi tiết bài viết.

## 1. Sources

| #   | Source                                | Type                      | Location / Link                       |
| --- | ------------------------------------- | ------------------------- | ------------------------------------- |
| 1   | IMG_8112.PNG — lưới danh mục          | design image (mockup ảnh) | `docs/features/guide/IMG_8112.PNG`    |
| 2   | IMG_8113.PNG — danh sách tuần thai kỳ | design image (mockup ảnh) | `docs/features/guide/IMG_8113.PNG`    |
| 3   | IMG_8114.PNG — chi tiết bài viết      | design image (mockup ảnh) | `docs/features/guide/IMG_8114.PNG`    |
| 4   | Quyết định người dùng (2026-05-30)    | decision                  | pasted (arguments của skill)          |
| 5   | Route stub hiện có                    | code                      | `apps/web/src/routes/_auth/guide.tsx` |

## 2. Summary per source

### Source 1 — IMG_8112.PNG (lưới danh mục)

Màn hình đầu của tính năng, tiêu đề header "HƯỚNG DẪN" trên nền tím. Nội dung là
lưới 3 cột các thẻ (card) danh mục, mỗi thẻ gồm 1 ảnh vuông phía trên và 1 nhãn
text phía dưới. Có 12 danh mục hiển thị: "Cập nhật sự phát triển của bé theo từng
tháng", "Cập nhật thông tin thai kỳ hàng tuần", "Dấu hiệu mang thai", "Thực phẩm
cho mẹ bầu", "Nuôi con bằng sữa mẹ", "Sức khỏe của bé", "Sơ cứu", "Cho bé ăn",
"Yoga cho mẹ bầu", "Thực phẩm cho bé", "Những điều cần tránh khi chăm sóc trẻ",
"Sức khỏe tâm thần". Bottom navigation 5 tab: Trang chủ, Hướng Dẫn (đang active),
Cộng đồng, Nhật ký, Thêm.

### Source 2 — IMG_8113.PNG (danh sách tuần thai kỳ)

Màn danh sách sau khi chọn danh mục "Cập nhật thông tin thai kỳ hàng tuần". Header
tím có nút back (mũi tên trái) và tiêu đề "Cập nhật thông tin thai kỳ hàng tuần".
Mỗi dòng (row) gồm: 1 icon/ảnh minh họa nhỏ bên trái, tiêu đề "Tuần đầu tiên của
thai kỳ" / "Tuần thứ 2 của thai kỳ" … (hiển thị tới "Tuần thứ 10..." trong ảnh,
ngụ ý danh sách dài), dòng phụ "Cập nhật thông tin thai kỳ hàng tuần", và mũi tên
chevron phải. Cùng bottom navigation như Source 1.

### Source 3 — IMG_8114.PNG (chi tiết bài viết)

Màn chi tiết một mục (ví dụ "Tuần thứ 2 của thai kỳ"). Đầu màn là 1 ảnh hero lớn
(minh họa vẽ tay). Góc trên trái có nút back tròn (mũi tên trái), góc trên phải có
1 nút tròn (icon dạng share/export). Bên dưới ảnh là tiêu đề "Tuần thứ 2 của thai
kỳ", dòng phụ "Cập nhật thông tin thai kỳ hàng tuần", rồi nội dung văn bản gồm:
một đoạn in nghiêng mở đầu, một tiêu đề phụ in đậm "Sự phát triển của Con của bạn",
và đoạn nội dung tiếp theo. Cùng bottom navigation như các màn trên.

### Source 4 — Quyết định người dùng (2026-05-30)

Hai quyết định đã chốt: (1) nguồn dữ liệu = JSON/data tĩnh trong repo (không dùng
backend/Supabase/migration); (2) phạm vi v1 = chỉ triển khai danh mục "Cập nhật
thông tin thai kỳ hàng tuần" (lưới + danh sách tuần + chi tiết tuần); các danh mục
khác để placeholder.

### Source 5 — Route stub hiện có

`apps/web/src/routes/_auth/guide.tsx` hiện chỉ là stub: một `Box` chứa
`Typography variant="h4"` với text "Hướng dẫn". Chưa có lưới, danh sách hay chi
tiết. Route nằm dưới layout `_auth` (TanStack Router file-based).

## 3. Consolidated requirement

Xây dựng tính năng "Hướng Dẫn" gồm ba màn phân cấp: (1) lưới danh mục 3 cột với
ảnh + nhãn; (2) danh sách các mục trong một danh mục (theo tuần thai kỳ), mỗi mục
có icon, tiêu đề, dòng phụ và chevron điều hướng; (3) chi tiết một mục gồm ảnh
hero, nút back, nút góc phải (share/export), tiêu đề, dòng phụ và nội dung văn bản
có đoạn nghiêng + tiêu đề phụ + đoạn thường. Dữ liệu lấy từ JSON/data tĩnh trong
repo. Phạm vi v1 chỉ làm danh mục "Cập nhật thông tin thai kỳ hàng tuần" với đầy
đủ luồng lưới → danh sách tuần → chi tiết tuần; các danh mục còn lại để placeholder.
Tính năng thay thế route stub `_auth/guide.tsx` hiện tại.

## 4. Open gaps / missing information

- [ ] Mô hình & vị trí dữ liệu tĩnh: cấu trúc category → list (tuần) → article
      (hero image + tiêu đề + dòng phụ + các đoạn nội dung); đặt ở `@meli/utils`,
      `@meli/api`, hay data file cục bộ trong app — cần `fe-brainstorm-spec`/plan.
- [ ] Số lượng nội dung cần thật: đủ 40 tuần hay chỉ vài tuần mẫu cho v1 — cần làm rõ.
- [ ] Hành vi nút góc trên phải ở màn chi tiết (Source 3): chia sẻ? export? — chưa rõ.
- [ ] Nguồn ảnh: dùng asset thật (icon tuần + ảnh hero vẽ tay) hay placeholder, và
      ai cung cấp asset — chưa rõ.
- [ ] Cấu trúc điều hướng/URL: cần 3 sub-route (lưới index, danh sách theo danh mục,
      chi tiết bài viết) — chốt cấu trúc URL trong plan.
- [ ] Hành vi khi nhấn các danh mục chưa làm (placeholder): điều hướng vào màn rỗng,
      disable, hay hiển thị "đang cập nhật" — chưa rõ.
- [ ] Cần làm rõ từ: PM/BA (số lượng nội dung, hành vi nút share, xử lý placeholder)
      và designer/asset owner (ảnh icon + hero).

## 5. Suggested task type

`feature` — Tính năng FE hoàn toàn mới với 3 màn phân cấp dữ liệu thật; route hiện
tại chỉ là stub rỗng.
