const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const icdValidation = require('../../validations/icd.validation');
const icdController = require('../../controllers/icd.controller');

const router = express.Router();

  router
  .route('/createIcd')
  .post(auth('/createIcd'), validate(icdValidation.createIcd), icdController.createIcd);
  router
  .route('/getIcds')
  .get(auth('/getIcds'), validate(icdValidation.getIcds), icdController.getIcds);
  router
  .route('/getIcdById/:icdId')
  .get(auth('/getIcdById'), validate(icdValidation.getIcd), icdController.getIcd);
  router
  .route('/getIcdsByCode/:code')
  .get(auth('/getIcdsByCode'), validate(icdValidation.getIcdsByCode), icdController.getIcdsByCode);
  router
  .route('/updateIcd/:icdId')
  .patch(auth('/updateIcd'), validate(icdValidation.updateIcd), icdController.updateIcd);
  router
  .route('/deleteIcd/:icdId')
  .delete(auth('/deleteIcd'), validate(icdValidation.deleteIcd), icdController.deleteIcd);

module.exports = router;