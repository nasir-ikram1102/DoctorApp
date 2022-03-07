const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createIcd = {
  body: Joi.object().keys({
      Code: Joi.string().required(),
      ShortDescription: Joi.string().required(),
      
  }),
};

const getIcds = {
  query: Joi.object().keys({
    // name: Joi.string(),
    // role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getIcdsByCode = {
  query: Joi.object().keys({
    // name: Joi.string(),
    // role: Joi.string(),
    // sortBy: Joi.string(),
    // limit: Joi.number().integer(),
    // page: Joi.number().integer(),
  }),
};

const getIcd = {
    params: Joi.object().keys({
      icdId: Joi.string().custom(objectId),
    }),
  };

const updateIcd = {
  params: Joi.object().keys({
    icdId: Joi.required().custom(objectId),
  }),
//   body: Joi.object()
//     .keys({
//       email: Joi.string().email(),
//       password: Joi.string().custom(password),
//       name: Joi.string(),
//     })
//     .min(1),
};

const deleteIcd = {
  params: Joi.object().keys({
    icdId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createIcd,
  getIcds,
  getIcd,
  getIcdsByCode,
  updateIcd,
  deleteIcd,
};
