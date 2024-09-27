import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./components/Auth";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import DashboardHome from "./components/DashboardHome/DashboardHome";
import DashboardEmployee from "./components/DashboardEmployee/DashboardEmployee";
import DashboardSite from "./components/DashboardSite/DashboardSite";
import DashboardUser from "./components/DashboardUser/DashboardUser";
import "./App.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem("token");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <DashboardHome /> : <Navigate to="/" />}
        />
        <Route path="/employee" Component={DashboardEmployee}></Route>
        <Route path="/site" Component={DashboardSite}></Route>
        <Route path="/user assign" Component={DashboardUser}></Route>
      </Routes>
    </Router>
  );
}

export default App;
