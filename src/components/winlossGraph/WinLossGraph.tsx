import React from 'react';
import { ModeRecord } from "@/lib/models/PlayerDataModels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

interface WinLossGraphProps {
	modeRecord: ModeRecord,
}
const WinLossGraph: React.FC<WinLossGraphProps> = ({modeRecord}) => {
	const chartConfig = {
		desktop: {
			label: "Desktop",
			color: "hsl(var(--chart-1))"
		}
	} satisfies ChartConfig;
	const chartData = [
		{
			category: "win",
			stat: modeRecord.win
		},
		{
			category: "losses",
			stat: modeRecord.loss
		},
		{
			category: "draws",
			stat: modeRecord.draw
		},
	]
	return (
		<div className="h-full w-full">
			<Card>
				<CardHeader>
					<CardTitle>
						Stats for this mode
					</CardTitle>
					<CardDescription>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfig}>
						<BarChart
							accessibilityLayer
							data={chartData}
							margin={{
							  top: 20,
							}}
							>
							<CartesianGrid vertical={false}/>
							<XAxis
							  dataKey="category"
							  tickLine={false}
							  tickMargin={10}
							  axisLine={false}
							  tickFormatter={(value) => value.slice(0, 4)}
							/>
							<ChartTooltip
							  cursor={false}
							  content={<ChartTooltipContent hideLabel />}
							/>
							<Bar dataKey="stat" fill="var(--color-desktop)" radius={8}>
							  <LabelList
								position="top"
								offset={12}
								className="fill-foreground"
								fontSize={12}
							  />
							</Bar>
						</BarChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</div>
	)
}
export default WinLossGraph;
