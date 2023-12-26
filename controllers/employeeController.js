const employeeDB = {
    employee: require("../models/data.json"),
    setEmployee: function(data){ this.employee = data}
} 

const getAllEmployee = (req, res) => {
  res.status(200).json(employeeDB.employee);
};

const getEmployee = (req, res) => {
    const employee = employeeDB.employee.find(emp => emp.id === parseInt(req.params.id))
  res.status(200).json(employee);
};

const createNewEmployee = (req, res)=>{
    const newEmployee = {
        id: employeeDB.employee.length + 1 || 1,
        name: req.body.name,
    }
    if(!newEmployee.name){
        return res.status(400).json({message: 'first and last name required'})
    }

    employeeDB.setEmployee([...employeeDB.employee, newEmployee])
    res.status(201).json(employeeDB.employee)
}

const updateEmployee = (req, res)=>{
    res.status(200).json()
}

const deletEmployee = (req, res)=>{
    res.status(200).json()
}

module.exports = { getAllEmployee, getEmployee, createNewEmployee, updateEmployee, deletEmployee };
