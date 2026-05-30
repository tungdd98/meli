---
type: fe-spec
produced_by: fe-brainstorm-spec
task_id: guide
depends_on: 01-collected-context.md
status: confirmed
---

# FE Spec — guide (Tính năng "Hướng Dẫn")

## 1. Overview

Tính năng "Hướng Dẫn" cung cấp nội dung tham khảo cho mẹ bầu, tổ chức theo phân cấp ba màn: lưới danh mục → danh sách bài theo danh mục → chi tiết bài. v1 chỉ triển khai đầy đủ luồng cho danh mục "Cập nhật thông tin thai kỳ hàng tuần" với vài tuần mẫu (1–4); 11 danh mục còn lại hiển thị ở lưới nhưng disable kèm nhãn "Sắp có". Dữ liệu lấy từ data module tĩnh trong app (không backend). Tính năng thay thế route stub `_auth/guide.tsx`.

## 2. Screens & components

| Screen / component                   | Responsibility                                                                                                                                                           | Notes                                                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `GuideIndexPage` (lưới danh mục)     | Lưới 3 cột các thẻ danh mục (ảnh placeholder + nhãn). Thẻ `available` điều hướng vào danh sách; thẻ chưa làm disable + badge "Sắp có".                                   | Route `/_auth/guide/` (index). Header "Hướng Dẫn".                                                            |
| `GuideCategoryPage` (danh sách tuần) | Danh sách các mục trong danh mục: mỗi dòng icon placeholder + tiêu đề "Tuần thứ N của thai kỳ" + dòng phụ + chevron; nhấn → chi tiết. Header có nút back + tên danh mục. | Route `/_auth/guide/$categorySlug/`.                                                                          |
| `GuideDetailPage` (chi tiết tuần)    | Ảnh hero placeholder + nút back tròn (góc trái) + tiêu đề + dòng phụ + nội dung phân block (italic / heading / paragraph).                                               | Route `/_auth/guide/$categorySlug/$week`. KHÔNG có nút góc phải (đã bỏ ở v1).                                 |
| `GuideCategoryCard`                  | Thẻ danh mục dùng lại trong lưới; biến thể available / disabled ("Sắp có").                                                                                              | Ưu tiên dùng card từ `@meli/ui`; chỉ layout ở `sx`.                                                           |
| Data module `guide/-data.ts`         | Nguồn dữ liệu tĩnh typed: `guideCategories`, nội dung tuần.                                                                                                              | Co-locate dưới route: `apps/web/src/routes/_auth/guide/-data.ts` (+ `-types.ts`), theo convention prefix `-`. |

**Mô hình dữ liệu (typed, tĩnh):**

```ts
type GuideBlock = { type: 'italic' | 'heading' | 'paragraph'; text: string };
type GuideWeek = {
  week: number;
  title: string;
  subtitle: string;
  image?: string;
  body: GuideBlock[];
};
type GuideCategory = {
  slug: string;
  title: string;
  image?: string;
  available: boolean;
};
```

`weekly-pregnancy` là danh mục `available: true`; các danh mục khác `available: false`.

## 3. States

**GuideIndexPage**

- Loading: không có (dữ liệu tĩnh, render đồng bộ).
- Empty: không áp dụng (luôn có 12 danh mục).
- Error: không áp dụng.
- Success: lưới 12 thẻ; thẻ available bấm được, thẻ disabled mờ + badge "Sắp có" (không điều hướng, không snackbar).

**GuideCategoryPage**

- Loading: không có.
- Empty: nếu `categorySlug` không có tuần nào → empty state "Nội dung đang được cập nhật".
- Error: `categorySlug` không tồn tại / không `available` → điều hướng về `/_auth/guide/` (hoặc notFound).
- Success: danh sách các tuần theo thứ tự tăng dần.

**GuideDetailPage**

- Loading: không có.
- Empty: không áp dụng.
- Error: `week` không tồn tại trong danh mục → notFound / quay lại danh sách.
- Success: hero + tiêu đề + dòng phụ + các block nội dung theo thứ tự.

