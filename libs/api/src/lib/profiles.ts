import { supabase } from './supabase.js';

export type Profile = {
  id: string;
  due_date: string | null;
  weight_kg: number | null;
  height_cm: number | null;
  baby_name: string | null;
  baby_gender: 'male' | 'female' | 'unknown' | null;
  is_twins: boolean;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
};

export type ProfileUpdate = {
  due_date?: string | null;
  weight_kg?: number | null;
  height_cm?: number | null;
  baby_name?: string | null;
  baby_gender?: 'male' | 'female' | 'unknown';
  is_twins?: boolean;
  onboarding_completed?: boolean;
};

export const profilesApi = {
  get: (userId: string) =>
    supabase.from('profiles').select('*').eq('id', userId).single<Profile>(),

  update: (userId: string, data: ProfileUpdate) =>
    supabase.from('profiles').update(data).eq('id', userId),
};
