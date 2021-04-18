/* eslint-disable */
// Validations
function _reportError(signature) {
    console.error("Validation rule error : " + signature + " has lost parameter (s)");
    return (v) => false || "Validation rule error";
}
  
export const rules = {
    required: (v) => !!v || "This field is required",

    max: (model, num) => {
      let test = false;
  
      console.log(model, num);
  
      test = Number(num) <= Number(model);
      return (v) => test || "The field must be less than " + model;
    },

    min: (model, num) => {
      let test = false;
  
      test = Number(num) >= Number(model);
      return (v) => test || "The field must be greater than " + model;
    },

    maxLength: (model, num = false) => {
      if (!num) {
        return _reportError("maxLength(num)");
      }
      let test = false;
  
      test = (model || []).length >= num;
      return (v) => test || "The field must be less than " + num + " characters";
    },

    minLength: (model, num = false) => {
      if (!num) {
        return _reportError("minLength(num)");
      }
      let test = false;
      test = (model || []).length >= num;
      return (v) => test || "The field must be greater than " + num + " characters";
    },

    letters: (v) =>
      (v && /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(v)) || "Must contain only letters",
};

  