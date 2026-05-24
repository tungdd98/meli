import { create } from 'zustand';
import { supabase } from '@meli/api';

type Session = Awaited<
  ReturnType<typeof supabase.auth.getSession>
>['data']['session'];
type User = NonNullable<Session>['user'];

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  _setSession: (session: Session | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: false,
  _setSession: (session) => set({ session, user: session?.user ?? null }),
  signIn: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({ session: data.session, user: data.session?.user ?? null });
    } finally {
      set({ isLoading: false });
    }
  },
  signOut: async () => {
    await supabase.auth.signOut();
  },
}));
