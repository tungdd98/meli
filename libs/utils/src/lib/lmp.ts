import dayjs from 'dayjs';

export function calcDueDateFromLmp(lmpDateStr: string): string {
  return dayjs(lmpDateStr).add(280, 'day').format('YYYY-MM-DD');
}

export function calcPregnancyWeek(dueDateStr: string | null): number {
  if (!dueDateStr) return 0;

  const daysRemaining = dayjs(dueDateStr)
    .startOf('day')
    .diff(dayjs().startOf('day'), 'day');
  if (daysRemaining <= 0) return 40;
  if (daysRemaining >= 280) return 0;

  return 40 - Math.floor(daysRemaining / 7);
}
