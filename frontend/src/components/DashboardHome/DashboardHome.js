import React from "react";
import SideBar from "../DashboardSidebar/SideBar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import BarChart from "../DashboardEmployee/EmployerCRUD/BarChart";
import Weather from "./Weather";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%", // Ensure each box takes full height of the grid cell
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

function DashboardHome() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        paddingTop: "12px",
        width: "115%",
      }}
    >
      {" "}
      {/* Assuming top bar height is 64px */}
      <SideBar />
      <div
        style={{
          display: "flex", // Ensure that the content is using Flexbox
          justifyContent: "flex-end", // Align children (grid) towards the end of the flex container (right side)
          width: "100%", // Ensure the container takes full width to allow flex-end to push content to the right
          paddingTop: "64px", // Lower the grid a bit from the top bar
        }}
      >
        <div className="grid grid-cols-8 gap-6 max-w-7xl w-full mx-auto p-9 rounded-md my-17 grid-flow-dense">
          <div
            className="rounded-md border relative min-h-36 grid-flow-dense col-span-3 row-span-1"
            style={{ backgroundColor: "#f5f5f5" }}
          ></div>
          <div
            className="rounded-md border relative min-h-36 grid-flow-dense col-span-5 row-span-1"
            style={{ backgroundColor: "#f5f5f5" }}
          ></div>
          <div
            className="rounded-md border relative min-h-36 grid-flow-dense col-span-5 row-span-2"
            style={{ backgroundColor: "#f5f5f5" }}
          ></div>

          <div
            className="rounded-md border relative min-h-36 grid-flow-dense col-span-3 row-span-2"
            style={{ backgroundColor: "#f5f5f5" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
