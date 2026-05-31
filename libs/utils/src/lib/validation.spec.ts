import { describe, expect, it } from 'vitest';
import { numericString } from './validation.js';

describe('numericString', () => {
  const schema = numericString(20, 300, 'Tối thiểu 20', 'Tối đa 300');

  it('chấp nhận giá trị trong khoảng', () => {
    expect(schema.safeParse('42').success).toBe(true);
  });

  it('chấp nhận biên min và max', () => {
    expect(schema.safeParse('20').success).toBe(true);
    expect(schema.safeParse('300').success).toBe(true);
  });

  it('báo lỗi khi rỗng', () => {
    const result = schema.safeParse('');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Tối thiểu 20');
    }
  });

  it('báo lỗi khi nhỏ hơn min', () => {
    const result = schema.safeParse('19');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Tối thiểu 20');
    }
  });

  it('báo lỗi khi lớn hơn max', () => {
    const result = schema.safeParse('301');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Tối đa 300');
    }
  });
});
