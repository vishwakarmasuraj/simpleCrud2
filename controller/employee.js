const Employee = require('../models/employee')
const bcrypt = require('bcrypt')
const { successHandler, errorHandler } = require('../helper/responseHandler')
const constants = require('../constant/allConstants')

const employeeAdd = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, constants.ROUND)
        const employee = await new Employee(req.body)
        await employee.save()
        successHandler(res, constants.EMP_CREATE_MSG)
    } catch (error) {
        return errorHandler(res, error)
    }
}

const getEmployee = async (req, res) => {
    try {
        const result = await Employee.find({})
        successHandler(res, constants.EMP_GET_MSG, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

const updateEmployee = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Employee.findByIdAndUpdate({ _id: id }, { $set: req.body }).select('-password')
        successHandler(res, constants.EMP_UPDATE_MSG, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

const deleteEmploye = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Employee.findByIdAndRemove({ _id: id })
        successHandler(res, constants.EMP_DEL_MSG)
    } catch (error) {
        return errorHandler(res, error)
    }
}

module.exports = { employeeAdd, getEmployee, updateEmployee, deleteEmploye }