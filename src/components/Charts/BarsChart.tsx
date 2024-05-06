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
import { formatBRLCurrency } from "@/utils/formatting";

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
            <XAxis dataKey="name" fontSize="clamp(12px, 0.6vw, 0.6vw)" />
            <YAxis fontSize="clamp(12px, 0.6vw, 0.6vw)" />
            <Tooltip
              formatter={(value, name) => [
                `${formatBRLCurrency(Number(value), false)}`,
                name === "expenses" ? "Despesas" : "Receitas",
              ]}
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: "clamp(8px, 0.833vw, 0.833vw)",
                border: `1px solid var(--light_gray)`,
                backdropFilter: "blur(3px)",
                textTransform: "capitalize",
              }}
              cursor={{ fill: "var(--gray)" }}
            />
            <Legend
              wrapperStyle={{
                color: "var(--light_gray)",
              }}
              color="var(--light_gray)"
              payload={[
                {
                  id: "expenses",
                  value: <S.LegendLabel>Despesas</S.LegendLabel>,
                  color: "url(#colorExpenses)",
                },
                {
                  id: "income",
                  value: <S.LegendLabel>Receitas</S.LegendLabel>,
                  color: "url(#colorIncome)",
                },
              ]}
            />
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
