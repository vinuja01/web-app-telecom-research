// controllers/employeeController.js
const Employee = require("../models/Employee");

//get unique employee list
exports.getUniqueEmployeeList = async (req, res) => {
  try {
    const employees = await Employee.aggregate([
      {
        $group: {
          _id: "$employeeId",
          employeeName: { $first: "$employeeName" },
          designation: { $first: "$designation" },
          siteLocation: { $first: "$siteLocation" },
        },
      },
      { $sort: { employeeName: 1 } },
    ]);
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get all tasks by employee id
exports.getTasksByEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const tasks = await Employee.aggregate([
      { $match: { employeeId: employeeId } },
      { $unwind: "$tasksDone" },
      {
        $project: {
          task: "$tasksDone",
          date: "$arrivalDate",
          siteLocation: "$siteLocation",
        },
      },
    ]);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  const { employeeId } = req.params;
  const { employeeName, designation } = req.body;
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { employeeId: employeeId },
      { employeeName: employeeName, designation: designation },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  const { employeeId } = req.params;
  try {
    const deletedEmployee = await Employee.findOneAndDelete({
      employeeId: employeeId,
    });
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    res.status(200).json({ message: "Employee deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get hours by location
exports.getHoursByLocation = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const hoursByLocation = await Employee.aggregate([
      { $match: { employeeId: employeeId } },
      {
        $group: {
          _id: "$siteLocation",
          totalHours: { $sum: "$hoursSpent" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(hoursByLocation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTotalVisitsByLocation = async (req, res) => {
  try {
    const visitsByLocation = await Employee.aggregate([
      {
        $group: {
          _id: "$siteLocation",
          totalVisits: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(visitsByLocation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a specific task by _id within an employee's document
exports.deleteTaskById = async (req, res) => {
  const { employeeId, siteLocation, taskIndex } = req.params; // taskIndex should be the index of the task in the array

  try {
    // Pull the task at the given index by finding the task by its content, assuming the task content is unique
    const taskToRemove = { $unset: {} }; // Prepare to unset the task index
    taskToRemove.$unset[`tasksDone.${taskIndex}`] = 1; // Unset the specific task

    // Update to unset the specific task index
    const unsetResult = await Employee.updateOne(
      { employeeId, siteLocation },
      taskToRemove
    );

    // After unsetting the task, remove all null items from the tasksDone array
    const pullResult = await Employee.updateOne(
      { employeeId, siteLocation },
      { $pull: { tasksDone: null } }
    );

    if (unsetResult.modifiedCount === 0 || pullResult.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or already deleted." });
    }

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
