# Dashboard & Weight Tracking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng trang dashboard mới theo thiết kế `.pen` và trang theo dõi cân nặng bà bầu với biểu đồ tăng cân + CRUD lịch sử cân.

**Architecture:** Dashboard (`/_auth/index.tsx`) được redesign hoàn toàn với hero section, widget cards (cân nặng + đếm ngược) và bottom nav 4 tab. Trang cân nặng (`/_auth/weight.tsx`) dùng Recharts để vẽ biểu đồ tăng cân theo IOM guidelines, kèm danh sách lịch sử CRUD. Dữ liệu cân nặng lưu trong bảng Supabase `weight_entries`, truy cập qua React Query.

**Tech Stack:** React 19, MUI v6, TanStack Router, React Query, Zustand (auth), Supabase, Recharts, dayjs, react-hook-form + zod

**Design files:**

- `docs/features/dashboard/dashboard-design.pen`
- `docs/features/dashboard/weight-tracking-design.pen`

---

## File Map

| File                                                       | Action | Trách nhiệm                                            |
| ---------------------------------------------------------- | ------ | ------------------------------------------------------ |
| `supabase/migrations/<ts>_create_weight_entries_table.sql` | Create | Bảng weight_entries + RLS                              |
| `libs/api/src/lib/weight-entries.ts`                       | Create | weightEntriesApi: list/create/update/remove            |
| `libs/api/src/index.ts`                                    | Modify | Export WeightEntry, WeightEntryInput, weightEntriesApi |
| `libs/utils/src/lib/weight-gain.ts`                        | Create | Tính IOM ideal range + chart data points               |
| `libs/utils/src/lib/weight-gain.spec.ts`                   | Create | Tests cho IOM calculation                              |
| `libs/utils/src/index.ts`                                  | Modify | Export weight-gain utilities                           |
| `apps/web/src/routes/_auth/index.tsx`                      | Modify | Dashboard redesign                                     |
| `apps/web/src/routes/_auth/guide.tsx`                      | Create | Stub: Hướng dẫn tab                                    |
| `apps/web/src/routes/_auth/ai.tsx`                         | Create | Stub: AI tab                                           |
| `apps/web/src/routes/_auth/settings.tsx`                   | Create | Stub: Cài đặt tab                                      |
| `apps/web/src/routes/_auth/weight.tsx`                     | Create | Màn hình cân nặng + chart + history                    |

---

## Task 1: Database migration — weight_entries

**Files:**

- Create: `supabase/migrations/<timestamp>_create_weight_entries_table.sql`

- [ ] **Tạo migration file**

```bash
supabase migration new create_weight_entries_table
```

Lệnh tạo file tại `supabase/migrations/<timestamp>_create_weight_entries_table.sql`.

- [ ] **Điền nội dung migration**

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

- [ ] **Reset DB để áp dụng migration**

```bash
supabase db reset
```

Expected output: `Finished supabase db reset.`

- [ ] **Commit**

```bash
git add supabase/migrations/
git commit -m "feat(db): add weight_entries table with RLS"
```

---

## Task 2: Install recharts

**Files:** không thay đổi source code

- [ ] **Cài recharts với phiên bản cố định**

```bash
pnpm add --save-exact recharts --filter web
```

- [ ] **Kiểm tra package.json của apps/web đã có recharts**

```bash
grep recharts apps/web/package.json
```

Expected: `"recharts": "2.x.x"` (không có `^` hay `~`).

- [ ] **Commit**

```bash
git add apps/web/package.json pnpm-lock.yaml
git commit -m "feat(web): add recharts dependency"
```

---

## Task 3: weightEntriesApi trong @meli/api

**Files:**

- Create: `libs/api/src/lib/weight-entries.ts`
- Modify: `libs/api/src/index.ts`

- [ ] **Tạo `libs/api/src/lib/weight-entries.ts`**

