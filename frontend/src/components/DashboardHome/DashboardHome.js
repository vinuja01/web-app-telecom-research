import React from "react";
import SideBar from "../DashboardSidebar/SideBar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import BarChart from "../DashboardEmployee/EmployerCRUD/BarChart";
import Weather from "./Weather";
import Components from "./Components";

function DashboardHome() {
  return (
    <div>
      <SideBar />
      <div>
        <div class="flex overflow-hidden bg-white pt-16">
          <div
            class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
            id="sidebarBackdrop"
          ></div>
          <div
            id="main-content"
            class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
          >
            <main>
              <div class="pt-6 px-4">
                <div class="w-full"></div>
                <Components />
              </div>
            </main>
          </div>
        </div>
        <script async defer src="https://buttons.github.io/buttons.js"></script>
        <script src="https://demo.themesberg.com/windster/app.bundle.js"></script>
      </div>
    </div>
  );
}

export default DashboardHome;
