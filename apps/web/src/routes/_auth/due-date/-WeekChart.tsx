import { useTheme } from '@mui/material/styles';
import {
  ComposedChart,
  ResponsiveContainer,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine,
} from 'recharts';
import {
  TOTAL_WEEKS,
  trimesterBands,
  weekTicks,
  riskCurve,
  laborCurve,
  type TabKey,
} from './-data';

const curveByTab: Partial<Record<TabKey, typeof riskCurve>> = {
  risk: riskCurve,
  labor: laborCurve,
};

export function WeekChart({
  tab,
  gestationalWeek,
}: {
  tab: TabKey;
  gestationalWeek: number | null;
}) {
  const theme = useTheme();
  const curve = curveByTab[tab];
  const showPercentAxis = tab !== 'trimester';
  const data: { week: number; value?: number }[] =
    curve ?? weekTicks.map((week) => ({ week }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <ComposedChart
        data={data}
        margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />

        {/* Faint trimester regions with their numerals behind the chart. */}
        {trimesterBands.map((band) => (
          <ReferenceArea
            key={band.label}
            x1={band.start}
            x2={band.end}
            fill={theme.palette.primary.light}
            fillOpacity={0.06}
            label={{
              value: band.label,
              fontSize: 56,
              fill: theme.palette.primary.light,
              fillOpacity: 0.35,
            }}
          />
        ))}

        <XAxis
          dataKey="week"
          type="number"
          domain={[0, TOTAL_WEEKS]}
          ticks={weekTicks}
          tick={{ fontSize: 9, fill: theme.palette.text.secondary }}
          label={{
            value: 'Week',
            position: 'insideBottom',
            offset: -2,
            fontSize: 9,
            fill: theme.palette.text.disabled,
          }}
        />
        <YAxis
          domain={[0, 100]}
          ticks={[25, 50, 75, 100]}
          hide={!showPercentAxis}
          tickFormatter={(value) => `${value}%`}
          tick={{ fontSize: 9, fill: theme.palette.text.secondary }}
        />

        {curve && (
          <Area
            type="monotone"
            dataKey="value"
            stroke={theme.palette.secondary.dark}
            strokeWidth={2}
            fill={theme.palette.secondary.light}
            fillOpacity={0.2}
          />
        )}

        {gestationalWeek != null && (
          <ReferenceLine
            x={gestationalWeek}
            stroke={theme.palette.primary.main}
            label={{
              value: `tuần ${gestationalWeek}`,
              fontSize: 8,
              fill: theme.palette.primary.main,
              position: 'top',
            }}
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
