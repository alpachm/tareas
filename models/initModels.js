const User = require('../models/user.model');
const Repair = require('../models/repair.model');

const initModel = () => {
  User.hasMany(Repair);
  Repair.belongsTo(User);
};

module.exports = initModel;
