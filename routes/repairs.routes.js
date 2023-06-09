const express = require('express');
const repairsController = require('../controllers/repairs.controller');
const repairsMiddleware = require('../middlewares/repairs.middleware');
const validation = require('../middlewares/validations.middleware');
const {
  protect,
  protectAccountEmployee,
} = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect, protectAccountEmployee);

router
  .route('/')
  .get(repairsController.getAllRepairs)
  .post(validation.createRepairValidation, repairsController.createRepair);

router
  .route('/:id')
  .get(repairsMiddleware.validIfRepairExist, repairsController.getOneRepair)
  .patch(repairsMiddleware.validIfRepairExist, repairsController.updateRepair)
  .delete(repairsMiddleware.validIfRepairExist, repairsController.deleteRepair);

module.exports = router;
