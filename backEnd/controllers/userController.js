const userService = require('../services/userService');
const path = require('path');

const HTTP_ERROR_STATUS = 400;
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

const getUsers = async (_req, res) => {
  try {
    const response = await userService.getUsers();
    return res.status(HTTP_OK_STATUS).json({ user: response });
  } catch (error) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: error,
  });
  }
}

const insertUser = async (req, res) => {
  try {
    const { name, birth, phone, cell, email, password, role } = req.body;
    const response = await userService.insertUser({ name, birth, phone, cell, email, password, role });
    return res.status(HTTP_CREATED_STATUS).json(response);
  } catch (error) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: error,
  });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userService.removeUser(id);
    return res.status(HTTP_OK_STATUS).json(response );
  } catch (error) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: error,
  });
  }
}

const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const photoPath = path.join(__dirname, '..', `uploads/${id}.jpeg`)
    const response = await userService.updatePath(id, photoPath);
    return res.status(HTTP_OK_STATUS).json(response );
  } catch (error) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: error,
  });
  }
}

module.exports = {
  getUsers,
  insertUser,
  deleteUser,
  uploadImage,
}