import { ChartData } from "@/utils/handleTransactions";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import * as S from "./styles";

type LineChartProps = {
  chartsData: ChartData[];
};

export const BarsChart = ({ chartsData }: LineChartProps) => {
  return (
    <S.ChartContainer>
      <S.ChartTitle>Receitas e despesas</S.ChartTitle>
      {chartsData.length === 0 && (
        <S.EmptyLabel>Não há dados para exibir.</S.EmptyLabel>
      )}
      {chartsData.length > 1 && (
        <ResponsiveContainer>
          <BarChart data={chartsData.slice(-12)}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--green)" stopOpacity={0.7} />
                <stop offset="95%" stopColor="var(--green)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--red)" stopOpacity={0.7} />
                <stop offset="95%" stopColor="var(--red)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--gray)" horizontal={true} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: "clamp(8px, 0.833vw, 0.833vw)",
                border: `1px solid var(--light_gray)`,
                backdropFilter: "blur(3px)",
                textTransform: "capitalize",
              }}
              cursor={{ fill: "var(--gray)" }}
            />
            <Legend />
            <Bar
              dataKey="expenses"
              type="monotone"
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
            <Bar
              dataKey="income"
              type="monotone"
              fillOpacity={1}
              fill="url(#colorIncome)"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </S.ChartContainer>
  );
};
