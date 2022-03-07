const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const caseValidation = require('../../validations/case.validation');
const caseController = require('../../controllers/case.controller');

const router = express.Router();

//router
// .route('/')

//   .post(auth('createRole'), validate(roleValidation.createRole), roleController.createRole)
//   .get(auth('getRoles'), validate(roleValidation.getRoles), roleController.getRoles);
//router('cases/:id').get(auth('getCaseById'), validate(caseValidation.getCase), caseController.getCase);


router.route('/uploadFile')
  .post(auth('uploadFile'), caseController.uploadFile);

router.route('/createCase')
  .post(auth('createCase'), validate(caseValidation.createCase), caseController.createCase);

router.route('/getCases')
  .post(auth('getCases'), validate(caseValidation.getCases), caseController.getCases);

router.route('/exportCasesInExcel')
  .post(auth('exportCasesInExcel'), caseController.ExportCasesInExcel);

router.route('/exportCasesInPdf')
  .post(auth('exportCasesInPdf'), caseController.ExportCasesInPdf);
// router
// .route('/ExportPDF')
// .get(auth('/ExportPDF'), caseController.exportPDF);

router.route('/getCasePrebindData')
  .get(auth('getCasePrebindData'), validate(caseValidation.getCasePrebindData), caseController.getCasePrebindData);

router.route('/getCaseById/:caseId')
  .get(auth('getCaseById'), validate(caseValidation.getCase), caseController.getCase);

router.route('/updateCase/:caseId')
  .patch(auth('updateCase'), validate(caseValidation.updateCase), caseController.updateCase);

router.route('/deleteCase/:caseId')
  .delete(auth('deleteCase'), validate(caseValidation.deleteCase), caseController.deleteCase);

module.exports = router;