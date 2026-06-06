-- Preset list definitions (system-level, seed data)
create table task_list_presets (
  id text primary key,
  name text not null,
  color text not null,
  icon_name text not null
);

insert into task_list_presets (id, name, color, icon_name) values
  ('loi-nhan-nhu',               'Lời nhắn nhủ',               '#F5A623', 'AlarmRounded'),
  ('bao-hiem',                   'Bảo hiểm',                   '#7B61FF', 'SecurityRounded'),
  ('chuan-bi-don-chao-be',       'Chuẩn bị đón chào bé yêu',   '#F28C8C', 'ChildCareRounded'),
  ('danh-sach-cua-me',           'Danh sách của mẹ',           '#E57373', 'ChecklistRounded'),
  ('dung-cu-cho-be-an',          'Dụng cụ cho bé ăn',          '#F5A623', 'LocalCafeRounded'),
  ('dat-ten-cho-be',             'Đặt tên cho bé',             '#F28C8C', 'FaceRounded'),
  ('do-choi-giao-duc',           'Đồ chơi giáo dục',           '#26C6DA', 'ToysRounded'),
  ('gio-do-di-sinh',             'Giỏ đồ đi sinh',             '#F28C8C', 'LuggageRounded'),
  ('ho-chieu-cua-be',            'Hộ chiếu của bé',            '#7B61FF', 'BadgeRounded'),
  ('ho-khau-cho-be',             'Hộ khẩu cho bé',             '#43A047', 'MenuBookRounded'),
  ('kham-thai-dinh-ky',          'Khám thai định kỳ',          '#E57373', 'MonitorHeartRounded'),
  ('khu-vuc-thay-ta',            'Khu vực thay tã',            '#F28C8C', 'BabyChangingStationRounded'),
  ('kiem-tra-suc-khoe-sau-sinh', 'Kiểm tra sức khỏe sau sinh', '#E53935', 'HealthAndSafetyRounded'),
  ('lich-tiem-chung-cho-be',     'Lịch tiêm chủng cho bé',     '#F5A623', 'VaccinesRounded'),
  ('mua-do-cho-be-moi-tap-di',   'Mua đồ cho bé mới tập đi',   '#43A047', 'DirectionsWalkRounded'),
  ('mua-sam-cho-be',             'Mua sắm cho bé',             '#F28C8C', 'ShoppingBagRounded'),
  ('mua-sam-cho-me-bau',         'Mua sắm cho mẹ bầu',         '#29B6F6', 'ShoppingCartRounded'),
  ('mua-sam-cho-tre-so-sinh',    'Mua sắm cho trẻ sơ sinh',    '#7B61FF', 'Inventory2Rounded'),
  ('ngoi-nha-an-toan',           'Ngôi nhà an toàn',           '#F28C8C', 'HomeRounded'),
  ('phong-cua-be',               'Phòng của bé',               '#26C6DA', 'KingBedRounded'),
  ('phuc-hoi-sau-sinh',          'Phục hồi sau sinh',          '#E57373', 'FavoriteRounded'),
  ('san-sang-vuot-can',          'Sẵn sàng vượt cạn',          '#26C6DA', 'EventRounded'),
  ('tiem-chung-cho-me-bau',      'Tiêm chủng cho mẹ bầu',      '#E53935', 'VaccinesRounded');

-- Per-user task lists (preset-based or custom)
create table task_lists (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  color text not null,
  icon_name text,
  preset_id text references task_list_presets(id),
  created_at timestamptz default now()
);

alter table task_lists enable row level security;
create policy "Users manage own lists" on task_lists
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Tasks
create table tasks (
  id uuid default gen_random_uuid() primary key,
  list_id uuid references task_lists(id) on delete cascade not null,
  title text not null,
  url text,
  details text,
  scheduled_date date,
  scheduled_time time,
  notify_at timestamptz,
  is_important boolean default false not null,
  is_completed boolean default false not null,
  created_at timestamptz default now()
);

alter table tasks enable row level security;
create policy "Users manage own tasks" on tasks
  using (
    list_id in (
      select id from task_lists where user_id = auth.uid()
    )
  )
  with check (
    list_id in (
      select id from task_lists where user_id = auth.uid()
    )
  );
