const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createCpt = {
  body: Joi.object().keys({
      CPTCodes: Joi.string().required(),
      Code: Joi.string().required(),
      
  }),
};

const getCpts = {
  query: Joi.object().keys({
    // name: Joi.string(),
    // role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCptsByCode = {
  query: Joi.object().keys({
    // name: Joi.string(),
    // role: Joi.string(),
    // sortBy: Joi.string(),
    // limit: Joi.number().integer(),
    // page: Joi.number().integer(),
  }),
};

const getCpt = {
    params: Joi.object().keys({
      cptId: Joi.string().custom(objectId),
    }),
  };

const updateCpt = {
  params: Joi.object().keys({
    cptId: Joi.required().custom(objectId),
  }),
//   body: Joi.object()
//     .keys({
//       email: Joi.string().email(),
//       password: Joi.string().custom(password),
//       name: Joi.string(),
//     })
//     .min(1),
};

const deleteCpt = {
  params: Joi.object().keys({
    cptId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCpt,
  getCpts,
  getCptsByCode,
  getCpt,
  updateCpt,
  deleteCpt,
};