```ts
import type { PostgrestResponse } from '@supabase/supabase-js';
import { supabase } from './supabase.js';

export type WeightEntry = {
  id: string;
  user_id: string;
  measured_at: string;
  weight_kg: number;
  created_at: string;
  updated_at: string;
};

export type WeightEntryInput = {
  measured_at: string;
  weight_kg: number;
};

type ListResponse = Promise<PostgrestResponse<WeightEntry[]>>;
type SingleResponse = Promise<PostgrestResponse<WeightEntry>>;

export const weightEntriesApi = {
  list: (userId: string): ListResponse =>
    supabase
      .from('weight_entries')
      .select('*')
      .eq('user_id', userId)
      .order('measured_at', { ascending: true })
      .returns<WeightEntry[]>() as ListResponse,

  create: (userId: string, data: WeightEntryInput): SingleResponse =>
    supabase
      .from('weight_entries')
      .insert({ user_id: userId, ...data })
      .select('*')
      .single<WeightEntry>() as SingleResponse,

  update: (
    id: string,
    userId: string,
    data: WeightEntryInput,
  ): SingleResponse =>
    supabase
      .from('weight_entries')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', userId)
      .select('*')
      .single<WeightEntry>() as SingleResponse,

  remove: (id: string, userId: string) =>
    supabase.from('weight_entries').delete().eq('id', id).eq('user_id', userId),
};
```

- [ ] **Cập nhật `libs/api/src/index.ts` — thêm exports**

Mở `libs/api/src/index.ts`, thêm dòng:

```ts
export { weightEntriesApi } from './lib/weight-entries.js';
export type { WeightEntry, WeightEntryInput } from './lib/weight-entries.js';
```

- [ ] **Typecheck để xác nhận không lỗi**

```bash
pnpm nx typecheck api
```

Expected: no errors.

- [ ] **Commit**

```bash
git add libs/api/src/lib/weight-entries.ts libs/api/src/index.ts
git commit -m "feat(api): add weightEntriesApi with CRUD operations"
```

---

## Task 4: IOM weight gain calculation utility + tests

**Files:**

- Create: `libs/utils/src/lib/weight-gain.ts`
- Create: `libs/utils/src/lib/weight-gain.spec.ts`
- Modify: `libs/utils/src/index.ts`

- [ ] **Viết test trước (`libs/utils/src/lib/weight-gain.spec.ts`)**

```ts
import { describe, it, expect } from 'vitest';
import {
  calcBmi,
  getIomRange,
  buildIdealChartData,
  buildActualChartData,
} from './weight-gain';

describe('calcBmi', () => {
  it('tính BMI đúng', () => {
    expect(calcBmi(52, 160)).toBeCloseTo(20.31, 1);
  });
});

describe('getIomRange', () => {
  it('gầy BMI < 18.5 → [12.5, 18]', () => {
    expect(getIomRange(17)).toEqual([12.5, 18]);
  });
  it('bình thường 18.5–24.9 → [11.5, 16]', () => {
    expect(getIomRange(22)).toEqual([11.5, 16]);
  });
  it('thừa cân 25–29.9 → [7, 11.5]', () => {
    expect(getIomRange(27)).toEqual([7, 11.5]);
  });
  it('béo phì >= 30 → [5, 9]', () => {
    expect(getIomRange(32)).toEqual([5, 9]);
  });
});

describe('buildIdealChartData', () => {
  it('trả về 41 điểm (tuần 0–40)', () => {
    const data = buildIdealChartData(22);
    expect(data).toHaveLength(41);
  });
  it('tuần 0 luôn có gain = 0', () => {
    const data = buildIdealChartData(22);
    expect(data[0].idealMin).toBe(0);
    expect(data[0].idealMax).toBe(0);
  });
  it('tuần 40 bằng IOM total range', () => {
    const data = buildIdealChartData(22); // BMI 22 → [11.5, 16]
    expect(data[40].idealMin).toBeCloseTo(11.5, 1);
    expect(data[40].idealMax).toBeCloseTo(16, 1);
  });
});

describe('buildActualChartData', () => {
  it('tính gain từ pre-pregnancy weight', () => {
    const entries = [{ measured_at: '2026-01-01', weight_kg: 52, week: 10 }];
    const data = buildActualChartData(entries, 42);
    expect(data[0].actualGain).toBeCloseTo(10, 1);
  });
});
```

- [ ] **Chạy test để xác nhận FAIL**

```bash
pnpm nx test utils -- --testNamePattern="weight-gain" --run
```

Expected: FAIL — `Cannot find module './weight-gain'`

- [ ] **Tạo `libs/utils/src/lib/weight-gain.ts`**

