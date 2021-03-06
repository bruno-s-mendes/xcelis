const loginService = require('../services/loginService');

const HTTP_ERROR_STATUS = 400;
const HTTP_OK_STATUS = 200;

const login = async (req, res) => {
  try {
    const user = req.user;
    const response = await loginService.login(user);
    return res.status(HTTP_OK_STATUS).json(response);
  } catch (error) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: error,
  });
  }
}

const user = async (req, res) => {
  try {
    const user = req.user;
    const id = req.userId;
    return res.status(HTTP_OK_STATUS).json({...user, id});
  } catch (error) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: error,
  });
  }
}

module.exports = {
  login,
  user,
}