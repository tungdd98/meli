import { useNavigate } from '@tanstack/react-router';
import {
  HomeRounded,
  MenuBookRounded,
  PsychologyRounded,
  SettingsRounded,
} from '@mui/icons-material';
import { BottomNav } from '@meli/ui';

const NAV_ITEMS = [
  { label: 'Trang chủ', icon: <HomeRounded /> },
  { label: 'Hướng dẫn', icon: <MenuBookRounded /> },
  { label: 'AI', icon: <PsychologyRounded /> },
  { label: 'Cài đặt', icon: <SettingsRounded /> },
];

const NAV_ROUTES = ['/', '/guide', '/ai', '/settings'] as const;

export function AppBottomNav({ value }: { value: number }) {
  const navigate = useNavigate();
  return (
    <BottomNav
      items={NAV_ITEMS}
      value={value}
      onChange={(_, idx) => navigate({ to: NAV_ROUTES[idx] })}
    />
  );
}
