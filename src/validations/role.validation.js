const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createRole = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    isActive : Joi.string(),
  }),
};

const getRoles = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRoleById = {
  params: Joi.object().keys({
    roleId: Joi.string().custom(objectId),
  }),
};

const updateRole = {
  params: Joi.object().keys({
    roleId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        name: Joi.string().required()
    })
    .min(1),
};

const deleteRole = {
  params: Joi.object().keys({
    roleId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
