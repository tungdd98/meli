// Static reference data for the due-date screen charts and tab copy.
// Curves are stylized illustrations (not personalized) — only the marker line
// and countdown are derived from the user's due_date.

export type TabKey = 'trimester' | 'risk' | 'labor';

export const TOTAL_WEEKS = 42;

// X-axis ticks: 0, 2, 4, ... 42
export const weekTicks = Array.from(
  { length: TOTAL_WEEKS / 2 + 1 },
  (_, i) => i * 2,
);

// Trimester regions drawn as faint background bands behind the chart.
export const trimesterBands = [
  { label: '1', start: 0, end: 13 },
  { label: '2', start: 14, end: 27 },
  { label: '3', start: 28, end: TOTAL_WEEKS },
];

export type CurvePoint = { week: number; value: number };

// Miscarriage risk: high in the first weeks, decaying toward zero.
export const riskCurve: CurvePoint[] = weekTicks.map((week) => ({
  week,
  value: Math.round(85 * Math.exp(-week / 3)),
}));

// Labor probability: near zero until ~week 38, then rising steeply.
export const laborCurve: CurvePoint[] = weekTicks.map((week) => ({
  week,
  value: Math.round(100 / (1 + Math.exp(-(week - 39) * 1.2))),
}));

export const tabContent: Record<
  TabKey,
  { tabLabel: string; heading: string; body: string }
> = {
  trimester: {
    tabLabel: 'TAM CÁ NGUYỆT',
    heading: '3 tam cá nguyệt của thai kỳ',
    body: 'Một thai kỳ điển hình bao gồm 3 tam cá nguyệt. Trong tam cá nguyệt đầu tiên, não của Con của bạn phát triển, trái tim bé nhỏ bắt đầu đập và mẹ có thể bắt đầu bị ốm nghén.',
  },
  risk: {
    tabLabel: 'RỦI RO',
    heading: 'Nguy cơ và biến chứng',
    body: 'Trong tam cá nguyệt đầu tiên của thai kỳ, các biến chứng có thể xảy ra đối với các mẹ bầu. Trong sáu tuần đầu tiên, nguy cơ sảy thai đặc biệt cao như thể hiện trên biểu đồ.',
  },
  labor: {
    tabLabel: 'CHUYỂN DẠ',
    heading: 'Sinh con và chuyển dạ',
    body: 'Khi ngày dự sinh của Con của bạn càng đến gần, cơ hội hai mẹ con sẽ gặp nhau ngày càng cao. Khi mẹ ở tuần thứ 38 của thai kỳ, khả năng chuyển dạ tăng lên theo giờ.',
  },
};

export const birthPlanLabels: Record<'natural' | 'c_section', string> = {
  natural: 'Sinh tự nhiên',
  c_section: 'Sinh mổ',
};

export const BIRTH_PLAN_FALLBACK = 'Chưa quyết định';
