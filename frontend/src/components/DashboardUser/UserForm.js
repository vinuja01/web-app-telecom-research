// UserForm.jsx
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import UpdateUser from "./UpdateUser"; // Ensure this path is correct based on your project structure

const UserForm = () => {
  const [openViewUsers, setOpenViewUsers] = useState(false);
  const [openSendEmail, setOpenSendEmail] = useState(false);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [emailAddress, setEmailAddress] = useState("");

  // State for form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // State for users list
  const [users, setUsers] = useState([]);

  // State to track password visibility per user
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const togglePasswordVisibility = (userId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handleOpenViewUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/assignuser/user-assigns"
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        setOpenViewUsers(true);
      } else {
        console.error("Failed to fetch users.");
        alert("Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("An error occurred while fetching users.");
    }
  };

  const handleCloseViewUsers = () => {
    setOpenViewUsers(false);
  };

  const handleOpenSendEmail = (userId) => {
    const user = users.find((u) => u._id === userId);
    setSelectedUser(user);
    setOpenSendEmail(true);
  };

  const handleCloseSendEmail = () => {
    setOpenSendEmail(false);
    setSelectedUser(null);
    setEmailAddress("");
  };

  const handleSendEmail = async (event) => {
    event.preventDefault();
    if (!emailAddress) {
      alert("Please enter an email address.");
      return;
    }

    const emailData = {
      email: emailAddress,
      user: {
        username: selectedUser.username,
        password: selectedUser.password,
      },
    };

    try {
      const response = await fetch(
        "http://localhost:5000/assignuser/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );

      if (response.ok) {
        alert("Email sent successfully.");
        handleCloseSendEmail();
      } else {
        const errorData = await response.json();
        alert("Error sending email: " + errorData.message);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An unexpected error occurred.");
    }
  };

  const handleOpenUpdateUser = (userId) => {
    const user = users.find((u) => u._id === userId);
    setSelectedUser(user);
    setOpenUpdateUser(true);
  };

  const handleCloseUpdateUser = () => {
    setOpenUpdateUser(false);
    setSelectedUser(null);
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/assignuser/user-assigns/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId));
        alert("User deleted successfully.");
      } else {
        const errorData = await response.json();
        alert("Error deleting user: " + errorData.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An unexpected error occurred.");
    }
  };

  // Handle form submission to assign a new user
  const handleAssignUser = async (event) => {
    event.preventDefault();

    // Prepare the data to be sent
    const userData = { username, password };

    try {
      const response = await fetch(
        "http://localhost:5000/assignuser/user-assigns",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        const newUser = await response.json();
        setUsers([...users, newUser]);
        setUsername("");
        setPassword("");
        alert("User assigned successfully.");
      } else if (response.status === 409) {
        const errorData = await response.json();
        alert(errorData.message);
      } else {
        const errorData = await response.json();
        alert("Error assigning user: " + errorData.message);
      }
    } catch (error) {
      console.error("Error assigning user:", error);
      alert("An unexpected error occurred.");
    }
  };

  // Function to handle updating a user in the users state
  const handleUpdateUserInState = (updatedUser) => {
    setUsers(
      users.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    );
  };

  return (
    <div className="flex items-center justify-center text-center dark:bg-red-50 dark:text-gray-800 p-4">
      <form
        noValidate=""
        onSubmit={handleAssignUser}
        className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg dark:text-gray-800 bg-E9EED9"
      >
        <label
          htmlFor="username"
          className="self-start text-xs font-semibold"
          style={{ color: "#536493" }} // Primary color for label text
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="flex items-center h-12 px-4 mt-2 rounded"
          style={{
            backgroundColor: "#E4E0E1",
            color: "black",
            borderColor: "#536493",
            borderWidth: "1px",
          }} // Tertiary color for input background, primary for border
        />
        <label
          htmlFor="password"
          className="self-start mt-3 text-xs font-semibold"
          style={{ color: "#536493" }} // Primary color for label text
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="flex items-center h-12 px-4 mt-2 rounded"
          style={{
            backgroundColor: "#E4E0E1",
            color: "black",
            borderColor: "#536493",
            borderWidth: "1px",
          }} // Tertiary color for input background, primary for border
        />
        <button
          type="submit"
          className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded"
          style={{ backgroundColor: "#536493", color: "#E9EED9" }} // Primary color for button, secondary for text
        >
          Assign User
        </button>
        <button
          type="button"
          onClick={handleOpenViewUsers}
          className="flex items-center justify-center h-12 px-6 mt-4 text-sm font-semibold rounded"
          style={{
            backgroundColor: "#536493",
            color: "#E9EED9",
            marginTop: "16px",
          }} // Primary color for button, secondary for text
        >
          View Users List
        </button>
      </form>

      {/* View Users Dialog */}
      <Dialog
        open={openViewUsers}
        onClose={handleCloseViewUsers}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogContent>
          <div className="mb-4">
            <div class="flex items-center justify-center mb-1">
              <div
                className="flex justify-center items-center mb-1"
                style={{ height: "90%" }}
              >
                {" "}
                {/* Ensures full height centering */}
                <span
                  style={{ color: "#074173" }}
                  className="text-xl sm:text-2xl font-bold"
                >
                  Assigned Users List
                </span>
              </div>
            </div>
            <div>
              <p className="text-1xl font-bold text-red">
                <i>Total Mobile Users: {users.length}</i>
              </p>
            </div>
          </div>
          <table className="min-w-full text-xs text-center">
            <thead
              style={{ backgroundColor: "#508C9B" }}
              className="dark:bg-gray-300"
            >
              <tr>
                <th
                  style={{
                    color: "white",
                    fontSize: "15px",
                    borderTopLeftRadius: "7px",
                  }}
                  className="p-3"
                >
                  Username
                </th>
                <th
                  style={{ color: "white", fontSize: "15px" }}
                  className="p-3"
                >
                  Password
                </th>
                <th
                  style={{
                    color: "white",
                    fontSize: "15px",
                    borderTopRightRadius: "4px",
                  }}
                  className="p-3"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                >
                  <td
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                    className="p-3"
                  >
                    {user.username}
                  </td>
                  <td className="p-3 flex items-center justify-center">
                    <input
                      type={visiblePasswords[user._id] ? "text" : "password"}
                      value={user.password}
                      readOnly
                      className="password-input"
                      style={{ marginRight: "10px" }} // Adds some space between the input and the icon
                    />
                    <button
                      onClick={() => togglePasswordVisibility(user._id)}
                      className="toggle-password"
                      style={{ background: "none", border: "none" }} // Styles the button to be unobtrusive
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="eye-icon"
                        style={{ width: "24px", height: "24px" }} // Ensures the icon has a consistent size
                      >
                        {visiblePasswords[user._id] ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3 7a9 9 0 100-18 9 9 0 000 18z"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.133.243-2.216.675-3.2M9.9 4.9a9.959 9.959 0 013.1-.9c5.523 0 10 4.477 10 10 0 1.133-.243 2.216-.675 3.2M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        )}
                      </svg>
                    </button>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      type="button"
                      //className="px-4 py-1 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-700 transition-colors"
                      onClick={() => handleOpenUpdateUser(user._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="green"
                        className="size-6"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      //className="px-4 py-1 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-700 transition-colors"
                      onClick={() => deleteUser(user._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="red"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      //className="px-4 py-1 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-700 transition-colors"
                      onClick={() => handleOpenSendEmail(user._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="blue"
                        className="size-6"
                      >
                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
      </Dialog>

      {/* Send Email Dialog */}
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
            className="flex flex-col w-full max-w-md p-8 rounded shadow-lg dark:text-gray-800 bg-white dark:bg-gray-700"
          >
            <label
              htmlFor="emailAddress"
              className="self-start text-xs font-semibold text-black"
            >
              Email Address
            </label>
            <input
              id="emailAddress"
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
              className="flex items-center h-12 px-4 mt-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-violet-600"
            />
            <button
              type="submit"
              className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded bg-violet-600 text-gray-50 hover:bg-violet-700 transition-colors"
            >
              Send Email
            </button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Update User Dialog */}
      <Dialog
        open={openUpdateUser}
        onClose={handleCloseUpdateUser}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogContent>
          {selectedUser && (
            <UpdateUser
              selectedUser={selectedUser}
              onUpdate={handleUpdateUserInState}
              onClose={handleCloseUpdateUser}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserForm;
