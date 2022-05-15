//? STATE THE LOGIC FOR ROUTE HANDLERS HERE

const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  res.json({
    id: req.params.id,
  });
};

const createEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: res.body.firstname,
    lastname: res.body.lastname,
  };
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res.status(400).json({
      message: "Full name is required to register an employee",
    });
  }
  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

/**
 * It takes the employee object from the data.employees array that matches the id in the request body,
 * updates the firstname and lastname properties of that object, filters out the updated object from
 * the data.employees array, adds the updated object back to the filtered array, and then sorts the array by
 * id.
 * @param req - request object
 * @param res - The response object.
 * @returns The updated employee object.
 */
const updateEmployee = (req, res) => {
  //* filtered arr ma nabhaye pani yo variable ma stored huncha updateEmployee ko details
  const updatedEmployee = data.employees.find(
    (employee) => employee.id === parseInt(req.body.id)
  );
  if (!updatedEmployee) {
    return res.status(400).json({
      message: `Employee ID ${req.body.id} was not found!`,
    });
  }
  if (req.body.firstname) {
    updatedEmployee.firstname = req.body.firstname;
  }
  if (req.body.lastname) {
    updatedEmployee.lastname = req.body.lastname;
  }
  const filteredArr = data.employees.filter(
    (employee) => employee.id !== parseInt(res.body.id)
  );
  const unsortedArr = [...filteredArr, updatedEmployee];
  data.setEmployees(
    unsortedArr.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  return res.json(data.employees);
};

/**
 * It takes the id of the employee to be deleted from the request body, finds the employee with that
 * id, deletes it from the array of employees, and returns the updated array of employees.
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 * @returns the data.employees array.
 */
const deleteEmployee = (req, res) => {
  const deletedEmployee = data.employees.find(
    (employee) => employee.id === parseInt(res.body.id)
  );
  if (!deletedEmployee) {
    return res.status(400).json({
      message: `Employee ID ${res.body.id} not found!`,
    });
  }
  const filterArr = data.employees.filter(
    (employee) => employee.id !== parseInt(res.body.id)
  );
  data.setEmployees([...filterArr]);
  res.josn(data.employees);
};

module.exports = {
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  createEmployee,
};
