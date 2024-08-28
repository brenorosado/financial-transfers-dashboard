import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import * as S from "./styles";
import { ChartData } from "@/utils/handleTransactions";
import { formatBRLCurrency } from "@/utils/formatting";

type LineChartProps = {
  chartsData: ChartData[];
};

export const LineChart = ({ chartsData }: LineChartProps) => {
  const slicedChartData = chartsData.slice(-12);

  const accumulatedChartData = slicedChartData.map(
    ({ name, balance }, index) => ({
      name,
      balance:
        index > 0
          ? slicedChartData
              .slice(0, index)
              .reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.balance,
                balance,
              )
          : balance,
    }),
  );

  return (
    <S.ChartContainer>
      <S.ChartTitle>Balance evolution</S.ChartTitle>
      {accumulatedChartData.length === 0 && (
        <S.EmptyLabel>There is no data to display</S.EmptyLabel>
      )}
      {accumulatedChartData.length > 0 && (
        <ResponsiveContainer>
          <AreaChart width={730} height={250} data={accumulatedChartData}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--blue)" stopOpacity={0.7} />
                <stop offset="95%" stopColor="var(--blue)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize="clamp(12px, 0.6vw, 0.6vw)" />
            <YAxis fontSize="clamp(12px, 0.6vw, 0.6vw)" />
            <CartesianGrid stroke="var(--gray)" horizontal={true} />
            <Tooltip
              formatter={(value) => [
                `${formatBRLCurrency(Number(value), false)}`,
                "Balance",
              ]}
              contentStyle={{
                backgroundColor: "rgba(30, 30, 30, 0.3)",
                borderRadius: "clamp(8px, 0.833vw, 0.833vw)",
                border: `none`,
                backdropFilter: "blur(3px)",
                textTransform: "capitalize",
              }}
            />
            <Area
              dataKey="balance"
              type="monotone"
              stroke="var(--blue)"
              fillOpacity={1}
              fill="url(#colorBalance)"
            />
            <Legend
              payload={[
                {
                  id: "balance",
                  value: "Balance",
                  color: "url(#colorBalance)",
                },
              ]}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </S.ChartContainer>
  );
};
