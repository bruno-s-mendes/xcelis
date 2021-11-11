const { ObjectId } = require('bson');
const userModel = require('../models/userModel');

const HTTP_ERROR_STATUS = 400;

module.exports = async (req, res, next) => {
  const { id } = req.params;

  const validateId = ObjectId.isValid(id);
  if(!validateId) {
    return res.status(HTTP_ERROR_STATUS).json({ message: 'Invalid ID' });
  }

  const userExist = userModel.getById(id);
  if(!userExist) {
    return res.status(HTTP_ERROR_STATUS).json({ message: 'User dont exists' });
  }

  next();
};