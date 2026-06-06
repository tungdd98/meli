import type { PostgrestResponse } from '@supabase/supabase-js';
import { supabase } from './supabase.js';

export type Task = {
  id: string;
  list_id: string;
  title: string;
  url: string | null;
  details: string | null;
  scheduled_date: string | null;
  scheduled_time: string | null;
  notify_at: string | null;
  is_important: boolean;
  is_completed: boolean;
  created_at: string;
};

export type TaskWithList = Task & {
  list_name: string;
  list_color: string;
  list_icon_name: string | null;
};

export type TaskInput = {
  list_id: string;
  title: string;
  url?: string | null;
  details?: string | null;
  scheduled_date?: string | null;
  scheduled_time?: string | null;
  notify_at?: string | null;
  is_important?: boolean;
};

export type TaskPatch = Partial<
  Omit<TaskInput, 'list_id'> & {
    list_id: string;
    is_completed: boolean;
    is_important: boolean;
  }
>;

type TasksResponse = Promise<PostgrestResponse<TaskWithList>>;
type SingleResponse = Promise<PostgrestResponse<Task>>;

export const tasksApi = {
  listByUser: async (userId: string): TasksResponse => {
    const { data, error } = await supabase
      .from('tasks')
      .select(`*, task_lists!inner(name, color, icon_name, user_id)`)
      .eq('task_lists.user_id', userId)
      .order('created_at', { ascending: false });

    if (error)
      return { data: null, error } as unknown as Awaited<TasksResponse>;

    // Flatten the nested task_lists object into flat list_* fields
    const mapped = (data ?? []).map((t: Record<string, unknown>) => {
      const tl = t['task_lists'] as Record<string, unknown> | null;
      return {
        ...t,
        list_name: tl?.['name'] ?? '',
        list_color: tl?.['color'] ?? '',
        list_icon_name: tl?.['icon_name'] ?? null,
      } as TaskWithList;
    });

    return { data: mapped, error: null } as unknown as Awaited<TasksResponse>;
  },

  getById: (id: string): SingleResponse =>
    supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single() as unknown as SingleResponse,

  create: (data: TaskInput): SingleResponse =>
    supabase
      .from('tasks')
      .insert(data)
      .select('*')
      .single() as unknown as SingleResponse,

  update: (id: string, patch: TaskPatch): SingleResponse =>
    supabase
      .from('tasks')
      .update(patch)
      .eq('id', id)
      .select('*')
      .single() as unknown as SingleResponse,

  remove: (id: string) => supabase.from('tasks').delete().eq('id', id),
};
