import React from "react";
import Plot from "react-plotly.js";
import { Data } from "plotly.js";

interface LineChartProps {
  n_generations?: number;
  generations?: number[];
  bestDistances?: number[];
}

const LineChart: React.FC<LineChartProps> = ({ n_generations, generations, bestDistances }) => {
  // Safely handle undefined or empty inputs
  const safeGenerations = generations && generations.length > 0 ? generations : [];
  const safeBestDistances = bestDistances && bestDistances.length > 0 ? bestDistances : [];

  // Create edited arrays with safety checks
  const generationsEdited: number[] = [
    ...safeGenerations, 
    ...(n_generations !== undefined ? [n_generations] : [])
  ];

  const bestDistancesEdited: number[] = [
    ...safeBestDistances, 
    ...(safeBestDistances.length > 0 
      ? [safeBestDistances[safeBestDistances.length - 1]] 
      : [])
  ];

  // Only create plot data if we have valid inputs
  const lineData: Data[] = generationsEdited.length > 0 && bestDistancesEdited.length > 0 ? [
    {
      x: generationsEdited,
      y: bestDistancesEdited,
      type: "scatter",
      mode: "lines",
      name: "Best Distance",
    },
  ] : [];

  // Render placeholder if no data
  if (lineData.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        No generation data available
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Plot
        data={lineData}
        layout={{
          title: "Best Distance Over Generations",
          xaxis: { title: "Generation" },
          yaxis: { title: "Best Distance" },
          showlegend: true,
          margin: { t: 50, l: 50, r: 50, b: 50 },
        }}
        useResizeHandler={true}
        className="w-full h-full"
        config={{ responsive: true }}
      />
    </div>
  );
};

export default LineChart;