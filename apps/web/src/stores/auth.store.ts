import { create } from 'zustand';
import { profilesApi, supabase, type Profile } from '@meli/api';

type Session = Awaited<
  ReturnType<typeof supabase.auth.getSession>
>['data']['session'];
type User = NonNullable<Session>['user'];

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  _setSession: (session: Session | null) => void;
  _setProfile: (profile: Profile | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  profile: null,
  isLoading: false,
  _setSession: (session) => set({ session, user: session?.user ?? null }),
  _setProfile: (profile) => set({ profile }),
  signIn: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      const { data: profile } = data.session
        ? await profilesApi.get(data.session.user.id)
        : { data: null };
      set({ session: data.session, user: data.session?.user ?? null });
      set({ profile });
    } finally {
      set({ isLoading: false });
    }
  },
  signOut: async () => {
    await supabase.auth.signOut();
  },
}));
