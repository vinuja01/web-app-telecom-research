import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import UpdateUser from "./UpdateUser"; // Adjust the import path as necessary

const UserForm = () => {
  const [openViewUsers, setOpenViewUsers] = useState(false);
  const [openSendEmail, setOpenSendEmail] = useState(false);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [emailAddress, setEmailAddress] = useState("");

  const handleOpenViewUsers = () => {
    setOpenViewUsers(true);
  };

  const handleCloseViewUsers = () => {
    setOpenViewUsers(false);
  };

  const handleOpenSendEmail = (userId) => {
    setSelectedUserId(userId);
    setOpenSendEmail(true);
  };

  const handleCloseSendEmail = () => {
    setOpenSendEmail(false);
  };

  const handleSendEmail = (event) => {
    event.preventDefault();
    console.log("Send email to:", emailAddress);
    // Implement the email sending functionality here (e.g., API call)
    handleCloseSendEmail();
  };

  const handleOpenUpdateUser = (userId) => {
    setSelectedUserId(userId);
    setOpenUpdateUser(true);
  };

  const handleCloseUpdateUser = () => {
    setOpenUpdateUser(false);
  };

  // Sample user data (replace or fetch from your backend)
  const users = [
    { id: 1, username: "JohnDoe", password: "pass123" },
    { id: 2, username: "JaneDoe", password: "pass456" },
  ];

  const deleteUser = (userId) => {
    console.log("Delete user with ID:", userId);
    // Implement the delete functionality here (e.g., API call)
  };

  return (
    <div className="flex items-center justify-center text-center dark:bg-gray-50 dark:text-gray-800">
      <form
        noValidate=""
        className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg dark:text-gray-800"
      >
        <label htmlFor="username" className="self-start text-xs font-semibold">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600"
        />
        <label
          htmlFor="password"
          className="self-start mt-3 text-xs font-semibold"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600"
        />
        <button
          type="submit"
          className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
        >
          Assign User
        </button>
        <button
          type="button"
          onClick={handleOpenViewUsers}
          className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
        >
          View Users List
        </button>
      </form>

      <Dialog
        open={openViewUsers}
        onClose={handleCloseViewUsers}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogContent>
          <table className="min-w-full text-xs text-center">
            <thead className="dark:bg-gray-300">
              <tr>
                <th className="p-3">Username</th>
                <th className="p-3">Password</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                >
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.password}</td>
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      className="px-4 py-1 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100"
                      onClick={() => handleOpenUpdateUser(user.id)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="px-4 py-1 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="px-4 py-1 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100"
                      onClick={() => handleOpenSendEmail(user.id)}
                    >
                      Send
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openSendEmail}
        onClose={handleCloseSendEmail}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogContent>
          <form
            noValidate=""
            onSubmit={handleSendEmail}
            className="flex flex-col w-full max-w-md p-8 rounded shadow-lg dark:text-gray-800"
          >
            <label
              htmlFor="emailAddress"
              className="self-start text-xs font-semibold"
            >
              Email Address
            </label>
            <input
              id="emailAddress"
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600"
            />
            <button
              type="submit"
              className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
            >
              Send Email
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openUpdateUser}
        onClose={handleCloseUpdateUser}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogContent>
          <UpdateUser />{" "}
          {/* Assuming UpdateUser does not need props here; pass them if needed */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserForm;
