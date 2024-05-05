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

type LineChartProps = {
  chartsData: ChartData[];
};

export const BarsChart = ({ chartsData }: LineChartProps) => {
  return (
    <ResponsiveContainer>
      <BarChart data={chartsData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#8884d8" />
        <Bar dataKey="expenses" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};
