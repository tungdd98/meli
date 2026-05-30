---
type: fe-plan
produced_by: fe-writing-plan
depends_on: 02-spec.md
status: confirmed
---

# Implementation Plan — guide (Tính năng "Hướng Dẫn")

## Goal

Thay route stub `_auth/guide.tsx` bằng luồng 3 màn (lưới danh mục → danh sách tuần → chi tiết tuần), dữ liệu tĩnh, v1 chỉ triển khai danh mục "thai kỳ hàng tuần" với vài tuần mẫu.

## Approach

Bám theo `02-spec.md`. Dùng TanStack Router file-based với route lồng nhau dưới `_auth/guide/`, co-locate data + components bằng prefix `-` (theo convention `onboarding/-shared.tsx`). Tái sử dụng pattern khung màn hình của các route hiện có (`AppBar`/`Toolbar` + back, `BottomNav` từ `@meli/ui`). Không backend, không React Query — đọc data tĩnh đồng bộ qua helper. Toàn bộ UI dùng `@meli/ui` + MUI theme tokens + `shape.*`.

## Implementation steps

1. **Định nghĩa types + data tĩnh** — tạo `routes/_auth/guide/-types.ts` (`GuideBlock`, `GuideWeek`, `GuideCategory`) và `routes/_auth/guide/-data.ts` chứa `guideCategories` (12 mục, chỉ `weekly-pregnancy` có `available: true`) + nội dung 1–4 tuần mẫu, kèm helper `getCategory(slug)` / `getWeek(slug, week)`.

2. **Chuyển stub thành route lồng nhau** — xoá `routes/_auth/guide.tsx`; tạo `routes/_auth/guide/index.tsx` cho lưới danh mục. Để `routeTree.gen.ts` tự sinh (không sửa tay). Giữ nguyên `NAV_ROUTES`/`/guide` đang dùng ở bottom nav.

3. **Component thẻ danh mục** — tạo `routes/_auth/guide/-components/GuideCategoryCard.tsx`: biến thể `available` (bấm điều hướng) và `disabled` (mờ + badge "Sắp có", không điều hướng). Ưu tiên `Card`/`CardActionArea` của MUI + theme tokens.

4. **Màn lưới danh mục (`guide/index.tsx`)** — `AppBar` tiêu đề "Hướng Dẫn", lưới 3 cột render `GuideCategoryCard` từ `guideCategories`; `BottomNav` value=1 (tab Hướng Dẫn), `onChange` điều hướng theo `NAV_ROUTES`. Thẻ available → `navigate` tới `/guide/$categorySlug`.

5. **Màn danh sách tuần (`guide/$categorySlug/index.tsx`)** — đọc `categorySlug` param; nếu không tồn tại/không `available` → redirect về `/guide` (hoặc notFound). `AppBar` có nút back + tên danh mục; render danh sách dòng (icon placeholder + "Tuần thứ N" + dòng phụ + `ChevronRightRounded`), bấm → `/guide/$categorySlug/$week`. Empty state khi không có tuần.

6. **Màn chi tiết tuần (`guide/$categorySlug/$week.tsx`)** — đọc `categorySlug` + `week`; không hợp lệ → notFound/redirect. Ảnh hero placeholder + nút back tròn góc trái (KHÔNG nút góc phải); tiêu đề + dòng phụ + render `body` theo `block.type` (italic/heading/paragraph). Padding đáy tránh bottom nav.

7. **Lint/typecheck** — `pnpm nx lint web` + `pnpm nx typecheck web`; xác minh route tree sinh đúng và 3 màn điều hướng được.

## Risk points

- **Chuyển flat route → directory**: xoá `guide.tsx` và thêm `guide/` có thể gây trùng/route tree lỗi nếu để cả hai. Mitigation: chỉ giữ dạng directory; chạy dev để `routeTree.gen.ts` regenerate, không sửa tay.
- **Bottom nav lệch mockup**: code thật dùng 4 tab (Trang chủ/Hướng dẫn/AI/Cài đặt), mockup vẽ 5 tab. Mitigation: theo `BottomNav` + `NAV_ITEMS` hiện có của app (value=1), không bịa tab mới.
- **Param không hợp lệ khi vào URL trực tiếp**: Mitigation: guard trong loader/component (redirect/notFound) như spec edge cases.
- **Placeholder ảnh**: tránh layout vỡ khi không có ảnh. Mitigation: fallback nền/icon từ theme.

## Test approach

- Manual: chạy `pnpm nx dev web`, đi hết luồng lưới → danh sách → chi tiết, kiểm tra back và thẻ "Sắp có" disable.
- `fe-test-design` sẽ sinh `04-test-cases.md` từ acceptance criteria; `fe-browser-test` tùy chọn.
- Lint + typecheck bắt buộc trước khi review.

## Out of scope

- 11 danh mục còn lại (chỉ hiển thị disabled "Sắp có").
- Nút share/export ở màn chi tiết.
- Asset ảnh thật, nội dung đủ 40 tuần.
- Backend/Supabase, React Query, tìm kiếm/lọc.
