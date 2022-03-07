const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const cptValidation = require('../../validations/cpt.validation');
const cptController = require('../../controllers/cpt.controller');

const router = express.Router();

  router
  .route('/createCpt')
  .post(auth('/createCpt'), validate(cptValidation.createCpt), cptController.createCpt);
  router
  .route('/getCpts')
  .get(auth('/getCpts'), validate(cptValidation.getCpts), cptController.getCpts);
  router
  .route('/getCptsByCode/:code')
  .get(auth('/getCptsByCode'), validate(cptValidation.getCptsByCode), cptController.getCptsByCode);
  router
  .route('/getCptById/:cptId')
  .get(auth('/getCptById'), validate(cptValidation.getCpt), cptController.getCpt);
  router
  .route('/updateCpt/:cptId')
  .patch(auth('/updateCpt'), validate(cptValidation.updateCpt), cptController.updateCpt);
  router
  .route('/deleteCpt/:cptId')
  .delete(auth('/deleteCpt'), validate(cptValidation.deleteCpt), cptController.deleteCpt);

module.exports = router;