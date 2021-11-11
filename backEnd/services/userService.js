const userModel = require('../models/userModel');

const getUsers = async () => {
  const response = await userModel.getAll();

  return response;
}

const insertUser = async ({ name, birth, phone, cell, email, password, role }) => { 
  const response = await userModel.create({ name, birth, phone, cell, email, password, role });

  return response;
};

const removeUser = async (id) => {
  const response = await userModel.deleteById(id);

  return response;
}

const updatePath = async (id, photoPath) => { 
  const response = await userModel.addPathById(id, photoPath);

  return response;
};

module.exports = {
  getUsers,
  insertUser,
  removeUser,
  updatePath,
};
