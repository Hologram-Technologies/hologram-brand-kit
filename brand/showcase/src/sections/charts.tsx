import { Cell, Section } from "../App";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/registry/new-york-v4/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const DATA = [
  { day: "Mon", seals: 42, verifies: 118 },
  { day: "Tue", seals: 51, verifies: 130 },
  { day: "Wed", seals: 38, verifies: 122 },
  { day: "Thu", seals: 64, verifies: 161 },
  { day: "Fri", seals: 71, verifies: 189 },
  { day: "Sat", seals: 33, verifies: 92 },
  { day: "Sun", seals: 29, verifies: 87 },
];

const CONFIG = {
  seals: { label: "Seals", color: "var(--chart-1)" },
  verifies: { label: "Verifies", color: "var(--chart-3)" },
};

export function Charts() {
  return (
    <Section id="charts" title="Charts">
      <Cell title="Activity this week" wide>
        <ChartContainer config={CONFIG} className="h-64 w-full">
          <AreaChart data={DATA} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area dataKey="verifies" type="natural" fill="var(--color-verifies)" fillOpacity={0.25} stroke="var(--color-verifies)" />
            <Area dataKey="seals" type="natural" fill="var(--color-seals)" fillOpacity={0.35} stroke="var(--color-seals)" />
          </AreaChart>
        </ChartContainer>
      </Cell>
    </Section>
  );
}
