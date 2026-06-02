import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from './supabase.js';

export type Profile = {
  id: string;
  display_name: string | null;
  birth_date: string | null;
  due_date: string | null;
  weight_kg: number | null;
  height_cm: number | null;
  baby_name: string | null;
  baby_gender: 'male' | 'female' | 'unknown' | null;
  birth_plan: 'natural' | 'c_section' | null;
  is_twins: boolean;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
};

export type ProfileUpdate = {
  display_name?: string | null;
  birth_date?: string | null;
  due_date?: string | null;
  weight_kg?: number | null;
  height_cm?: number | null;
  baby_name?: string | null;
  baby_gender?: 'male' | 'female' | 'unknown';
  birth_plan?: 'natural' | 'c_section' | null;
  is_twins?: boolean;
  onboarding_completed?: boolean;
};

type ProfileResponse = Promise<PostgrestSingleResponse<Profile | null>>;

export const profilesApi = {
  get: async (userId: string): ProfileResponse => {
    const result = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle<Profile>();

    if (result.data || result.error) return result;

    return supabase
      .from('profiles')
      .upsert({ id: userId }, { onConflict: 'id' })
      .select('*')
      .single<Profile>();
  },

  update: async (userId: string, data: ProfileUpdate): ProfileResponse =>
    supabase
      .from('profiles')
      .upsert({ id: userId, ...data }, { onConflict: 'id' })
      .select('*')
      .single<Profile>(),
};