```ts
export type IdealPoint = {
  week: number;
  idealMin: number;
  idealMax: number;
};

export type ActualPoint = {
  week: number;
  actualGain: number;
};

export function calcBmi(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function getIomRange(bmi: number): [number, number] {
  if (bmi < 18.5) return [12.5, 18];
  if (bmi < 25) return [11.5, 16];
  if (bmi < 30) return [7, 11.5];
  return [5, 9];
}

export function buildIdealChartData(bmi: number): IdealPoint[] {
  const [min, max] = getIomRange(bmi);
  return Array.from({ length: 41 }, (_, week) => ({
    week,
    idealMin: parseFloat(((min / 40) * week).toFixed(2)),
    idealMax: parseFloat(((max / 40) * week).toFixed(2)),
  }));
}

export function buildActualChartData(
  entries: { measured_at: string; weight_kg: number; week: number }[],
  prePregnancyWeightKg: number,
): ActualPoint[] {
  return entries.map((e) => ({
    week: e.week,
    actualGain: parseFloat((e.weight_kg - prePregnancyWeightKg).toFixed(1)),
  }));
}
```

- [ ] **Chạy test để xác nhận PASS**

```bash
pnpm nx test utils -- --testNamePattern="weight-gain" --run
```

Expected: tất cả PASS.

- [ ] **Cập nhật `libs/utils/src/index.ts` — thêm export**

```ts
export {
  calcBmi,
  getIomRange,
  buildIdealChartData,
  buildActualChartData,
} from './lib/weight-gain.js';
export type { IdealPoint, ActualPoint } from './lib/weight-gain.js';
```

- [ ] **Commit**

```bash
git add libs/utils/src/lib/weight-gain.ts libs/utils/src/lib/weight-gain.spec.ts libs/utils/src/index.ts
git commit -m "feat(utils): add IOM weight gain calculation with tests"
```

---

## Task 5: Stub routes — Hướng dẫn, AI, Cài đặt

**Files:**

- Create: `apps/web/src/routes/_auth/guide.tsx`
- Create: `apps/web/src/routes/_auth/ai.tsx`
- Create: `apps/web/src/routes/_auth/settings.tsx`

Các route này cần tồn tại để BottomNav navigate được. Nội dung placeholder đơn giản.

- [ ] **Tạo `apps/web/src/routes/_auth/guide.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { Box, Typography } from '@mui/material';

export const Route = createFileRoute('/_auth/guide')({
  component: GuidePage,
});

function GuidePage() {
  return (
    <Box sx={{ p: 4, pb: 10 }}>
      <Typography variant="h4">Hướng dẫn</Typography>
    </Box>
  );
}
```

- [ ] **Tạo `apps/web/src/routes/_auth/ai.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { Box, Typography } from '@mui/material';

export const Route = createFileRoute('/_auth/ai')({
  component: AiPage,
});

function AiPage() {
  return (
    <Box sx={{ p: 4, pb: 10 }}>
      <Typography variant="h4">AI</Typography>
    </Box>
  );
}
```

- [ ] **Tạo `apps/web/src/routes/_auth/settings.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { Box, Typography } from '@mui/material';

export const Route = createFileRoute('/_auth/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <Box sx={{ p: 4, pb: 10 }}>
      <Typography variant="h4">Cài đặt</Typography>
    </Box>
  );
}
```

- [ ] **Build để kiểm tra route tree tự generate không lỗi**

```bash
pnpm nx typecheck web
```

Expected: no errors.

- [ ] **Commit**

```bash
git add apps/web/src/routes/_auth/guide.tsx apps/web/src/routes/_auth/ai.tsx apps/web/src/routes/_auth/settings.tsx
git commit -m "feat(web): add stub routes for guide, ai, settings tabs"
```

---

## Task 6: Dashboard redesign

**Files:**

- Modify: `apps/web/src/routes/_auth/index.tsx`

Redesign toàn bộ trang chủ theo `dashboard-design.pen`. Sử dụng màu từ MUI theme, không hard-code hex.

**Design reference:** `docs/features/dashboard/dashboard-design.pen`

- WeekHeader: thanh trên cùng, "Tuần thứ X, ngày Y"
- HeroSection: nền `primary.main`, greeting + avatar placeholder + badges
- WidgetRow: 2 card ngang — CÂN NẶNG (navigate weight) + ĐẾM NGƯỢC
- BottomNav: 4 tabs — Trang chủ, Hướng dẫn, AI, Cài đặt

**Cách tính tuần thai:**

```ts
// dueDate là string ISO date từ profile.due_date
const pregnancyStart = dayjs(dueDate).subtract(40, 'week');
const daysPregnant = dayjs().diff(pregnancyStart, 'day');
const week = Math.floor(daysPregnant / 7);
const dayOfWeek = daysPregnant % 7;
```

