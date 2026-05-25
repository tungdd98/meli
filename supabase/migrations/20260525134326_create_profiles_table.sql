create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  due_date date,
  weight_kg numeric(5,1),
  height_cm numeric(5,1),
  baby_name text,
  baby_gender text check (baby_gender in ('male', 'female', 'unknown')),
  is_twins boolean not null default false,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users manage own profile"
  on profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
