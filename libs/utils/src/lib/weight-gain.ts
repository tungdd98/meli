export type IdealPoint = {
  week: number;
  idealMin: number;
  idealMax: number;
};

export type ActualPoint = {
  week: number;
  actualGain: number;
};

export function calcBmi(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function getIomRange(bmi: number): [number, number] {
  if (bmi < 18.5) return [12.5, 18];
  if (bmi < 25) return [11.5, 16];
  if (bmi < 30) return [7, 11.5];
  return [5, 9];
}

export function buildIdealChartData(bmi: number): IdealPoint[] {
  const [min, max] = getIomRange(bmi);
  return Array.from({ length: 41 }, (_, week) => ({
    week,
    idealMin: parseFloat(((min / 40) * week).toFixed(2)),
    idealMax: parseFloat(((max / 40) * week).toFixed(2)),
  }));
}

export function buildActualChartData(
  entries: { measured_at: string; weight_kg: number; week: number }[],
  prePregnancyWeightKg: number,
): ActualPoint[] {
  return entries.map((e) => ({
    week: e.week,
    actualGain: parseFloat((e.weight_kg - prePregnancyWeightKg).toFixed(1)),
  }));
}
