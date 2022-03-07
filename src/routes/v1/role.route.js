const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const roleValidation = require('../../validations/role.validation');
const roleController = require('../../controllers/role.controller');

const router = express.Router();

// router
//   .route('/')
//   .post(auth('createRole'), validate(roleValidation.createRole), roleController.createRole)
//   .get(auth('getRoles'), validate(roleValidation.getRoles), roleController.getRoles);

router
  .route('/:roleId')
  .post(auth('createRole'), validate(roleValidation.createRole), roleController.createRole)
  .get(auth('getRoles'), validate(roleValidation.getRoles), roleController.getRoles)
  .get(auth('getRoleById'), validate(roleValidation.getRoleById), roleController.getRoleById)
  .patch(auth('updateRole'), validate(roleValidation.updateRole), roleController.updateRole)
  .delete(auth('deleteRole'), validate(roleValidation.deleteRole), roleController.deleteRole);

module.exports = router;