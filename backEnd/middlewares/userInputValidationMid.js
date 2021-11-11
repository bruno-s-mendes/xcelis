const userModel = require('../models/userModel');
const userValidation = require('../schemas/userValidation');

const HTTP_ERROR_STATUS = 400;
const HTTP_ALREADY_EXISTS_STATUS = 409;

module.exports = async (req, res, next) => {
  const { name, birth, phone, cell, email, password, role } = req.body;

  const validations = userValidation.validate({ name, birth, phone, cell, email, password, role });
  
  if(validations.error) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: validations.error.details,
  });
  }  

  const alreadyExists = await userModel.getByEmail(email);

  if (alreadyExists) return res.status(HTTP_ALREADY_EXISTS_STATUS).json({ message: 'Email already registered' });

  next();
};