## 4. API consumed

Không có API. Toàn bộ dữ liệu đọc từ data module tĩnh co-located `apps/web/src/routes/_auth/guide/-data.ts`. Truy cập đồng bộ qua helper (vd `getCategory(slug)`, `getWeek(slug, week)`); không dùng React Query cho v1.

## 5. Edge cases

- Nhấn thẻ danh mục `available: false` → không có hành động (disabled, badge "Sắp có").
- `categorySlug` không hợp lệ hoặc trỏ tới danh mục disabled → không render danh sách; điều hướng về lưới / notFound.
- `week` param không phải số hợp lệ hoặc vượt phạm vi dữ liệu → notFound / quay lại danh sách.
- Danh mục available nhưng (giả định) chưa có tuần nào → empty state.
- Nội dung tuần dài → trang cuộn được; tránh che bởi bottom navigation (padding đáy).
- Ảnh placeholder thiếu/lỗi → fallback nền màu/icon, không vỡ layout.

## 6. Responsive behavior

- Bố cục mobile-first khớp mockup. Lưới danh mục: 3 cột trên mobile; ở màn rộng hơn giữ tối đa chiều rộng nội dung (container), không kéo dãn vô hạn.
- Danh sách tuần: dòng full-width, icon trái + nội dung + chevron phải, xuống dòng tiêu đề an toàn.
- Chi tiết: ảnh hero full-width theo container; nội dung văn bản có lề đọc thoải mái.
- Mọi màn chừa khoảng đệm đáy cho bottom navigation hiện có.

## 7. Acceptance criteria

- [ ] Given ở `/_auth/guide/`, When mở màn, Then thấy lưới 3 cột 12 danh mục đúng nhãn mockup; tab "Hướng Dẫn" active ở bottom nav.
- [ ] Given lưới danh mục, When nhấn "Cập nhật thông tin thai kỳ hàng tuần", Then điều hướng tới `/_auth/guide/weekly-pregnancy/` và thấy danh sách các tuần mẫu (1–4).
- [ ] Given lưới danh mục, When nhấn một danh mục "Sắp có", Then không điều hướng và thẻ hiển thị trạng thái disabled + badge "Sắp có".
- [ ] Given danh sách tuần, When nhấn một dòng "Tuần thứ N", Then điều hướng tới `/_auth/guide/weekly-pregnancy/N` và thấy chi tiết tuần đó.
- [ ] Given màn chi tiết, Then hiển thị ảnh hero placeholder, nút back tròn góc trái, tiêu đề, dòng phụ, và nội dung phân block (italic/heading/paragraph) đúng thứ tự; KHÔNG có nút góc phải.
- [ ] Given màn danh sách hoặc chi tiết, When nhấn back, Then quay lại màn cấp trên.
- [ ] Given truy cập trực tiếp URL với `categorySlug`/`week` không hợp lệ, Then xử lý notFound/redirect mà không crash.
- [ ] Toàn bộ UI dùng `@meli/ui` + MUI theme tokens + `shape.*`; không hard-code màu/đo đạc từ mockup.

## 8. Open questions resolved

- Mô hình & vị trí dữ liệu tĩnh → **resolved**: data module typed co-located tại `apps/web/src/routes/_auth/guide/-data.ts` (category → week → block), theo convention prefix `-` (chốt khi duyệt plan 2026-05-30).
- Số lượng nội dung tuần → **resolved**: vài tuần mẫu (1–4).
- Hành vi nút góc phải màn chi tiết → **resolved**: bỏ qua, không làm ở v1.
- Nguồn ảnh → **resolved**: placeholder (không chờ asset thật).
- Cấu trúc điều hướng/URL → **resolved**: `/_auth/guide/`, `/_auth/guide/$categorySlug/`, `/_auth/guide/$categorySlug/$week`.
- Hành vi danh mục placeholder → **resolved**: disable + badge "Sắp có", không điều hướng.
