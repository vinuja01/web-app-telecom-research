import * as React from "react";
import PropTypes from "prop-types";
// import Button from "@mui/material/Button";
// import Avatar from "@mui/material/Avatar";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Dialog from "@mui/material/Dialog";
// import PersonIcon from "@mui/icons-material/Person";
// import AddIcon from "@mui/icons-material/Add";
// import Typography from "@mui/material/Typography";
// import { blue } from "@mui/material/colors";
// import BarChart from "../EmployerCRUD/BarChart";
// import PieChartComponent from "../EmployerCRUD/PieChart";
import { ResponsiveContainer } from "recharts";
import BarChartComponent from "../EmployerCRUD/BarChart";

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="flex flex-row justify-center items-stretch space-x-7 max-w-full p-7 overflow-hidden">
        <div className="flex flex-col flex-grow p-6 space-y-10 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
          <ResponsiveContainer width="100%" height="200%">
            <BarChartComponent />
          </ResponsiveContainer>
          <p></p>
        </div>
      </div>
    </React.Fragment>
  );
}
