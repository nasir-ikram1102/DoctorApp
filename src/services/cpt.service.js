const httpStatus = require('http-status');
const { Cpt } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a case
 * @param {Object} caseBody
 * @returns {Promise<Case>}
 */
const createCpt = async (cptBody) => {
  
  const cpt = await Cpt.create(cptBody);
  return cpt;
};

/**
 * Query for cases
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCpts = async (filter, options) => {
  const cpts = await Cpt.paginate(filter, options);
  //const cpts = await Cpt.find();
  return cpts;
};

/**
 * Get case by id
 * @param {ObjectId} id
 * @returns {Promise<Case>}
 */
const getCptById = async (id) => {
  return Cpt.findById(id);
};


const getCptsByCode = async (filter, options) => {
  return Cpt.paginate(filter, options);
};

/**
 * Update case by id
 * @param {ObjectId} caseId
 * @param {Object} updateBody
 * @returns {Promise<Case>}
 */
const updateCptById = async (cptId, updateBody) => {
  const cpt = await getCptById(cptId);
  if (!cpt) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cpt not found');
  }
  
  Object.assign(cpt, updateBody);
  await cpt.save();
  return cpt;
};

/**
 * Delete case by id
 * @param {ObjectId} caseId
 * @returns {Promise<Case>}
 */
const deleteCptById = async (cptId) => {
  const cpt = await getCptById(cptId);
  if (!cpt) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cpt not found');
  }
  await cpt.remove();
  return cpt;
};

module.exports = {
  createCpt,
  queryCpts,
  getCptById,
  getCptsByCode,
  updateCptById,
  deleteCptById,
};
