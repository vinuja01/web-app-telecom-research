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

//bar chart get hours by location
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
      { $sort: { _id: 1 } }, // Sorting by siteLocation
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
          totalVisits: { $sum: 1 }, // Increment by one for each document
        },
      },
      { $sort: { _id: 1 } }, // Sorting by siteLocation
    ]);
    res.json(visitsByLocation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a specific task by index for an employee
exports.deleteTaskByIndex = async (req, res) => {
  try {
    const { employeeId, taskIndex } = req.params;
    const result = await Employee.updateOne(
      { employeeId: employeeId },
      { $unset: { [`tasksDone.${taskIndex}`]: 1 } } // Unset the task at the specified index
    );
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or already deleted." });
    }
    // Clean up the array after removing the element
    await Employee.updateOne(
      { employeeId: employeeId },
      { $pull: { tasksDone: null } }
    );
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
