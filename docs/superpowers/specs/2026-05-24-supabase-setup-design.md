# Supabase Setup Design

**Date:** 2026-05-24
**Scope:** Tích hợp Supabase vào Nx monorepo (`apps/web` + `@meli/api`)
**Features:** Authentication, Database (Postgres), Storage

## Architecture

Supabase client là singleton được khởi tạo một lần trong `@meli/api`, exported ra toàn bộ app qua path alias `@meli/api`. App không trực tiếp import từ `@supabase/supabase-js` mà luôn đi qua layer này.

```
apps/web  →  @meli/api (supabase client)  →  Supabase Cloud
```

## Package Installation

Cài vào `apps/web` (không phải root, vì chỉ app cần dependency runtime này):

```bash
pnpm --filter web add --save-exact @supabase/supabase-js
```

## Environment Variables

Hai files tại `apps/web/`:

| File           | Mục đích                       | Commit? |
| -------------- | ------------------------------ | ------- |
| `.env.local`   | Giá trị thật (URL + anon key)  | Không   |
| `.env.example` | Template không có giá trị thật | Có      |

Variables cần:

- `VITE_SUPABASE_URL` — project URL từ Supabase dashboard
- `VITE_SUPABASE_PUBLISHABLE_KEY` — anon/public key (an toàn để expose ở client)

`.env.local` được thêm vào `.gitignore` để không commit credentials.

## Supabase Client (`@meli/api`)

Tạo `libs/api/src/lib/supabase.ts`:

```ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);
```

Xóa `libs/api/src/lib/api.ts` (placeholder không còn dùng).

Cập nhật `libs/api/src/index.ts`:

```ts
export { supabase } from './lib/supabase.js';
```

Cách dùng trong app:

```ts
import { supabase } from '@meli/api';

// Auth
const { data } = await supabase.auth.getSession();

// Database
const { data } = await supabase.from('table').select('*');

// Storage
const { data } = await supabase.storage.from('bucket').list();
```

## Agent Skills

Chạy tại root project để cài Supabase agent skills cho AI coding tools:

```bash
npx skills add supabase/agent-skills
```

Không ảnh hưởng đến runtime app. Cung cấp thêm context cho AI khi làm việc với Supabase patterns.

## Verification

Sau khi setup, test kết nối bằng cách gọi từ một route hoặc store:

```ts
const { data, error } = await supabase.auth.getSession();
console.log({ data, error });
```

Nếu không có lỗi network/credentials → setup thành công.

## What's Not In Scope

- **Type generation:** `supabase gen types` sẽ làm sau khi DB schema được định nghĩa
- **Row Level Security (RLS):** Cấu hình ở Supabase dashboard, không phải frontend
- **Auth UI:** Màn hình login/signup là feature riêng, không nằm trong setup này
