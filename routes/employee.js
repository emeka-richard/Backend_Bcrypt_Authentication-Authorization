const express = require("express");
const employeeRouter = express.Router();
const { getEmployee, getAllEmployee, createNewEmployee, updateEmployee, deletEmployee } = require("../controllers/employeeController");

employeeRouter
  .route("/")
  .get(getAllEmployee)
  .post(createNewEmployee)
  .put(updateEmployee)
  .delete(deletEmployee)

employeeRouter.route('/:id').get(getEmployee);

module.exports = employeeRouter;
