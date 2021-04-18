import Vue from "vue";
import httpStatus from "./constants/httpStatus";

const parseError = (error, locale = "es") => {
  let code = null;
  let object = null;
  let status = null;
  let message = null;

  if (error) {
      object = object ? object : {};
      JSON.parse(JSON.stringify(error));

      if (error.response && error.response.data) {
          code = error.response.data.code;
          message = error.response.data.message;
          status = error.response.status ? error.response.status : status;
      } else {
          if (object.message == "Error de conexión")
          { status = 600; }
      }
  }
  status = status ? status : 400;
  status = code ? code : status;

  if (!message) {
      if (httpStatus[locale][status])
      { message = httpStatus[locale][status]; }
      else if (object.message)
      { message = object.message; }
      else if (error)
      { message = error; }
  }
  message = message ? message : "Error desconocido";

  return {status: status, message: message};
};

Vue.prototype.$handleSuccessResponse = function(response, message = null) {
  message = message ? message : "Information saved successfully ";
  var { result = message } = response.data;
  if (response && result)
  { this.$notify({group: "loggedIn", type: "success", text: result}); }
};

Vue.prototype.$handleErrorResponse = function(error, retry = true) {
  error = parseError(error);
  if (error)
  { this.$notify({group: "loggedIn", type: error.status == 1 ? "info" : "error", text: error.message}); }
};

Vue.prototype.$handleErrorValidation = function(message = "") {
  message = message ? message : "Please correct any errors in the form before continuing ";
  this.$notify({ group: "loggedIn", type: "warning", text: message});
};