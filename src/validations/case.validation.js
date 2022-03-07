const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createCase = {
  body: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      gender: Joi.string().required(),
      dateOfBirth: Joi.string().required(),
      // medicalRecordNumber : Joi.string(),
      // procedureType: Joi.string(),
      // diagnosis: Joi.string(),
      // institution: Joi.string(),
      // role:Joi.string(),
      // cpt:Joi.string(),
      // procedureLength: Joi.string(),
      // instrumentation:Joi.string(),
      // vendor:Joi.string(),
      // findings:Joi.string(),
      // complications:Joi.string(),
      // outCome:Joi.string(),
      // hospitalization:Joi.string(),
      // followUp:Joi.string(),
      // period:Joi.string(),
      // notes:Joi.string(),
      // createdAt: Joi.string(),
      // fileName : Joi.array()
  }).options({allowUnknown: true}),
};

const getCases = {
  query: Joi.object().keys({
    // name: Joi.string(),
    // role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
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

const getCasePrebindData = {
  query: Joi.object().keys({
    // name: Joi.string(),
    // role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCase = {
  params: Joi.object().keys({
    caseId: Joi.string().custom(objectId),
  }),
};

const updateCase = {
  params: Joi.object().keys({
    caseId: Joi.required().custom(objectId),
  }),
//   body: Joi.object()
//     .keys({
//       email: Joi.string().email(),
//       password: Joi.string().custom(password),
//       name: Joi.string(),
//     })
//     .min(1),
};

const deleteCase = {
  params: Joi.object().keys({
    caseId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCase,
  getCases,
  getCpts,
  getCase,
  updateCase,
  deleteCase,
  getCasePrebindData
};
