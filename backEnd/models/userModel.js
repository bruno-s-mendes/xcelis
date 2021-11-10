const { ObjectId } = require('bson');
const  { connection } = require('./connection');

const COLLECTION = 'users';

const getAll = async () => {
  const collection = await connection()
  .then((db) => db.collection(COLLECTION));

  const response = await collection.find().toArray();

  return response;
};

const create = async ({ name, birth, phone, cell, email, photoPath, password, role }) => {
  const collection = await connection()
    .then((db) => db.collection(COLLECTION));

  const { insertedId: id } = await collection
    .insertOne({ name, birth, phone, cell, email, photoPath, password, role });

  return {
    name,
    email,
    role,
    id,
  };
};

const getByEmail = async (email) => {
  const collection = await connection()
  .then((db) => db.collection(COLLECTION));

  const response = await collection.findOne({ email });

  return response;
};

const deleteById = async (id) => {
  const collection = await connection()
  .then((db) => db.collection(COLLECTION));

  const response = await collection.deleteOne({ _id: new ObjectId(id) });

  return response;
};

module.exports = {
  getAll,
  create,
  getByEmail,
  deleteById,
};