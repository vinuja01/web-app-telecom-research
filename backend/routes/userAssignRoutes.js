const express = require("express");
const router = express.Router();
const userAssignController = require("../controllers/userAssignController");

router.post("/user-assigns", userAssignController.createUserAssign);
router.get("/user-assigns", userAssignController.getAllUserAssigns);
router.put("/user-assigns/:id", userAssignController.updateUserAssign);
router.delete("/user-assigns/:id", userAssignController.deleteUserAssign);

router.post("/send-email", userAssignController.sendUserCredentials);

module.exports = router;
