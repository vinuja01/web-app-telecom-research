const UserAssign = require("../models/UserAssign");

// Create a new user assignee
exports.createUserAssign = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUserAssign = new UserAssign({ username, password });
    await newUserAssign.save();
    res.status(201).json(newUserAssign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all user assigns
exports.getAllUserAssigns = async (req, res) => {
  try {
    const userAssigns = await UserAssign.find();
    res.status(200).json(userAssigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user assigned
exports.updateUserAssign = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const updatedUserAssign = await UserAssign.findByIdAndUpdate(
      id,
      { username, password },
      { new: true }
    );
    if (!updatedUserAssign) {
      return res.status(404).json({ message: "User assignment not found." });
    }
    res.status(200).json(updatedUserAssign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user assigned
exports.deleteUserAssign = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUserAssign = await UserAssign.findByIdAndDelete(id);
    if (!deletedUserAssign) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(204).json({ message: "User deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
