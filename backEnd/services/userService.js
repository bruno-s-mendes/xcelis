const { ObjectId } = require('bson');
const userModel = require('../models/userModel');

const userValidation = require('../schemas/userValidation');

const getUsers = async () => {
  const response = await userModel.getAll();
  return response;
}

const insertUser = async ({ name, birth, phone, cell, email, photoPath, password, role }) => {
  const validations = userValidation.validate({ name, birth, phone, cell, email, password, role });
  
  if(validations.error) {
    return({ code: 400, message: validations.error.details })
  }  

  const alreadyExists = await userModel.getByEmail(email);

  if (alreadyExists) return ({ code: 409, message: 'Email already registered' });
  
  const response = await userModel.create({ name, birth, phone, cell, email, photoPath, password, role });
  return response;
};

const removeUser = async (id) => {
  const validateId = ObjectId.isValid(id);

  if(!validateId) {
    return({ code: 400, message: 'Invalid ID' })
  }

  const response = await userModel.deleteById(id);
  return response;
}

module.exports = {
  getUsers,
  insertUser,
  removeUser,
};
