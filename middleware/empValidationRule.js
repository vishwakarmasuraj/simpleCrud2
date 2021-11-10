const { body } = require('express-validator')
const Employee = require('../models/employee')

const employeeValidationRule = () => {
    return [
        body('title').notEmpty(),
        body('name').notEmpty()
            .custom(value => {
                return Employee.findOne({ name: value }).then(user => {
                    if (user) {
                        return Promise.reject('Name is already exist')
                    }
                })
            }),
        body('lastName').notEmpty(),
        body('email').notEmpty()
            .custom(value => {
                return Employee.findOne({ email: value }).then(user => {
                    if (user) {
                        return Promise.reject('Email is already exist')
                    }
                })
            }),
        body('password').notEmpty().isLength({ min: 6 }),
        body('companyName').notEmpty(),
        body('designation').notEmpty(),
        body('address').notEmpty(),
        body('mobile').notEmpty()
            .custom(value => {
                return Employee.findOne({ mobile: value }).then(user => {
                    if (user) {
                        return Promise.reject('Mobile number is already exist')
                    }
                })
            }),
        body('status').notEmpty()
    ]
}

module.exports = { employeeValidationRule }