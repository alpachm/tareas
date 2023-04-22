const express = require('express');
const usersController = require('../controllers/users.controller');
const usersMiddleware = require('../middlewares/users.middleware');
const validation = require('../middlewares/validations.middleware');

const router = express.Router();

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(validation.createUserValidation, usersController.createUser);

router
  .route('/:id')
  .get(usersMiddleware.validIfUserExist, usersController.getOneUser)
  .patch(usersMiddleware.validIfUserExist, usersController.updateUser)
  .delete(usersMiddleware.validIfUserExist, usersController.deleteUser);

module.exports = router;
