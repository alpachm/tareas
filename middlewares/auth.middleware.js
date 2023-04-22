const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { promisify } = require('util');

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in. Please login to get access', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'available',
    },
  });

  if (!user)
    next(new AppError('The owner of this token it not longer available', 401));

  req.sessionUser = user;

  next();
});

exports.protectAccountEmployee = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  if (sessionUser.role !== 'employee')
    next(new AppError(`This site is unique for employee`, 401));

  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { sessionUser, user } = req;

  if (sessionUser.id !== user.id)
    next(
      new AppError(`You're not owner of this account, you can't update it`, 401)
    );

  next();
});
