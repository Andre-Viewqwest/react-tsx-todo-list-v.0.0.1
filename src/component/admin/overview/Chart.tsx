import { useState } from "react";
import { BarChart } from "@mantine/charts";

interface Data {
  month: string;
  Smartphones: number;
  Laptops: number;
  Tablets: number;
}

const Chart: React.FC = () => {
  // Initialize state for cardsData
  const [data, setData] = useState<Data[]>([
    { month: "January", Smartphones: 1200, Laptops: 900, Tablets: 200 },
    { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
    { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
    { month: "April", Smartphones: 1000, Laptops: 200, Tablets: 800 },
    { month: "May", Smartphones: 800, Laptops: 1400, Tablets: 1200 },
    { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
  ]);

  return (
    <>
      <BarChart
        h={300}
        data={data}
        dataKey="month"
        series={[
          { name: "Smartphones", color: "violet.6" },
          { name: "Laptops", color: "blue.6" },
          { name: "Tablets", color: "teal.6" },
        ]}
        tickLine="xy"
        gridAxis="xy"
        withLegend
      />
    </>
  );
};

export default Chart;
