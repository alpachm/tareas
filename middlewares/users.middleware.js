const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/user.model');

exports.validIfUserExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) next(new AppError('User not found', 404));

  req.user = user;

  next();
});
