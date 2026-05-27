import { describe, it, expect } from 'vitest';
import {
  calcBmi,
  getIomRange,
  buildIdealChartData,
  buildActualChartData,
} from './weight-gain.js';

describe('calcBmi', () => {
  it('tính BMI đúng', () => {
    expect(calcBmi(52, 160)).toBeCloseTo(20.31, 1);
  });
});

describe('getIomRange', () => {
  it('gầy BMI < 18.5 → [12.5, 18]', () => {
    expect(getIomRange(17)).toEqual([12.5, 18]);
  });
  it('bình thường 18.5–24.9 → [11.5, 16]', () => {
    expect(getIomRange(22)).toEqual([11.5, 16]);
  });
  it('thừa cân 25–29.9 → [7, 11.5]', () => {
    expect(getIomRange(27)).toEqual([7, 11.5]);
  });
  it('béo phì >= 30 → [5, 9]', () => {
    expect(getIomRange(32)).toEqual([5, 9]);
  });
});

describe('buildIdealChartData', () => {
  it('trả về 41 điểm (tuần 0–40)', () => {
    const data = buildIdealChartData(22);
    expect(data).toHaveLength(41);
  });
  it('tuần 0 luôn có gain = 0', () => {
    const data = buildIdealChartData(22);
    expect(data[0].idealMin).toBe(0);
    expect(data[0].idealMax).toBe(0);
  });
  it('tuần 40 bằng IOM total range', () => {
    const data = buildIdealChartData(22); // BMI 22 → [11.5, 16]
    expect(data[40].idealMin).toBeCloseTo(11.5, 1);
    expect(data[40].idealMax).toBeCloseTo(16, 1);
  });
});

describe('buildActualChartData', () => {
  it('tính gain từ pre-pregnancy weight', () => {
    const entries = [{ measured_at: '2026-01-01', weight_kg: 52, week: 10 }];
    const data = buildActualChartData(entries, 42);
    expect(data[0].actualGain).toBeCloseTo(10, 1);
  });
});
