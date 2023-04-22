const express = require('express');
const usersController = require('../controllers/users.controller');
const usersMiddleware = require('../middlewares/users.middleware');
const validation = require('../middlewares/validations.middleware');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/login', validation.loginValidation, usersController.login);

router.use(protect);

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(validation.createUserValidation, usersController.createUser);

router
  .route('/:id')
  .get(usersMiddleware.validIfUserExist, usersController.getOneUser)
  .patch(
    usersMiddleware.validIfUserExist,
    protectAccountOwner,
    usersController.updateUser
  )
  .delete(
    usersMiddleware.validIfUserExist,
    protectAccountOwner,
    usersController.deleteUser
  );

module.exports = router;
