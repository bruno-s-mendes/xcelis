const taskModel = require('../models/taskModel');
const userModel = require('../models/userModel');

const getTasks = async (user, userId) => {
  let response;
  if (user.role === 'admin') {
    response = await taskModel.getAllBymanagerId(userId);
    return response;
  } 
  response = await taskModel.getAllByUserId(userId);
  return response;
}

const insertTask = async ({ userId, managerId, content, deadline }) => {
  const status = 'pending'

  const userExists = await userModel.getById(userId);

  if (!userExists) throw new Error("user dont exists");

  const response = await taskModel.create({ userId, managerId, content, deadline, status });

  return response;
};

const updateStatus = async (id, userId, status) => {
  const task = await taskModel.getById(id);

  if (task.userId !== userId) throw new Error ("you can only edit your tasks");
  
  const response = await taskModel.updateStatusById(id, status);

  return response;
};

const removeTask = async (id, managerId) => {
  const task = await taskModel.getById(id);

  if (task.managerId !== managerId) throw new Error("Only the manager can delete tasks");

  const response = await userModel.deleteById(id);

  return response;
}

module.exports = {
  getTasks,
  insertTask,
  updateStatus,
  removeTask,
};