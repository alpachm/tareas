const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Repair = require('../models/repair.model');

exports.getAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'All repairs has been found',
  });
});

exports.createRepair = catchAsync(async (req, res, next) => {
  const { date, motorsNumber, description, userId } = req.body;

  const repair = await Repair.create({
    date,
    motorsNumber,
    description,
    userId,
  });

  res.status(200).json({
    status: 'success',
    message: 'Repair has been created',
    repair,
  });
});

exports.getOneRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  res.status(200).json({
    status: 'success',
    message: 'Repair was found',
    repair,
  });
});

exports.updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({
    status: 'completed',
  });

  res.status(200).json({
    status: 'success',
    message: 'Repair has been update to completed',
  });
});

exports.deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({
    status: 'cancelled',
  });

  res.status(200).json({
    status: 'success',
    message: 'Repair has been cancelled',
  });
});
