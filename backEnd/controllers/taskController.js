const taskService = require('../services/taskService');

const HTTP_ERROR_STATUS = 400;
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

const getTask = async (req, res) => {
  const user = req.user;
  const userId = req.userId
  try {
    const response = await taskService.getTasks(user, userId);
    return res.status(HTTP_OK_STATUS).json({ tasks: response });
  } catch (error) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: error,
    });
  }
}

const insertTask = async (req, res) => {
  const managerId = req.userId
  const { userId, content, deadline } = req.body;

  try {
    const response = await taskService.insertTask({ userId, managerId, content, deadline });
    return res.status(HTTP_CREATED_STATUS).json(response);
  } catch (error) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: error,
  });
  }
}

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body
  const userId = req.userId;

  try {
    const response = await taskService.updateStatus(id, userId, status);
    return res.status(HTTP_OK_STATUS).json(response );
  } catch (error) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: error,
  });
  }
}

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const managerId = req.userId;

  try {
    const response = await taskService.removeTask(id, managerId);
    return res.status(HTTP_OK_STATUS).json(response);
  } catch (error) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: error,
  });
  }
}

module.exports = {
  getTask,
  insertTask,
  updateStatus,
  deleteTask,
};