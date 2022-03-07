const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { string } = require('joi');
const caseSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
      trim: true,
    },
    medicalRecordNumber: {
      type: String,
      trim: true,
    },
    procedureType: {
      type: String,
      trim: true,
    },
    diagnosis: {
      type: String,
      trim: true,
    },
    institution: {
      type: String,//mongoose.Schema.Types.ObjectId,
      trim: true,
      //ref: 'Institution'
    },
    role: {
      type: String, //mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    },
    cpt: {
      type: String,
      trim: true,
    },
    procedureLength: {
      type: String,
      trim: true,
    },
    instrumentation: {
      type: String,
      trim: true,
    },
    vendor: {
      type: String,
      trim: true,
    },
    findings: {
      type: String,
      trim: true,
    },
    complications: {
      type: String,
      trim: true,
    },
    outCome: {
      type: String,
      trim: true,
    },
    hospitalization: {
      type: String,
      trim: true,
    },
    followUp: {
      type: String,
      trim: true,
    },
    period: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    fileName: [{ type: String, trim: true }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
caseSchema.plugin(toJSON);
caseSchema.plugin(paginate);


/**
 * @typedef User
 */
const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
