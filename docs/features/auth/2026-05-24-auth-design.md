# Auth Feature Design

**Date:** 2026-05-24
**Scope:** Màn hình đăng nhập + bảo vệ toàn bộ route (trừ `/login`)
**Auth provider:** Supabase (email + password)

## Architecture

```
apps/web  →  useAuthStore (Zustand)  →  @meli/api (supabase)  →  Supabase Cloud
                    ↑
             onAuthStateChange (providers.tsx)
```

Auth state được quản lý bởi Zustand store. TanStack Router dùng `beforeLoad` trên layout route `_auth` để guard toàn bộ protected routes.

## Route Structure

```
routes/
  __root.tsx          ← giữ nguyên
  login.tsx           ← public
  _auth.tsx           ← pathless layout, beforeLoad guard
  _auth/
    index.tsx         ← "/" (dời từ routes/index.tsx)
    about.tsx         ← "/about" (dời từ routes/about.tsx)
```

- `_auth.tsx`: nếu không có session → `throw redirect({ to: '/login' })`
- `login.tsx`: nếu đã có session → `throw redirect({ to: '/' })`

## Auth Store

File: `apps/web/src/stores/auth.store.ts`

```ts
interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
```

- `isLoading`: mặc định `true` khi app khởi động, set `false` sau khi `getSession()` resolve. Ngăn route guard redirect nhầm trước khi auth state được xác định.
- `signIn`: gọi `supabase.auth.signInWithPassword()`, set `isLoading: true` trong khi chờ
- `signOut`: gọi `supabase.auth.signOut()`, clear `session` và `user`

## Session Initialization

Trong `providers.tsx`, thêm effect khi mount:

1. Gọi `supabase.auth.getSession()` để restore session đã lưu (localStorage) → set `isLoading: false` khi done
2. Subscribe `supabase.auth.onAuthStateChange()` để sync store realtime (token refresh, logout từ tab khác)

Route guard `_auth.tsx` phải chờ `isLoading === false` trước khi quyết định redirect.

## Login UI

File: `apps/web/src/routes/login.tsx`

Layout: centered card, responsive, nhất quán với MUI theme hiện tại.

```
┌─────────────────────────────┐
│        [Logo Meli]          │
│                             │
│   Đăng nhập                 │
│                             │
│   [ Email                 ] │
│   [ Mật khẩu           👁 ] │
│                             │
│   [! Alert: lỗi nếu có   ] │
│                             │
│   [      Đăng nhập        ] │
└─────────────────────────────┘
```

**Form**: React Hook Form + Zod

- Email: required, email format
- Password: required, min 6 ký tự
- Validation error hiển thị inline dưới field
- Password field: toggle show/hide với `VisibilityRounded` / `VisibilityOffRounded`
- Nút submit: disabled + loading spinner khi đang gọi API
- Lỗi từ Supabase: hiển thị `Alert` MUI phía trên nút submit

## Data Flow

**Đăng nhập:**

1. User submit form → `store.signIn(email, password)`
2. Store set `isLoading: true`, gọi `supabase.auth.signInWithPassword()`
3. Thành công → `onAuthStateChange` cập nhật `session` + `user` trong store → route guard redirect về `/`
4. Thất bại → store throw error → login page hiển thị Alert

**Đăng xuất** (UI sẽ implement sau):

1. Gọi `store.signOut()`
2. `supabase.auth.signOut()` → `onAuthStateChange` clear store
3. Route guard `_auth.tsx` redirect về `/login`

## Error Handling

| Tình huống         | Xử lý                                                              |
| ------------------ | ------------------------------------------------------------------ |
| Sai email/password | Alert: "Email hoặc mật khẩu không đúng"                            |
| Network error      | Alert: "Không thể kết nối. Vui lòng thử lại"                       |
| Session hết hạn    | `onAuthStateChange` detect → store clear → guard redirect `/login` |
| Token refresh      | Supabase tự xử lý, `onAuthStateChange` sync lại store              |

## Out of Scope

- Màn hình đăng ký (tài khoản quản lý thủ công trên Supabase)
- Forgot password / reset password
- OAuth (Google, Apple, Facebook)
- Remember me
