const express = require("express");
const router = express.Router();
const dataController = require("./../expressData/controller/students");

router.get("/", dataController.getAllData);
router.post("/", dataController.createData);
router.get("/:id", dataController.getDataById);
router.get("/:email", dataController.getDataByEmail);
router.put("/:id", dataController.updateData);
router.delete("/:id", dataController.deleteData);
module.exports = router;
