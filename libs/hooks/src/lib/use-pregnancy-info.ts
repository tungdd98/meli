import dayjs from 'dayjs';
import { calcPregnancyWeek } from '@meli/utils';

export interface PregnancyInfo {
  week: number;
  dayOfWeek: number;
  daysLeft: number;
  pct: number;
}

const EMPTY: PregnancyInfo = { week: 0, dayOfWeek: 0, daysLeft: 0, pct: 0 };

export function usePregnancyInfo(dueDate: string | null): PregnancyInfo {
  if (!dueDate) return EMPTY;
  const daysRemaining = dayjs(dueDate)
    .startOf('day')
    .diff(dayjs().startOf('day'), 'day');
  const daysPregnant = Math.max(0, 280 - daysRemaining);
  const week = calcPregnancyWeek(dueDate);
  const dayOfWeek = daysPregnant % 7;
  const daysLeft = Math.max(0, daysRemaining);
  const pct = Math.min(1, daysPregnant / 280);
  return { week, dayOfWeek, daysLeft, pct };
}
