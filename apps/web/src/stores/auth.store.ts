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
  onboardingLmp: string | null;
  _setSession: (session: Session | null) => void;
  _setProfile: (profile: Profile | null) => void;
  _setOnboardingLmp: (lmp: string | null) => void;
  signIn: (email: string, password: string) => Promise<Profile | null>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  profile: null,
  isLoading: false,
  onboardingLmp: null,
  _setSession: (session) => set({ session, user: session?.user ?? null }),
  _setProfile: (profile) => set({ profile }),
  _setOnboardingLmp: (lmp) => set({ onboardingLmp: lmp }),
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
      return profile;
    } finally {
      set({ isLoading: false });
    }
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null, profile: null });
  },
}));
