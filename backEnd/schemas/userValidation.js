const Joi = require('joi');

const schema =  Joi.object({
  name: Joi.string()
    .required(),

  password: Joi.string()
    .required(),

  birth: Joi.date()
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

  phone: Joi.number()
    .required(),

  cell: Joi.number()
    .required(),

  role: Joi.string()
    .required(),
});

const loginSchema =  Joi.object({
  password: Joi.string()
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
});

  const validate = ({ name, birth, phone, cell, email, password, role }) => {
    return schema.validate({
      name,
      birth,
      phone,
      cell,
      email,
      password,
      role
    });
  }

  const validateLogin = ({ email, password }) => {
    return loginSchema.validate({
      email,
      password,
    });
  }

module.exports = {
  validate,
  validateLogin,
}
  