**Cách tính đếm ngược:**

```ts
const daysLeft = Math.max(0, dayjs(dueDate).diff(dayjs(), 'day'));
```

**Cách tính phần trăm cho donut (ĐẾM NGƯỢC):**

```ts
const totalDays = 280; // 40 tuần
const elapsed = totalDays - daysLeft;
const pct = elapsed / totalDays; // 0→1
```

- [ ] **Viết `apps/web/src/routes/_auth/index.tsx`**

```tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Box,
  Typography,
  Stack,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  HomeRounded,
  MenuBookRounded,
  PsychologyRounded,
  SettingsRounded,
  ChildCareRounded,
  FamilyRestroomRounded,
  PhotoCameraRounded,
  ChevronRightRounded,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useAuthStore } from '../../stores/auth.store';
import { weightEntriesApi } from '@meli/api';
import { BottomNav, shape } from '@meli/ui';

export const Route = createFileRoute('/_auth/')({
  component: HomePage,
});

const NAV_ITEMS = [
  { label: 'Trang chủ', icon: <HomeRounded /> },
  { label: 'Hướng dẫn', icon: <MenuBookRounded /> },
  { label: 'AI', icon: <PsychologyRounded /> },
  { label: 'Cài đặt', icon: <SettingsRounded /> },
];

const NAV_ROUTES = ['/', '/guide', '/ai', '/settings'];

function usePregnancyInfo(dueDate: string | null) {
  if (!dueDate) return { week: 0, dayOfWeek: 0, daysLeft: 0, pct: 0 };
  const pregnancyStart = dayjs(dueDate).subtract(40, 'week');
  const daysPregnant = Math.max(0, dayjs().diff(pregnancyStart, 'day'));
  const week = Math.floor(daysPregnant / 7);
  const dayOfWeek = daysPregnant % 7;
  const daysLeft = Math.max(0, dayjs(dueDate).diff(dayjs(), 'day'));
  const pct = Math.min(1, daysPregnant / 280);
  return { week, dayOfWeek, daysLeft, pct };
}

function useGreeting() {
  const hour = dayjs().hour();
  if (hour < 12) return 'Chúc mẹ buổi sáng tốt lành';
  if (hour < 18) return 'Chúc mẹ buổi chiều vui vẻ';
  return 'Chúc mẹ buổi tối bình an';
}

function HomePage() {
  const navigate = useNavigate();
  const { profile, user } = useAuthStore();
  const greeting = useGreeting();
  const { week, dayOfWeek, daysLeft, pct } = usePregnancyInfo(
    profile?.due_date ?? null,
  );

  const { data: weightEntries } = useQuery({
    queryKey: ['weightEntries', user?.id],
    queryFn: () => weightEntriesApi.list(user!.id),
    enabled: !!user,
  });

  const latestWeight =
    weightEntries?.data && weightEntries.data.length > 0
      ? weightEntries.data[weightEntries.data.length - 1].weight_kg
      : null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      {/* WeekHeader */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'coral.100',
          py: 1.5,
          textAlign: 'center',
        }}
      >
        <Typography variant="subtitle2">
          Tuần thứ {week}, ngày {dayOfWeek}
        </Typography>
      </Box>

      {/* Scrollable content */}
      <Box sx={{ flex: 1, overflowY: 'auto', pb: '80px' }}>
        {/* HeroSection */}
        <Box sx={{ bgcolor: 'primary.main', px: 2, py: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* Baby avatar */}
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ChildCareRounded
                sx={{ color: 'primary.contrastText', fontSize: 32 }}
              />
            </Box>

            {/* Greeting */}
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <Typography
                variant="h4"
                sx={{ color: 'primary.contrastText', fontWeight: 700 }}
              >
                Chào mẹ
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.8)' }}
              >
                {greeting}
              </Typography>
            </Stack>

            {/* Right actions */}
            <Stack spacing={1} alignItems="center">
              <IconButton
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'primary.contrastText',
                }}
              >
                <FamilyRestroomRounded />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'primary.contrastText',
                }}
              >
                <PhotoCameraRounded />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        {/* Widget Grid */}
        <Stack direction="row" spacing={1.5} sx={{ p: 2 }}>
          {/* CÂN NẶNG card */}
          <WidgetCard
            label="CÂN NẶNG"
            onClick={() => navigate({ to: '/weight' })}
            sx={{ flex: 1 }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {latestWeight != null ? `${latestWeight} kg` : '—'}
            </Typography>
          </WidgetCard>

          {/* ĐẾM NGƯỢC card */}
          <WidgetCard label="ĐẾM NGƯỢC" sx={{ flex: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Stack spacing={0}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {daysLeft}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ngày
                </Typography>
              </Stack>
              {/* Donut ring */}
              <Box
                sx={{
                  position: 'relative',
                  width: 48,
                  height: 48,
                  flexShrink: 0,
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={48}
                  thickness={5}
                  sx={{
                    color: 'coral.100',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
                <CircularProgress
                  variant="determinate"
                  value={pct * 100}
                  size={48}
                  thickness={5}
                  sx={{ color: 'primary.main' }}
                />
              </Box>
            </Stack>
          </WidgetCard>
        </Stack>
      </Box>

      {/* Bottom Nav */}
      <BottomNav
        items={NAV_ITEMS}
        value={0}
        onChange={(_, idx) => navigate({ to: NAV_ROUTES[idx] })}
      />
    </Box>
  );
}

function WidgetCard({
  label,
  children,
  onClick,
  sx,
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  sx?: object;
}) {
  const inner = (
    <CardContent
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, height: '100%' }}
    >
      <Stack direction="row" alignItems="center">
        <Typography
          variant="caption"
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            letterSpacing: 0.5,
            flex: 1,
          }}
        >
          {label}
        </Typography>
        {onClick && (
          <ChevronRightRounded sx={{ color: 'primary.main', fontSize: 16 }} />
        )}
      </Stack>
      <Divider sx={{ borderColor: 'coral.100' }} />
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        {children}
      </Box>
    </CardContent>
  );

  return (
    <Card sx={{ minHeight: 120, ...sx }}>
      {onClick ? (
        <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
          {inner}
        </CardActionArea>
      ) : (
        inner
      )}
    </Card>
  );
}
```

