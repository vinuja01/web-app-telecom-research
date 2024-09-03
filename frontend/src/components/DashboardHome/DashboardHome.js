import React from "react";
import SideBar from "../DashboardSidebar/SideBar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import BarChart from "../DashboardEmployee/EmployerCRUD/BarChart";

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
    <div style={{ display: "flex", height: "100vh", paddingTop: "1px" }}>
      {" "}
      {/* Assuming top bar height is 64px */}
      <SideBar />
      <Box sx={{ flexGrow: 1, p: 3, marginLeft: "240px" }}>
        {" "}
        {/* Assuming sidebar width is 240px */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gap: 2,
            height: "calc(100% - 2px)", // Adjust based on your top bar height
          }}
        >
          <Item></Item>
          <Item>
            <iframe
              width="520"
              height="470"
              frameborder="0"
              scrolling="no"
              marginheight="6"
              marginwidth="0"
              id="gmap_canvas"
              src="https://maps.google.com/maps?width=520&amp;height=434&amp;hl=en&amp;q=228/A,%20Udamapitigama%20,%20Dompe%20Dompe+()&amp;t=h&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>{" "}
            <a href="https://dissertationschreibenlassen.com/dissertation-medizin/">
              Dissertation in Medizin
            </a>{" "}
            <script
              type="text/javascript"
              src="https://embedmaps.com/google-maps-authorization/script.js?id=353ece46cea7e9d860dd037042149ed5e047d8ab"
            ></script>
          </Item>
          <Item></Item>
          <Item>More Details</Item>
        </Box>
      </Box>
    </div>
  );
}

export default DashboardHome;
