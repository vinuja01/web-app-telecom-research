import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarChartComponent = ({ dataPoints }) => {
  const options = {
    title: {
      text: "Employee Tracking Chart",
    },
    data: [
      {
        type: "column",
        dataPoints: dataPoints,
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
