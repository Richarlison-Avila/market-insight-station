import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SalesChartProps {
  data: Array<{
    date: string;
    vendas: number;
    lucro: number;
  }>;
  height?: number;
}

export function SalesChart({ data, height = 300 }: SalesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis
          dataKey="date"
          className="text-sm text-muted-foreground"
          tick={{ fontSize: 12 }}
        />
        <YAxis
          className="text-sm text-muted-foreground"
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `R$ ${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            boxShadow: "var(--shadow-elevated)",
          }}
          labelStyle={{ color: "hsl(var(--foreground))" }}
          formatter={(value: number, name: string) => [
            `R$ ${value.toLocaleString()}`,
            name === "vendas" ? "Vendas" : "Lucro",
          ]}
        />
        <Line
          type="monotone"
          dataKey="vendas"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="lucro"
          stroke="hsl(var(--success))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "hsl(var(--success))", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}