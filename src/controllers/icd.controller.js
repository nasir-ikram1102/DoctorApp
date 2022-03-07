const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { icdService } = require('../services');
const path = require('path'); 


const createIcd = catchAsync(async (req, res) => {
  const icdServ = await icdService.createCD(req.body);
  res.status(httpStatus.CREATED).send(icdServ);
});

const getIcds = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await icdService.queryIcds(filter, options);
  res.send(result);
});



const getIcdsByCode = catchAsync(async (req, res) => {

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  //const filter = { Code: { $regex: req.params.code } }
  //const filter = {"Code": new RegExp('.*' + req.params.code + '.*')}
  const filter = { Code: { $regex: req.params.code, $options: 'i'}}
  const icd = await icdService.getIcdsByCode(filter, options);
  if (!icd) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ICD not found');
  }
  res.send(icd);
});

const getIcd = catchAsync(async (req, res) => {
  const icd = await icdService.getIcdById(req.params.icdId);
  if (!icd) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Icd not found');
  }
  res.send(icd);
});

const updateIcd = catchAsync(async (req, res) => {
  const icd = await icdService.updateIcdById(req.params.icdId, req.body);
  res.send(icd);
});

const deleteIcd = catchAsync(async (req, res) => {
  await icdService.deleteIcdById(req.params.icdId);
  res.status(httpStatus.NO_CONTENT).send();
});



module.exports = {
  createIcd,
  getIcds,
  getIcdsByCode,
  getIcd,
  updateIcd,
  deleteIcd,
};
