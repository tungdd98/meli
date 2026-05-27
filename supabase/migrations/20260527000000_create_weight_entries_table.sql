create table weight_entries (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references profiles(id) on delete cascade,
  measured_at date not null,
  weight_kg   numeric(5,1) not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table weight_entries enable row level security;

create policy "Users manage own weight entries"
  on weight_entries for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
