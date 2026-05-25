import { describe, expect, it } from 'vitest';
import { calcBmi, calcWeightGainTip } from './bmi';

describe('calcBmi', () => {
  it('tính đúng BMI', () => {
    expect(calcBmi(58.5, 162)).toBeCloseTo(22.3, 1);
  });

  it('tính đúng BMI — underweight case', () => {
    expect(calcBmi(42, 150)).toBeCloseTo(18.7, 1);
  });
});

describe('calcWeightGainTip', () => {
  it('trả về tip tuần 0 khi weekNumber = 0', () => {
    const tip = calcWeightGainTip(22, 0);
    expect(tip).toContain('tuần thứ 0');
    expect(tip).toContain('0 kg');
  });

  it('trả về tip với khoảng tăng cân cho BMI bình thường', () => {
    const tip = calcWeightGainTip(22, 24);
    expect(tip).toContain('24');
    expect(tip).toMatch(/\d+\.\d+ - \d+\.\d+ kg/);
  });

  it('underweight (BMI < 18.5) có min gain cao hơn normal', () => {
    const getMin = (tip: string) =>
      parseFloat(tip.match(/khoảng ([\d.]+)/)![1]);
    expect(getMin(calcWeightGainTip(17, 20))).toBeGreaterThan(
      getMin(calcWeightGainTip(22, 20)),
    );
  });

  it('overweight (BMI >= 25) có min gain thấp hơn normal', () => {
    const getMin = (tip: string) =>
      parseFloat(tip.match(/khoảng ([\d.]+)/)![1]);
    expect(getMin(calcWeightGainTip(27, 20))).toBeLessThan(
      getMin(calcWeightGainTip(22, 20)),
    );
  });
});
