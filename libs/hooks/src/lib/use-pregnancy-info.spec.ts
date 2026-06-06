import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';
import { usePregnancyInfo } from './use-pregnancy-info.js';

describe('usePregnancyInfo', () => {
  it('returns empty state when dueDate is null', () => {
    expect(usePregnancyInfo(null)).toEqual({
      week: 0,
      dayOfWeek: 0,
      daysLeft: 0,
      pct: 0,
    });
  });

  it('returns week 40 and daysLeft 0 when due date is today', () => {
    const today = dayjs().format('YYYY-MM-DD');
    const result = usePregnancyInfo(today);
    expect(result.week).toBe(40);
    expect(result.daysLeft).toBe(0);
    expect(result.pct).toBe(1);
  });

  it('returns week 0 when due date is more than 280 days away', () => {
    const future = dayjs().add(300, 'day').format('YYYY-MM-DD');
    const result = usePregnancyInfo(future);
    expect(result.week).toBe(0);
    expect(result.pct).toBe(0);
  });

  it('calculates correctly at 140 days remaining (week 20)', () => {
    const dueDate = dayjs().add(140, 'day').format('YYYY-MM-DD');
    const result = usePregnancyInfo(dueDate);
    expect(result.week).toBe(20);
    expect(result.daysLeft).toBe(140);
  });

  it('pct is clamped to 1 when past due date', () => {
    const past = dayjs().subtract(10, 'day').format('YYYY-MM-DD');
    const result = usePregnancyInfo(past);
    expect(result.pct).toBe(1);
    expect(result.daysLeft).toBe(0);
  });
});
