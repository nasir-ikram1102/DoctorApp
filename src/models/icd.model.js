const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const icdSchema = mongoose.Schema(
  {
    
    Code: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    Description: {
        type: String,
        required: true,
        trim: true,
      },
  },
  {
    timestamps: true,
  }
);



/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
//  cptSchema.statics.isCptNameTaken = async function (roleName, excludeRoleId) {
//   const role = await this.findOne({ name: roleName, _id: { $ne: excludeRoleId } });
//   return !!role;
// };


// add plugin that converts mongoose to json
icdSchema.plugin(toJSON);
icdSchema.plugin(paginate);

/**
 * @typedef Cpt
 */
const Icd = mongoose.model('Icd', icdSchema);

module.exports = Icd;