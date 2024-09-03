import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarChartComponent = () => {
  const options = {
    title: {
      text: "Basic Column Chart",
    },
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "Apple", y: 1 },
          { label: "Orange", y: 5 },
          { label: "Banana", y: 5 },
          { label: "Mango", y: 3 },
          { label: "Grape", y: 8 },
          { label: "Avocardo", y: 2 },
        ],
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default BarChartComponent;
