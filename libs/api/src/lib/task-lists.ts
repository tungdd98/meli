import type { PostgrestResponse } from '@supabase/supabase-js';
import { supabase } from './supabase.js';

export type TaskListPreset = {
  id: string;
  name: string;
  color: string;
  icon_name: string;
};

export type TaskList = {
  id: string;
  user_id: string;
  name: string;
  color: string;
  icon_name: string | null;
  preset_id: string | null;
  created_at: string;
};

export type TaskListInput = {
  name: string;
  color: string;
  icon_name?: string | null;
  preset_id?: string | null;
};

type PresetsResponse = Promise<PostgrestResponse<TaskListPreset>>;
type ListsResponse = Promise<PostgrestResponse<TaskList>>;
type SingleResponse = Promise<PostgrestResponse<TaskList>>;

export const taskListsApi = {
  listPresets: (): PresetsResponse =>
    supabase
      .from('task_list_presets')
      .select('*')
      .order('name') as unknown as PresetsResponse,

  listByUser: (userId: string): ListsResponse =>
    supabase
      .from('task_lists')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true }) as unknown as ListsResponse,

  create: (userId: string, data: TaskListInput): SingleResponse =>
    supabase
      .from('task_lists')
      .insert({ user_id: userId, ...data })
      .select('*')
      .single() as unknown as SingleResponse,
};
