"use client";
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import Plot for client-side rendering
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface LineChartProps {
  n_generations: number;
  generations: number[];
  bestDistances: number[];
}

const LineChart: React.FC<LineChartProps> = ({n_generations, generations, bestDistances }) => {


  const generationsEdited = [...generations, n_generations];
  const bestDistancesEdited = [...bestDistances, bestDistances[bestDistances.length - 1]];

  const lineData = [
    {
      x: generationsEdited,
      y: bestDistancesEdited,
      type: "scatter",
      mode: "lines",
      // marker: { color: "blue", size: 8 },
      // line: { color: "orange", width: 2 },
      name: "Best Distance",
    },
  ];

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
