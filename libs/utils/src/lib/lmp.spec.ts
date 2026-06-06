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

  it('LMP = hôm nay → due date = hôm nay + 280 ngày', () => {
    const today = dayjs().format('YYYY-MM-DD');
    const expected = dayjs().add(280, 'day').format('YYYY-MM-DD');
    expect(calcDueDateFromLmp(today)).toBe(expected);
  });

  it('LMP = 280 ngày trước → due date = hôm nay', () => {
    const lmp = dayjs().subtract(280, 'day').format('YYYY-MM-DD');
    const expected = dayjs().format('YYYY-MM-DD');
    expect(calcDueDateFromLmp(lmp)).toBe(expected);
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

  it('trả về 40 khi due date = hôm nay', () => {
    const today = dayjs().format('YYYY-MM-DD');
    expect(calcPregnancyWeek(today)).toBe(40);
  });

  it('trả về 39 khi due date = hôm nay + 7 ngày', () => {
    const dueDate = dayjs().add(7, 'day').format('YYYY-MM-DD');
    expect(calcPregnancyWeek(dueDate)).toBe(39);
  });
});
