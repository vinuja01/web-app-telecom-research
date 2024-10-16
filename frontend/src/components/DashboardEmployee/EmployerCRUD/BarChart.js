import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarChartComponent = ({ dataPoints, employeeName }) => {
  const options = {
    title: {
      text: `Employee Tracking Chart of  ${employeeName}`, // Use the employee name in the title
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
      <p>
        <i>
          * This chart denotes number of hours a certain employee work in each
          site
        </i>
      </p>
    </div>
  );
};

export default BarChartComponent;
