const jwt = require('jsonwebtoken');
require('dotenv').config();

const userModel = require('../models/userModel');

const SECRET = process.env.SECRET

const HTTP_UNATUTHORIZED_STATUS = 401;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token === undefined) return res.status(HTTP_UNATUTHORIZED_STATUS).json({ message: 'missing auth token' });

  let id;
  try {
    // eslint-disable-next-line no-unused-vars
    const  { iat: _, ...userPayload } = jwt.verify(token, SECRET);
    id = userPayload._id;
    // payload = userPayload;
  } catch (error) {
    return res.status(HTTP_UNATUTHORIZED_STATUS).json({ message: error });
  }

  
  const { name, email, role } = await userModel.getById(id);
  req.user = { name, email, role };
  req.userId = id;
  
  next();
};