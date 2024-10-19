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
            <h5>Total Mobile Users: {users.length}</h5>{" "}
            {/* Display total user count */}
          </div>
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
                  key={user._id}
                  className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                >
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.password}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      type="button"
                      className="px-4 py-1 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-700 transition-colors"
                      onClick={() => handleOpenUpdateUser(user._id)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="px-4 py-1 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-700 transition-colors"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="px-4 py-1 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-700 transition-colors"
                      onClick={() => handleOpenSendEmail(user._id)}
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
