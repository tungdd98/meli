# Weight Tracking — Design Spec

**Date:** 2026-05-27  
**Feature:** Cân nặng bà bầu (Maternal weight tracking)  
**Mockups:** `docs/features/dashboard/images/IMG_8083.PNG`, `IMG_8084.PNG`, `IMG_8085.PNG`

---

## Overview

Cho phép user theo dõi cân nặng trong suốt thai kỳ. Dashboard hiển thị cân nặng gần nhất; màn hình riêng hiển thị biểu đồ tăng cân so với dải lý tưởng (IOM guidelines) và danh sách các lần đo với đầy đủ CRUD.

---

## 1. Database

### Bảng mới: `weight_entries`

```sql
create table weight_entries (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references profiles(id) on delete cascade,
  measured_at date not null,
  weight_kg   numeric(5,1) not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table weight_entries enable row level security;

create policy "Users manage own weight entries"
  on weight_entries for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

- Migration file: `supabase/migrations/<timestamp>_create_weight_entries_table.sql`
- Không có unique constraint trên `(user_id, measured_at)` — user được phép có nhiều bản ghi cùng ngày

---

## 2. API Layer (`@meli/api`)

File mới: `libs/api/src/lib/weight-entries.ts`

### Types

```ts
export type WeightEntry = {
  id: string;
  user_id: string;
  measured_at: string; // ISO date string "YYYY-MM-DD"
  weight_kg: number;
  created_at: string;
  updated_at: string;
};

