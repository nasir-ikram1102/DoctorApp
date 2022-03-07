const httpStatus = require('http-status');
const { Icd } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a ICD
 * @param {Object} icdBody
 * @returns {Promise<ICD>}
 */
const createIcd = async (icdBody) => {
  const icd = await Icd.find();
  return icd;
};

/**
 * Query for icds
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryIcds = async (filter, options) => {
  const icds = await Icd.paginate(filter, options);
  //const icds = await Icd.find();
  return icds;
};

const getIcdsByCode = async (filter, options) => {
  return Icd.paginate(filter, options);
};

/**
 * Get icd by id
 * @param {ObjectId} id
 * @returns {Promise<ICD>}
 */
const getIcdById = async (id) => {
  return Icd.findById(id);
};


/**
 * Update icd by id
 * @param {ObjectId} ICD
 * @param {Object} updateBody
 * @returns {Promise<ICD>}
 */
const updateIcdById = async (icdId, updateBody) => {
  const icd = await getIcdById(icdId);
  if (!icd) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Icd not found');
  }
  
  Object.assign(icd, updateBody);
  await icd.save();
  return icd;
};

/**
 * Delete icd by id
 * @param {ObjectId} icdId
 * @returns {Promise<ICD>}
 */
const deleteIcdById = async (icdId) => {
  const icd = await getIcdById(icdId);
  if (!icd) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Icd not found');
  }
  await icd.remove();
  return icd;
};

module.exports = {
  createIcd,
  queryIcds,
  getIcdsByCode,
  getIcdById,
  updateIcdById,
  deleteIcdById,
};
