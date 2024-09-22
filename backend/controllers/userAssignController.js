const UserAssign = require("../models/UserAssign");
const transporter = require("../config/emailconfig");

// Create a new user assignee
exports.createUserAssign = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await UserAssign.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // If user does not exist, create a new one
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

// Send user credentials via email
exports.sendUserCredentials = async (req, res) => {
  const { email, user } = req.body;

  if (!email || !user || !user.username || !user.password) {
    return res.status(400).json({ message: "Invalid request data." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your User Credentials",
    text: `Hello,

Here are your assigned credentials:

Username: ${user.username}
Password: ${user.password}

Please keep this information secure.

Best regards,
Your Company`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
};
