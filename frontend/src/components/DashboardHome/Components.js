import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Weather from "./Weather";
import PieChart from "../DashboardEmployee/EmployerCRUD/PieChart";
import { useState, useEffect } from "react";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
    alignItems: "center",
  }),
}));
const Components = () => {
  const [employees, setEmployees] = useState([]);
  const [sites, setSites] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("http://localhost:5000/sites/siteDetails") // Fetch site data
      .then((response) => {
        setSites(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sites:", error);
      });

    axios
      .get("http://localhost:5000/assignuser/user-assigns") // API endpoint to fetch users
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item>
              <section className="p-14 dark:bg-gray-100 dark:text-gray-800">
                <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3">
                  <div className="flex flex-col justify-start m-2 lg:m-6">
                    <p className="text-4xl font-bold leading-none lg:text-6xl">
                      {employees.length}+
                    </p>
                    <p className="text-sm sm:text-base">Active Users</p>
                  </div>
                  <div className="flex flex-col justify-start m-2 lg:m-6">
                    <p className="text-4xl font-bold leading-none lg:text-6xl">
                      {sites.length}
                    </p>
                    <p className="text-sm sm:text-base">Active Sites</p>
                  </div>
                  <div className="flex flex-col justify-start m-2 lg:m-6">
                    <p className="text-4xl font-bold leading-none lg:text-6xl">
                      {users.length}
                    </p>
                    <p className="text-sm sm:text-base">Mobile Devices</p>
                  </div>
                </div>
              </section>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Weather />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <p
                style={{
                  margin: 0,
                  textAlign: "left",
                  fontSize: "14px",
                  marginBottom: 0,
                }}
              >
                * This chart denotes total number of visits to the sites by
                maintenance teams within a month
              </p>
              <PieChart />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <div style={{ width: "100%" }}>
                <iframe
                  width="100%"
                  height="400"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=6.916467825953641,%2080.04698012917409+(my%20map)&amp;t=k&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  title="Google Maps"
                >
                  <a href="https://www.gps.ie/">gps trackers</a>
                </iframe>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Components;
