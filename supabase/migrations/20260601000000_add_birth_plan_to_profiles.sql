alter table profiles
  add column birth_plan text check (birth_plan in ('natural', 'c_section'));
