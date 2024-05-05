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

type LineChartProps = {
  chartsData: ChartData[];
};

export const LineChart = ({ chartsData }: LineChartProps) => {
  return (
    <S.ChartContainer>
      <S.ChartTitle>Evolução do saldo</S.ChartTitle>
      <ResponsiveContainer>
        <AreaChart width={730} height={250} data={chartsData.slice(-12)}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--blue)" stopOpacity={0.7} />
              <stop offset="95%" stopColor="var(--blue)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="var(--gray)" horizontal={true} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: "clamp(8px, 0.833vw, 0.833vw)",
              border: `1px solid var(--light_gray)`,
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
          <Legend />
        </AreaChart>
      </ResponsiveContainer>
    </S.ChartContainer>
  );
};
