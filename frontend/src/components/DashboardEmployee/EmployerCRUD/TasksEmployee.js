import React, { useState } from "react";

import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

const SimpleDialogDemo = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true); // Define handleOpen
  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="flex flex-row justify-center items-stretch space-x-7 max-w-full p-7 overflow-hidden">
        <div className="flex flex-col flex-grow p-6 space-y-10 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
          <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
            <h2 className="mb-4 text-2xl font-semibold leading-tight">
              Invoices
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col className="w-24" />
                </colgroup>
                <thead className="dark:bg-gray-300">
                  <tr className="text-left">
                    <th className="p-3">Task</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Issued</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                    <td className="p-3">
                      <p>Resolve electricity failure</p>
                    </td>
                    <td className="p-3">
                      <p>2024/08/29</p>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Stack direction="row" spacing={2}>
                          <Button variant="outlined" startIcon={<DeleteIcon />}>
                            Delete
                          </Button>
                        </Stack>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SimpleDialogDemo;
