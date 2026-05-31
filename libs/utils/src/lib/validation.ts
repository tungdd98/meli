import { z } from 'zod';

/**
 * Zod schema cho input số dạng chuỗi (từ text field) với biên min/max.
 * Dùng chung cho các form nhập cân nặng / chiều cao.
 */
export const numericString = (
  min: number,
  max: number,
  minMessage: string,
  maxMessage: string,
) =>
  z
    .string()
    .min(1, minMessage)
    .refine((value) => Number(value) >= min, minMessage)
    .refine((value) => Number(value) <= max, maxMessage);
