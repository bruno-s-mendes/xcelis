const userModel = require('../models/userModel');
const userValidation = require('../schemas/userValidation');

const HTTP_ERROR_STATUS = 400;

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  const validations = userValidation.validateLogin({ email, password });
  
  if(validations.error) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: validations.error.details,
  });
  }

  const alreadyExists = await userModel.getByEmail(email);

  if (!alreadyExists) return res.status(HTTP_ERROR_STATUS).json({ message: 'User not registered' });

  if (alreadyExists.password !== password) return res.status(HTTP_ERROR_STATUS).json({ message: 'Invalid Password' });

  req.user = alreadyExists;

  next();
};