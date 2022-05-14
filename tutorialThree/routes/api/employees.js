const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  createEmployee,
} = require("../../controller/employeesController");
router
  .route("/")
  .get(getAllEmployees)
  .post(createEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

router.route("/:id").get(getEmployee);
module.exports = router;
