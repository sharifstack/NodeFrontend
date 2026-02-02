import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

const lineData = [
  { day: "Mon", value: 10 },
  { day: "Tue", value: 18 },
  { day: "Wed", value: 12 },
  { day: "Thu", value: 25 },
  { day: "Fri", value: 20 },
];

const pieData = [
  { name: "Electronics", value: 40 },
  { name: "Fashion", value: 30 },
  { name: "Grocery", value: 20 },
  { name: "Others", value: 10 },
];

export default function Charts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Products Added</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <XAxis dataKey="day" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Donut Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex justify-center">
          <ResponsiveContainer width="80%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                fill="hsl(var(--primary))"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
