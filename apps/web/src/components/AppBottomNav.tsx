import { useLocation, useNavigate } from '@tanstack/react-router';
import {
  HomeRounded,
  MenuBookRounded,
  PsychologyRounded,
  SettingsRounded,
} from '@mui/icons-material';
import { BottomNav } from '@meli/ui';

const NAV_ITEMS = [
  { label: 'Trang chủ', icon: <HomeRounded />, to: '/' },
  { label: 'Hướng dẫn', icon: <MenuBookRounded />, to: '/guide' },
  { label: 'AI', icon: <PsychologyRounded />, to: '/ai' },
  { label: 'Cài đặt', icon: <SettingsRounded />, to: '/settings' },
] as const;

const BOTTOM_NAV_ITEMS = NAV_ITEMS.map(({ label, icon }) => ({ label, icon }));

/** Resolve the active item from the pathname: Home matches '/' exactly, the rest match by longest prefix. */
function getActiveIndex(pathname: string): number {
  if (pathname === '/') return 0;
  let activeIndex = -1;
  let matchedLength = 0;
  NAV_ITEMS.forEach((item, index) => {
    if (item.to === '/') return;
    const isMatch = pathname === item.to || pathname.startsWith(`${item.to}/`);
    if (isMatch && item.to.length > matchedLength) {
      activeIndex = index;
      matchedLength = item.to.length;
    }
  });
  return activeIndex;
}

export function AppBottomNav() {
  const navigate = useNavigate();
  const pathname = useLocation({ select: (location) => location.pathname });

  return (
    <BottomNav
      items={BOTTOM_NAV_ITEMS}
      value={getActiveIndex(pathname)}
      onChange={(_, idx) => navigate({ to: NAV_ITEMS[idx].to })}
    />
  );
}
