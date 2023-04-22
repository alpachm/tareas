const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/user.model');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'All users was been found',
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role,
  });

  res.status(201).json({
    status: 'success',
    message: 'User has been created',
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
