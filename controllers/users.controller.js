const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
    attributes: ['id', 'name', 'email', 'role'],
  });

  res.status(200).json({
    status: 'success',
    message: 'All users was been found',
    users,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'User has been created',
    user,
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) next(new AppError('The user not found', 404));

  if (!(await bcrypt.compare(password, user.password)))
    next(new AppError('Incorrectly email or password', 401));

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    message: 'Login successfull',
    token,
  });
});

exports.getOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    message: 'User was found',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
  });

  res.status(200).json({
    status: 'success',
    message: 'User has been updated',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({
    status: 'disabled',
  });

  res.status(200).json({
    status: 'success',
    message: 'User has been disabled',
  });
});