- [ ] **Chạy dev server và kiểm tra dashboard bằng mắt**

```bash
pnpm nx dev web
```

Mở http://localhost:4200, đăng nhập, kiểm tra:

- WeekHeader hiển thị "Tuần thứ X, ngày Y"
- HeroSection nền hồng với greeting
- 2 widget card bên dưới
- BottomNav 4 tab ở cuối màn hình

- [ ] **Commit**

```bash
git add apps/web/src/routes/_auth/index.tsx
git commit -m "feat(dashboard): redesign home page with hero, widgets, and bottom nav"
```

---

## Task 7: Màn hình cân nặng + WeightEntryDialog

**Files:**

- Create: `apps/web/src/routes/_auth/weight.tsx` (bắt đầu với dialog trước, screen sau)

`WeightEntryDialog` là component dùng chung cho cả add lẫn edit. Nhận prop `entry?: WeightEntry` — nếu có là edit mode.

- [ ] **Cài `@hookform/resolvers` nếu chưa có (kiểm tra trước)**

```bash
grep '@hookform/resolvers' apps/web/package.json
```

Nếu không có:

```bash
pnpm add --save-exact @hookform/resolvers --filter web
```

- [ ] **Tạo `apps/web/src/routes/_auth/weight.tsx` với WeightEntryDialog**

```tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Stack,
  Paper,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Alert,
  List,
  ListItem,
} from '@mui/material';
import {
  ArrowBackRounded,
  EditRounded,
  DeleteRounded,
  AddRounded,
  ScaleRounded,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs, { type Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { useAuthStore } from '../../stores/auth.store';
import { weightEntriesApi, type WeightEntry } from '@meli/api';
import {
  calcBmi,
  buildIdealChartData,
  buildActualChartData,
} from '@meli/utils';
import { FormTextField, FormDatePicker, shape } from '@meli/ui';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';

export const Route = createFileRoute('/_auth/weight')({
  component: WeightPage,
});

// ──── Zod schema ────────────────────────────────────────────
const schema = z.object({
  measured_at: z.custom<Dayjs>((v) => dayjs.isDayjs(v), 'Ngày không hợp lệ'),
  weight_kg: z
    .number({ invalid_type_error: 'Vui lòng nhập số' })
    .min(20, 'Tối thiểu 20 kg')
    .max(200, 'Tối đa 200 kg'),
});
type FormValues = z.infer<typeof schema>;

// ──── WeightEntryDialog ──────────────────────────────────────
function WeightEntryDialog({
  open,
  entry,
  defaultWeight,
  userId,
  onClose,
}: {
  open: boolean;
  entry?: WeightEntry;
  defaultWeight?: number;
  userId: string;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      measured_at: entry ? dayjs(entry.measured_at) : dayjs(),
      weight_kg: entry?.weight_kg ?? defaultWeight ?? undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: (values: FormValues) => {
      const data = {
        measured_at: values.measured_at.format('YYYY-MM-DD'),
        weight_kg: values.weight_kg,
      };
      return entry
        ? weightEntriesApi.update(entry.id, userId, data)
        : weightEntriesApi.create(userId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weightEntries', userId] });
      reset();
      onClose();
    },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { borderRadius: shape.lg, width: '100%', mx: 2 } }}
      >
        <DialogTitle
          sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 700 }}
        >
          {entry ? 'Chỉnh sửa cân nặng' : 'Bổ sung cân nặng hiện tại'}
        </DialogTitle>
        <DialogContent>
          <Stack alignItems="center" sx={{ mb: 2 }}>
            <ScaleRounded sx={{ fontSize: 64, color: 'primary.light' }} />
          </Stack>
          <Stack spacing={2} component="form" onSubmit={onSubmit}>
            <FormDatePicker
              name="measured_at"
              control={control}
              label="Chọn ngày"
              slotProps={{ textField: { fullWidth: true } }}
            />
            <FormTextField
              name="weight_kg"
              control={control}
              label="Cân nặng (kg)"
              type="number"
              fullWidth
              inputProps={{ step: 0.1 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} color="inherit">
            Huỷ
          </Button>
          <Button
            onClick={onSubmit}
            variant="text"
            disabled={mutation.isPending}
            sx={{ fontWeight: 700 }}
          >
            TIẾP TỤC
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

// ──── DeleteConfirmDialog ────────────────────────────────────
function DeleteConfirmDialog({
  entry,
  userId,
  onClose,
}: {
  entry: WeightEntry | null;
  userId: string;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => weightEntriesApi.remove(entry!.id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weightEntries', userId] });
      onClose();
    },
  });

  return (
    <Dialog
      open={!!entry}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: shape.lg } }}
    >
      <DialogTitle>Xoá bản ghi</DialogTitle>
      <DialogContentText sx={{ px: 3 }}>
        Xoá bản ghi ngày{' '}
        {entry ? dayjs(entry.measured_at).format('DD/MM/YYYY') : ''}?
      </DialogContentText>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Huỷ
        </Button>
        <Button
          onClick={() => mutation.mutate()}
          color="error"
          disabled={mutation.isPending}
        >
          Xoá
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ──── WeightChart ────────────────────────────────────────────
function WeightChart({
  entries,
  preWeight,
  preHeight,
  dueDate,
}: {
  entries: WeightEntry[];
  preWeight: number;
  preHeight: number;
  dueDate: string;
}) {
  const theme = useTheme();
  const bmi = calcBmi(preWeight, preHeight);
  const idealData = buildIdealChartData(bmi);

  const pregnancyStart = dayjs(dueDate).subtract(40, 'week');
  const entriesWithWeek = entries.map((e) => ({
    ...e,
    week: Math.max(
      0,
      Math.min(40, dayjs(e.measured_at).diff(pregnancyStart, 'week')),
    ),
  }));
  const actualData = buildActualChartData(entriesWithWeek, preWeight);
  const currentWeek = Math.max(
    0,
    Math.min(40, dayjs().diff(pregnancyStart, 'week')),
  );

  const chartData = idealData.map((point) => {
    const actual = actualData.find((a) => a.week === point.week);
    return { ...point, actualGain: actual?.actualGain };
  });

  return (
    <ResponsiveContainer width="100%" height={240}>
      <ComposedChart
        data={chartData}
        margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis
          dataKey="week"
          tick={{ fontSize: 9, fill: theme.palette.text.secondary }}
          label={{
            value: 'Tuần',
            position: 'insideBottomRight',
            offset: -4,
            fontSize: 9,
            fill: theme.palette.text.disabled,
          }}
        />
        <YAxis
          tick={{ fontSize: 9, fill: theme.palette.text.secondary }}
          label={{
            value: 'kg',
            angle: -90,
            position: 'insideTopLeft',
            offset: 16,
            fontSize: 9,
            fill: theme.palette.text.disabled,
          }}
        />
        <Tooltip
          formatter={(value: number, name: string) =>
            name === 'actualGain' ? [`${value} kg`, 'Cân nặng'] : null
          }
          labelFormatter={(label) => `Tuần ${label}`}
        />
        {/* Dải lý tưởng */}
        <Area
          dataKey="idealMax"
          fill={theme.palette.secondary.light}
          fillOpacity={0.35}
          stroke="none"
          legendType="none"
          activeDot={false}
        />
        <Area
          dataKey="idealMin"
          fill={theme.palette.background.default}
          fillOpacity={1}
          stroke="none"
          legendType="none"
          activeDot={false}
        />
        {/* Đường cân thực tế */}
        <Line
          type="monotone"
          dataKey="actualGain"
          stroke={theme.palette.secondary.dark}
          strokeWidth={2}
          dot={{ fill: theme.palette.secondary.dark, r: 4 }}
          connectNulls={false}
        />
        {/* Tuần hiện tại */}
        <ReferenceLine
          x={currentWeek}
          stroke={theme.palette.primary.light}
          label={{
            value: `tuần ${currentWeek}`,
            fontSize: 8,
            fill: theme.palette.primary.main,
            position: 'top',
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

// ──── WeightPage ─────────────────────────────────────────────
function WeightPage() {
  const navigate = useNavigate();
  const { profile, user } = useAuthStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editEntry, setEditEntry] = useState<WeightEntry | undefined>();
  const [deleteEntry, setDeleteEntry] = useState<WeightEntry | null>(null);

  const { data: weightData } = useQuery({
    queryKey: ['weightEntries', user?.id],
    queryFn: () => weightEntriesApi.list(user!.id),
    enabled: !!user,
  });

  const entries = weightData?.data ?? [];
  const latestEntry = entries.length > 0 ? entries[entries.length - 1] : null;
  const hasProfileData = !!profile?.weight_kg && !!profile?.height_cm;

  const currentGain =
    hasProfileData && latestEntry
      ? (latestEntry.weight_kg - profile!.weight_kg!).toFixed(1)
      : null;

  function openAdd() {
    setEditEntry(undefined);
    setDialogOpen(true);
  }

  function openEdit(entry: WeightEntry) {
    setEditEntry(entry);
    setDialogOpen(true);
  }

  const defaultWeight =
    latestEntry?.weight_kg ?? profile?.weight_kg ?? undefined;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        bgcolor: 'background.default',
      }}
    >
      {/* AppBar */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate({ to: '/' })}>
            <ArrowBackRounded />
          </IconButton>
          <Typography
            variant="subtitle1"
            sx={{ flex: 1, textAlign: 'center', fontWeight: 600 }}
          >
            CÂN NẶNG CỦA MẸ
          </Typography>
          <Box sx={{ width: 40 }} />
        </Toolbar>
      </AppBar>

      {/* Scrollable content */}
      <Box sx={{ flex: 1, overflowY: 'auto', pb: '80px' }}>
        <Stack spacing={2} sx={{ p: '16px 16px 80px' }}>
          {/* Header */}
          <Stack spacing={1}>
            <Typography variant="h3" sx={{ fontSize: 18, fontWeight: 600 }}>
              Tăng cân trong thai kỳ
            </Typography>
            {hasProfileData ? (
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', lineHeight: 1.5 }}
              >
                Dựa trên {profile!.weight_kg} kg và {profile!.height_cm} cm
                trước khi mang thai, hiện tại mẹ{' '}
                {currentGain !== null
                  ? `đã tăng ${currentGain} kg`
                  : 'chưa có lần cân nào'}
                .
              </Typography>
            ) : (
              <Alert severity="warning" sx={{ borderRadius: shape.md }}>
                Vui lòng bổ sung cân nặng và chiều cao trước thai kỳ trong hồ sơ
                để xem dải tăng cân lý tưởng.
              </Alert>
            )}
          </Stack>

          {/* Chart card */}
          {hasProfileData && profile?.due_date && (
            <Paper
              elevation={0}
              sx={{
                borderRadius: shape.xl,
                p: '12px 16px',
                border: '1px solid',
                borderColor: 'coral.100',
              }}
            >
              <WeightChart
                entries={entries}
                preWeight={profile.weight_kg!}
                preHeight={profile.height_cm!}
                dueDate={profile.due_date}
              />
            </Paper>
          )}

          {/* History */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <Box sx={{ flex: 1, height: 1, bgcolor: 'coral.100' }} />
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontWeight: 600 }}
            >
              Lịch sử cân nặng
            </Typography>
            <Box sx={{ flex: 1, height: 1, bgcolor: 'coral.100' }} />
          </Stack>

          {entries.length === 0 ? (
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}
            >
              Chưa có lần cân nào. Nhấn + để thêm.
            </Typography>
          ) : (
            <Paper
              elevation={0}
              sx={{
                borderRadius: shape.md,
                border: '1px solid',
                borderColor: 'coral.100',
                overflow: 'hidden',
              }}
            >
              <List disablePadding>
                {[...entries].reverse().map((entry, idx) => (
                  <ListItem
                    key={entry.id}
                    disablePadding
                    sx={{
                      px: 2,
                      height: 52,
                      gap: 1,
                      borderBottom:
                        idx < entries.length - 1 ? '1px solid' : 'none',
                      borderColor: 'coral.100',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', minWidth: 90 }}
                    >
                      {dayjs(entry.measured_at).format('DD/MM/YYYY')}
                    </Typography>
                    <Box sx={{ flex: 1 }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        minWidth: 60,
                        textAlign: 'right',
                      }}
                    >
                      {entry.weight_kg} kg
                    </Typography>
                    <Stack direction="row">
                      <IconButton size="small" onClick={() => openEdit(entry)}>
                        <EditRounded
                          sx={{ fontSize: 18, color: 'text.secondary' }}
                        />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => setDeleteEntry(entry)}
                      >
                        <DeleteRounded
                          sx={{ fontSize: 18, color: 'error.main' }}
                        />
                      </IconButton>
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Stack>
      </Box>

      {/* FAB */}
      <Fab
        color="primary"
        onClick={openAdd}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          boxShadow: '0 4px 12px rgba(240,129,128,0.35)',
        }}
      >
        <AddRounded />
      </Fab>

      {/* Dialogs */}
      {user && (
        <>
          <WeightEntryDialog
            open={dialogOpen}
            entry={editEntry}
            defaultWeight={defaultWeight}
            userId={user.id}
            onClose={() => setDialogOpen(false)}
          />
          <DeleteConfirmDialog
            entry={deleteEntry}
            userId={user.id}
            onClose={() => setDeleteEntry(null)}
          />
        </>
      )}
    </Box>
  );
}
```

