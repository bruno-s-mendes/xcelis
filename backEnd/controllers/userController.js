const userService = require('../services/userService');

const HTTP_ERROR_STATUS = 400;
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

const getUsers = async (_req, res) => {
  const response = await userService.getUsers();

  if (response.code) {
    return res.status(HTTP_ERROR_STATUS).json({
        message: response.message,
    });
}

  return res.status(HTTP_OK_STATUS).json({ user: response });
}

const insertUser = async (req, res) => {
  const { name, birth, phone, cell, email, photoPath, password, role } = req.body;

  const response = await userService.insertUser({ name, birth, phone, cell, email, photoPath, password, role });

  if (response.code) {
    return res.status(HTTP_ERROR_STATUS).json({
        message: response.message,
    });
}

  return res.status(HTTP_CREATED_STATUS).json({ user: response });
}

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const response = await userService.removeUser(id);

  if (response.code) {
    return res.status(HTTP_ERROR_STATUS).json({
        message: response.message,
    });

  }
  return res.status(HTTP_OK_STATUS).json(response);
}

module.exports = {
  getUsers,
  insertUser,
  deleteUser,
}