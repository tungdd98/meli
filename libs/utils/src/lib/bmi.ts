export function calcBmi(weightKg: number, heightCm: number): number {
  return weightKg / Math.pow(heightCm / 100, 2);
}

function gainRange(bmi: number): [number, number] {
  if (bmi < 18.5) return [12.5, 18];
  if (bmi < 25) return [11.5, 16];
  if (bmi < 30) return [7, 11.5];
  return [5, 9];
}

export function calcWeightGainTip(bmi: number, weekNumber: number): string {
  if (weekNumber === 0) {
    return 'Khi thai kỳ bước sang tuần thứ 0, mức cân nặng tăng lý tưởng của bạn từ 0 kg.';
  }

  const [minTotal, maxTotal] = gainRange(bmi);
  const ratio = weekNumber / 40;
  const minGain = (minTotal * ratio).toFixed(1);
  const maxGain = (maxTotal * ratio).toFixed(1);

  return `Tuần thai thứ ${weekNumber}: mức tăng gợi ý hiện tại khoảng ${minGain} - ${maxGain} kg.`;
}