export type WeightEntryInput = {
  measured_at: string;
  weight_kg: number;
};
```

### API object: `weightEntriesApi`

| Method   | Signature                                              | Mô tả                                                             |
| -------- | ------------------------------------------------------ | ----------------------------------------------------------------- |
| `list`   | `(userId: string)`                                     | Lấy tất cả entries của user, order by `measured_at` asc           |
| `create` | `(userId: string, data: WeightEntryInput)`             | Tạo bản ghi mới                                                   |
| `update` | `(id: string, userId: string, data: WeightEntryInput)` | Cập nhật bản ghi, filter by `id` + `user_id` để đảm bảo ownership |
| `remove` | `(id: string, userId: string)`                         | Xoá bản ghi                                                       |

Export `weightEntriesApi` và `WeightEntry`, `WeightEntryInput` từ `libs/api/src/index.ts`.

---

## 3. Routes & Screen Layout

### Dashboard (`/_auth/index.tsx`)

Thêm widget "CÂN NẶNG" dạng card trong horizontal scroll row (theo mockup `IMG_8083`):

- **Label**: "CÂN NẶNG ▶"
- **Value**: cân nặng lần đo gần nhất (kg), ví dụ "52.5 kg"; hoặc "—" nếu chưa có entry
- **Tap**: navigate đến `/_auth/weight`
- Data: `useQuery(['weightEntries', userId])`, lấy entry có `measured_at` lớn nhất (list trả về order asc, nên lấy phần tử cuối mảng)

### Màn hình cân nặng (`/_auth/weight.tsx`)

Route mới bảo vệ bởi `_auth` layout. Layout scroll dọc:

```
┌─────────────────────────────────┐
│  ←  CÂN NẶNG CỦA MẸ            │  AppBar + back button
├─────────────────────────────────┤
│  Tăng cân trong thai kỳ         │  Typography h6
│  Dựa trên [weight] kg và        │
│  [height] cm trước khi mang     │  mô tả + mức tăng hiện tại
│  thai, hiện tại mẹ nên tăng     │
│  khoảng X.X kg.                 │
│                                 │
│  [Alert] Vui lòng bổ sung cân   │  MUI Alert warning
│  nặng và chiều cao trước thai   │  (ẩn nếu đủ dữ liệu)
│  kỳ trong hồ sơ để xem dải      │
│  tăng cân lý tưởng.             │
│                                 │
│  ┌─────────────────────────┐    │
│  │   WeightChart           │    │  Recharts, height 280px
│  └─────────────────────────┘    │
│                                 │
│  ── Lịch sử cân nặng ──         │  Divider + label
│  23/05/2026  52.5 kg  ✏️ 🗑️     │  ListItem rows
│  10/05/2026  50.0 kg  ✏️ 🗑️     │
│  ...                            │
│  [empty state nếu chưa có]      │
│                                 │
│                      [+ Thêm]   │  FAB fixed bottom-right
└─────────────────────────────────┘
```

---

## 4. Biểu đồ (Recharts)

### Trục

- **X**: tuần thai (0–40), label "Week"
- **Y**: mức tăng cân (kg) = `measured_weight - profile.weight_kg`, label "Kg"

### Dải lý tưởng (IOM Guidelines)

Tính từ BMI trước thai kỳ = `weight_kg / (height_cm/100)²`:

| BMI       | Tổng tăng cân |
| --------- | ------------- |
| < 18.5    | 12.5–18 kg    |
| 18.5–24.9 | 11.5–16 kg    |
| 25–29.9   | 7–11.5 kg     |
| ≥ 30      | 5–9 kg        |

Nội suy tuyến tính từ (week=0, gain=0) đến (week=40, gain=min/max) để tạo 41 điểm `{ week, idealMin, idealMax }`.

### Recharts components

- `ComposedChart` với `ResponsiveContainer`
- Dải lý tưởng: hai `Area` với `stackId` để tạo vùng tô màu xanh lá nhạt (`secondary.light` từ theme)
- Đường thực tế: `Line` màu `secondary.dark`, `dot={true}`, `connectNulls`
- `ReferenceLine` dọc tại tuần hiện tại (tính từ `due_date`)
- `Tooltip` hiển thị ngày đo + cân nặng thực tế
- Nếu `profile.weight_kg` hoặc `profile.height_cm` là null: ẩn dải lý tưởng, hiện Alert warning

### Tuần thai hiện tại

```ts
const currentWeek = Math.max(
  0,
  Math.min(40, 40 - dayjs(profile.due_date).diff(dayjs(), 'week')),
);
```

---

## 5. CRUD UI

### `WeightEntryDialog`

Dùng chung cho add và edit. Prop `entry?: WeightEntry` — nếu có là edit mode.

**Zod schema:**

```ts
z.object({
  measured_at: z.instanceof(Dayjs),
  weight_kg: z
    .number({ invalid_type_error: 'Vui lòng nhập số' })
    .min(20, 'Tối thiểu 20 kg')
    .max(200, 'Tối đa 200 kg'),
});
```

**Fields:**

- `measured_at`: `FormDatePicker`, default = hôm nay (add) hoặc `entry.measured_at` (edit)
- `weight_kg`: `FormTextField` type="number", default = entry gần nhất nếu đã có (add) hoặc `entry.weight_kg` (edit); fallback về `profile.weight_kg` nếu chưa có entry nào

**Submit:**

- Add: `weightEntriesApi.create` → invalidate `['weightEntries', userId]`
- Edit: `weightEntriesApi.update` → invalidate `['weightEntries', userId]`

### Xoá

MUI `Dialog` confirm inline: _"Xoá bản ghi ngày [date]?"_ — nút "Huỷ" và "Xoá" (màu `error`). Sau xác nhận: `weightEntriesApi.remove` → invalidate cache.

### Danh sách

- Sắp xếp giảm dần (mới nhất lên đầu) để hiển thị
- Icon buttons: `EditRounded`, `DeleteRounded` từ `@mui/icons-material`
- Empty state: Typography mô tả "Chưa có lần cân nào. Nhấn + để thêm."

### State management

Toàn bộ server state qua **React Query**:

- `useQuery(['weightEntries', userId])` — load danh sách
- `useMutation` cho create/update/delete

Không cần Zustand store riêng cho tính năng này.

---

## 6. Files cần tạo/sửa

| File                                                       | Thao tác                  |
| ---------------------------------------------------------- | ------------------------- |
| `supabase/migrations/<ts>_create_weight_entries_table.sql` | Tạo mới                   |
| `libs/api/src/lib/weight-entries.ts`                       | Tạo mới                   |
| `libs/api/src/index.ts`                                    | Cập nhật export           |
| `apps/web/src/routes/_auth/weight.tsx`                     | Tạo mới                   |
| `apps/web/src/routes/_auth/index.tsx`                      | Cập nhật thêm weight card |

---

## 7. Out of scope

- Thông báo / nhắc nhở khi đến ngày cân
- So sánh với thai kỳ trước
- Đơn vị pounds (chỉ hỗ trợ kg)
- Twins weight gain range (dùng chung range đơn thai)
