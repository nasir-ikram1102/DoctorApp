const httpStatus = require('http-status');
const { Case } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a case
 * @param {Object} caseBody
 * @returns {Promise<Case>}
 */
const createCase = async (caseBody) => {
  
  const cas = await Case.create(caseBody);
  return cas;
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
const queryCases = async (filter, options) => {

  const cases = await Case.paginate(filter, options);
  return cases;
};


const queryCasesWithoutPaging = async (filter, options) => {
  const cases = await Case.find(filter);
  return cases;
};

/**
 * Get case by id
 * @param {ObjectId} id
 * @returns {Promise<Case>}
 */
const getCaseById = async (id) => {
  return Case.findById(id);
};


/**
 * Update case by id
 * @param {ObjectId} caseId
 * @param {Object} updateBody
 * @returns {Promise<Case>}
 */
const updateCaseById = async (caseId, updateBody) => {
  const ccase = await getCaseById(caseId);
  if (!ccase) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Case not found');
  }
  
  Object.assign(ccase, updateBody);
  await ccase.save();
  return ccase;
};

/**
 * Delete case by id
 * @param {ObjectId} caseId
 * @returns {Promise<Case>}
 */
const deleteCaseById = async (caseId) => {
  const cas = await getCaseById(caseId);
  if (!cas) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Case not found');
  }
  await cas.remove();
  return cas;
};

module.exports = {
  createCase,
  queryCases,
  queryCasesWithoutPaging,
  getCaseById,
  updateCaseById,
  deleteCaseById,
};
