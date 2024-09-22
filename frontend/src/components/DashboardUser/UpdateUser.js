// UpdateUser.jsx
import React, { useState, useEffect } from "react";

const UpdateUser = ({ selectedUser, onUpdate, onClose }) => {
  const [username, setUsername] = useState(selectedUser.username);
  const [password, setPassword] = useState(selectedUser.password);

  useEffect(() => {
    setUsername(selectedUser.username);
    setPassword(selectedUser.password);
  }, [selectedUser]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedData = { username, password };

    try {
      const response = await fetch(
        `http://localhost:5000/assignuser/user-assigns/${selectedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        onUpdate(updatedUser);
        alert("User updated successfully.");
        onClose();
      } else {
        const errorData = await response.json();
        alert("Error updating user: " + errorData.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <form
      noValidate=""
      onSubmit={handleUpdate}
      className="flex flex-col w-full max-w-md p-8 rounded shadow-lg dark:text-gray-800 bg-white dark:bg-gray-700"
    >
      <label
        htmlFor="updateUsername"
        className="self-start text-xs font-semibold text-black"
      >
        Username
      </label>
      <input
        id="updateUsername"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="flex items-center h-12 px-4 mt-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-violet-600"
      />
      <label
        htmlFor="updatePassword"
        className="self-start mt-3 text-xs font-semibold text-black"
      >
        Password
      </label>
      <input
        id="updatePassword"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="flex items-center h-12 px-4 mt-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-violet-600"
      />
      <button
        type="submit"
        className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded bg-violet-600 text-gray-50 hover:bg-violet-700 transition-colors"
      >
        Update User
      </button>
    </form>
  );
};

export default UpdateUser;
