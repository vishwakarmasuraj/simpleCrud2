const express = require('express')
const router = express.Router()

const empValidateRule = require('../middleware/empValidationRule')
const empValid = require('../middleware/valid')

const empController = require('../controller/employee')

/**
 * 
 */
router.post('/emp-create', empValidateRule.employeeValidationRule(), empValid.validate, empController.employeeAdd)

/**
 * 
 */
router.get('/emp-get', empController.getEmployee)

/**
 * 
 */

router.put('/emp-update/:id', empController.updateEmployee)

/**
 * 
 */

router.delete('/emp-delete/:id', empController.deleteEmploye)



module.exports = router
