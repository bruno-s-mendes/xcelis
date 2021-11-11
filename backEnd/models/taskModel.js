const { ObjectId } = require('bson');
const  { connection } = require('./connection');

const COLLECTION = 'task';

const create = async ({ userId, managerId, content, deadline, status }) => {
  const collection = await connection()
    .then((db) => db.collection(COLLECTION));

  const { insertedId: id } = await collection
    .insertOne({ userId, managerId, content, deadline, status });

  return {
    userId,
    managerId,
    content,
    deadline,
    status,
    id,
  };
};

const getAllByUserId = async (userId) => {
  const collection = await connection()
  .then((db) => db.collection(COLLECTION));

  const response = await collection.find({ userId }).toArray();

  return response;
};

const getAllBymanagerId = async (managerId) => {
  const collection = await connection()
  .then((db) => db.collection(COLLECTION));

  const response = await collection.find({ managerId }).toArray();

  return response;
};

const getById = async (id) => {
  const collection = await connection()
  .then((db) => db.collection(COLLECTION));

  const response = await collection.findOne({ _id: new ObjectId(id) });

  return response;
};

const deleteById = async (id) => {
  const collection = await connection()
  .then((db) => db.collection(COLLECTION));

  const response = await collection.deleteOne({ _id: new ObjectId(id) });

  return response;
};

const updateStatusById = async (id, status) => {
  const collection = await connection()
  .then((db) => db.collection(COLLECTION));

  const response = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status } },
  );

  return response;
};

module.exports = {
  create,
  getAllByUserId,
  getAllBymanagerId,
  getById,
  deleteById,
  updateStatusById,
};