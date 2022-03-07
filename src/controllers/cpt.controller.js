const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cptService } = require('../services');
const path = require('path'); 


const createCpt = catchAsync(async (req, res) => {
  const cptServ = await cptService.createCpt(req.body);
  res.status(httpStatus.CREATED).send(cptServ);
});

const getCpts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await cptService.queryCpts(filter, options);
  res.send(result);
});

const getCpt = catchAsync(async (req, res) => {
  const cpt = await cptService.getCptById(req.params.cptId);
  if (!cpt) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cpt not found');
  }
  res.send(cpt);
});

const getCptsByCode = catchAsync(async (req, res) => {

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const filter = { Code: { $regex: req.params.code, $options: 'i'}}
  const cpt = await cptService.getCptsByCode(filter, options);
  if (!cpt) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cpt not found');
  }
  res.send(cpt);
});


const updateCpt = catchAsync(async (req, res) => {
  const cas = await cptService.updateCptById(req.params.cptId, req.body);
  res.send(cas);
});

const deleteCpt = catchAsync(async (req, res) => {
  await cptService.deleteCptById(req.params.cptId);
  res.status(httpStatus.NO_CONTENT).send();
});



module.exports = {
  createCpt,
  getCpts,
  getCpt,
  getCptsByCode,
  updateCpt,
  deleteCpt,
};
