# Supabase Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tích hợp Supabase client vào monorepo để dùng được Authentication, Database, và Storage.

**Architecture:** Singleton `supabase` client được khởi tạo trong `@meli/api`, exported ra để toàn bộ app import qua path alias. Env vars được quản lý bằng `.env.local` (không commit) và `.env.example` (commit làm template). Agent Skills được cài thêm để AI có context về Supabase patterns.

**Tech Stack:** `@supabase/supabase-js`, Vite (`import.meta.env`), pnpm workspaces, Nx monorepo.

---

## File Map

| Action | Path                           | Mục đích                                |
| ------ | ------------------------------ | --------------------------------------- |
| Modify | `libs/api/package.json`        | Thêm `@supabase/supabase-js` dependency |
| Create | `libs/api/src/lib/supabase.ts` | Singleton Supabase client               |
| Delete | `libs/api/src/lib/api.ts`      | Xóa placeholder không dùng              |
| Modify | `libs/api/src/index.ts`        | Re-export `supabase` thay vì `api`      |
| Create | `apps/web/.env.example`        | Template env vars (committed)           |
| Modify | `.gitignore`                   | Thêm `apps/web/.env.local`              |

---

## Task 1: Cài đặt `@supabase/supabase-js`

**Files:**

- Modify: `libs/api/package.json`

- [ ] **Step 1: Cài package vào `@meli/api`**

Dependency được khai báo ở `libs/api` vì đó là nơi import thực sự. Chạy từ root monorepo:

```bash
pnpm --filter @meli/api add --save-exact @supabase/supabase-js
```

Expected output: dòng cuối có `Done in ...s`

- [ ] **Step 2: Xác nhận package đã được thêm**

```bash
cat libs/api/package.json
```

Expected: `"dependencies"` có `"@supabase/supabase-js": "2.x.x"` (exact version, không có `^`).

- [ ] **Step 3: Commit**

```bash
git add libs/api/package.json pnpm-lock.yaml
git commit -m "chore(api): add @supabase/supabase-js dependency"
```

---

## Task 2: Setup Env Files

**Files:**

- Create: `apps/web/.env.example`
- Modify: `.gitignore` (root)

- [ ] **Step 1: Tạo `.env.example`**

Tạo file `apps/web/.env.example` với nội dung sau (không có giá trị thật):

```
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

- [ ] **Step 2: Thêm `.env.local` vào root `.gitignore`**

Mở `.gitignore` ở root monorepo, thêm dòng sau vào cuối file:

```
# Supabase local env (contains secrets)
apps/web/.env.local
```

- [ ] **Step 3: Tạo `.env.local` với giá trị thật**

Tạo `apps/web/.env.local` (file này sẽ KHÔNG được commit):

```
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
```

Lấy giá trị từ: Supabase Dashboard → Project Settings → API → Project URL và anon key.

- [ ] **Step 4: Xác nhận `.env.local` bị gitignore**

```bash
git check-ignore apps/web/.env.local
```

Expected output:

```
apps/web/.env.local
```

Nếu không có output nghĩa là `.gitignore` chưa đúng — kiểm tra lại bước 2.

- [ ] **Step 5: Commit**

```bash
git add apps/web/.env.example .gitignore
git commit -m "chore(web): add Supabase env template and gitignore local env"
```

---

## Task 3: Tạo Supabase Client trong `@meli/api`

**Files:**

- Create: `libs/api/src/lib/supabase.ts`
- Delete: `libs/api/src/lib/api.ts`
- Modify: `libs/api/src/index.ts`

- [ ] **Step 1: Tạo `supabase.ts`**

Tạo file `libs/api/src/lib/supabase.ts`:

```ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);
```

- [ ] **Step 2: Cập nhật `index.ts`**

Thay toàn bộ nội dung `libs/api/src/index.ts`:

```ts
export { supabase } from './lib/supabase.js';
```

- [ ] **Step 3: Xóa placeholder `api.ts`**

```bash
rm libs/api/src/lib/api.ts
```

- [ ] **Step 4: Typecheck để xác nhận không có lỗi**

```bash
pnpm nx typecheck @meli/api
```

Expected: không có error. Nếu có lỗi `Cannot find module '@supabase/supabase-js'` → quay lại Task 1 kiểm tra package đã cài chưa.

- [ ] **Step 5: Typecheck toàn bộ app**

```bash
pnpm nx typecheck web
```

Expected: không có error liên quan đến `@meli/api`.

- [ ] **Step 6: Commit**

```bash
git add libs/api/src/lib/supabase.ts libs/api/src/index.ts
git rm libs/api/src/lib/api.ts
git commit -m "feat(api): replace placeholder with Supabase client"
```

---

## Task 4: Cài Supabase Agent Skills

**Files:** Không thay đổi source code.

- [ ] **Step 1: Chạy lệnh cài Agent Skills**

Chạy từ root monorepo:

```bash
npx skills add supabase/agent-skills
```

Expected: output thông báo skills đã được cài thành công. Nếu hỏi permission, chấp nhận.

- [ ] **Step 2: Xác nhận skills đã cài**

```bash
npx skills list
```

Expected: `supabase/agent-skills` xuất hiện trong danh sách.

- [ ] **Step 3: Commit nếu có files mới**

Nếu `npx skills add` tạo ra files trong project (ví dụ `.skills/` directory):

```bash
git add .skills/
git commit -m "chore: add Supabase agent skills"
```

Nếu không tạo ra files mới trong project, bỏ qua bước này.

---

## Verification Cuối

Sau khi hoàn thành tất cả tasks:

- [ ] **Smoke test import**

Trong một route bất kỳ (ví dụ `apps/web/src/routes/index.tsx`), thêm tạm vào `useEffect`:

```ts
import { supabase } from '@meli/api';

// bên trong component, tạm thời:
useEffect(() => {
  supabase.auth.getSession().then(console.log);
}, []);
```

Chạy dev server:

```bash
pnpm nx dev web
```

Mở browser console. Expected: object `{ data: { session: null }, error: null }` (hoặc session nếu đã login). Nếu thấy lỗi `Invalid API key` → kiểm tra lại `.env.local`.

- [ ] **Dọn dẹp smoke test code sau khi xác nhận**

Xóa `import` và `useEffect` tạm khỏi route file. Không commit code test tạm.