- [ ] **Typecheck**

```bash
pnpm nx typecheck web
```

Expected: no errors.

- [ ] **Chạy dev và kiểm tra thủ công toàn bộ flow**

```bash
pnpm nx dev web
```

Kiểm tra:

1. Dashboard → click card "CÂN NẶNG" → vào màn hình weight
2. Click "+" → dialog mở, nhập ngày + cân nặng → bấm TIẾP TỤC → entry xuất hiện trong list
3. Click edit icon → dialog mở với dữ liệu cũ → sửa → lưu
4. Click delete icon → confirm dialog → xác nhận → entry bị xoá
5. Biểu đồ hiển thị đường cân thực tế + dải lý tưởng

- [ ] **Commit**

```bash
git add apps/web/src/routes/_auth/weight.tsx
git commit -m "feat(weight): add weight tracking screen with chart, history list, and CRUD dialogs"
```

---

## Self-Review

**Spec coverage:**

- [x] DB: `weight_entries` table + RLS — Task 2
- [x] API: list/create/update/remove — Task 4
- [x] IOM calculation — Task 5
- [x] Dashboard: WeekHeader, Hero, WidgetRow, BottomNav — Task 7
- [x] Weight screen: AppBar, description, chart, history list — Task 8
- [x] Alert khi thiếu profile data — Task 8 (trong WeightPage)
- [x] WeightEntryDialog (add/edit) — Task 8
- [x] Delete confirm dialog — Task 8
- [x] Dashboard card click → navigate to weight — Task 7
- [x] Dashboard card hiển thị cân nặng mới nhất — Task 7
- [x] Stub routes cho tab nav — Task 6

**Placeholder scan:** Không có TBD, TODO, hay placeholder.

**Type consistency:**

- `WeightEntry`, `WeightEntryInput` định nghĩa trong Task 4, dùng trong Task 8 ✓
- `IdealPoint`, `ActualPoint` định nghĩa trong Task 5, dùng trong Task 8 ✓
- `weightEntriesApi.list/create/update/remove` nhất quán giữa Tasks 4, 7, 8 ✓
- `buildIdealChartData`, `buildActualChartData`, `calcBmi` định nghĩa Task 5, dùng Task 8 ✓
