import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';
import { calcDueDateFromLmp, calcPregnancyWeek } from './lmp.js';

describe('calcDueDateFromLmp', () => {
  it('cộng đúng 280 ngày từ LMP', () => {
    expect(calcDueDateFromLmp('2025-09-12')).toBe('2026-06-19');
  });

  it('trả về YYYY-MM-DD format', () => {
    expect(calcDueDateFromLmp('2025-01-01')).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('calcPregnancyWeek', () => {
  it('trả về 0 khi dueDate là null', () => {
    expect(calcPregnancyWeek(null)).toBe(0);
  });

  it('trả về 40 khi đã qua ngày dự sinh', () => {
    expect(calcPregnancyWeek('2020-01-01')).toBe(40);
  });

  it('trả về tuần đúng cho ngày dự sinh 70 ngày nữa', () => {
    const dueDate = dayjs().add(70, 'day').format('YYYY-MM-DD');
    expect(calcPregnancyWeek(dueDate)).toBe(30);
  });

  it('trả về 0 khi dueDate hơn 280 ngày nữa', () => {
    const dueDate = dayjs().add(300, 'day').format('YYYY-MM-DD');
    expect(calcPregnancyWeek(dueDate)).toBe(0);
  });
});
