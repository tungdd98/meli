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

type ListResponse = Promise<PostgrestResponse<WeightEntry>>;
type SingleResponse = Promise<PostgrestResponse<WeightEntry>>;

export const weightEntriesApi = {
  list: (userId: string): ListResponse =>
    supabase
      .from('weight_entries')
      .select('*')
      .eq('user_id', userId)
      .order('measured_at', { ascending: true })
      .returns<WeightEntry>() as unknown as ListResponse,

  create: (userId: string, data: WeightEntryInput): SingleResponse =>
    supabase
      .from('weight_entries')
      .insert({ user_id: userId, ...data })
      .select('*')
      .single<WeightEntry>() as unknown as SingleResponse,

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
      .single<WeightEntry>() as unknown as SingleResponse,

  remove: (id: string, userId: string) =>
    supabase.from('weight_entries').delete().eq('id', id).eq('user_id', userId),
};
