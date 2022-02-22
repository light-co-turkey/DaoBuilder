const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateDaoInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.title = !isEmpty(data.title) ? data.title : "";
  data.handle = !isEmpty(data.handle) ? data.handle : "";


  // Title checks
  if (Validator.isEmpty(data.title)) {
    errors.title = "Handle field is required";
  }
  // Handle checks
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
