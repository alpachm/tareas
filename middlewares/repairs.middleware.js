const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Repair = require('../models/repair.model');

exports.validIfRepairExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) next(new AppError('Repair was not found', 404));

  req.repair = repair;

  next();
});
