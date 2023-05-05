// constructor
const Boom = require("@hapi/boom");

// npm
const lodash = require("lodash");

// constants imported
const RESPONSE_MESSAGES = require("../constants/responseMessage");

// local modules
// const LogManager = require('./log-manager');

const sendError = function (language, data) {
  try {
    console.log("&&&&&&&&&&&&&& ERROR ", data);
    if (!!!language) {
      language = "en";
    }
    if (
      typeof data == "object" &&
      data.hasOwnProperty("statusCode") &&
      data.hasOwnProperty("message")
    ) {
      let msg =
        data.message[language] ||
        data.message["en"] ||
        RESPONSE_MESSAGES.STATUS_MSG.ERROR.SOMETHING_WENT_WRONG[language] ||
        RESPONSE_MESSAGES.STATUS_MSG.ERROR.SOMETHING_WENT_WRONG["en"];
      if (!msg) {
        msg =
          RESPONSE_MESSAGES.STATUS_MSG.ERROR.SOMETHING_WENT_WRONG.message[
            language
          ] ||
          RESPONSE_MESSAGES.STATUS_MSG.ERROR.SOMETHING_WENT_WRONG.message["en"];
      }
      msg = msg.replace(msg.charAt(0), msg.charAt(0).toUpperCase());
      let errorToSend = Boom.badRequest(msg);
      errorToSend.output.payload.responseType = data.type;
      return errorToSend;
    } else {
      let errorToSend = "";
      if (typeof data == "object") {
        if (data.name == "MongoError") {
          errorToSend +=
            RESPONSE_MESSAGES.STATUS_MSG.ERROR.DB_ERROR.message[language] ||
            RESPONSE_MESSAGES.STATUS_MSG.ERROR.DB_ERROR.message["en"];
          if ((data.code = 11000)) {
            let duplicateValue =
              data.errmsg &&
              data.errmsg.substr(data.errmsg.lastIndexOf('{ : "') + 5);
            duplicateValue = duplicateValue && duplicateValue.replace("}", "");
            errorToSend +=
              (RESPONSE_MESSAGES.STATUS_MSG.ERROR.DUPLICATE.message[language] ||
                RESPONSE_MESSAGES.STATUS_MSG.ERROR.DUPLICATE.message["en"]) +
              " : " +
              duplicateValue;
            if (
              data.message &&
              data.message.indexOf(
                "customer_1_streetAddress_1_city_1_state_1_country_1_zip_1"
              ) > -1
            ) {
              errorToSend =
                RESPONSE_MESSAGES.STATUS_MSG.ERROR.DUPLICATE.message[
                  language
                ] || RESPONSE_MESSAGES.STATUS_MSG.ERROR.DUPLICATE.message["en"];
            }
          }
        } else if (data.name == "ApplicationError") {
          errorToSend +=
            (RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR.message[language] ||
              RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR.message["en"]) +
            " : ";
        } else if (data.name == "ValidationError") {
          errorToSend +=
            (RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR.message[language] ||
              RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR.message["en"]) +
            data.message;
        } else if (data.name == "CastError") {
          errorToSend +=
            RESPONSE_MESSAGES.STATUS_MSG.ERROR.DB_ERROR.message[language] +
            RESPONSE_MESSAGES.STATUS_MSG.ERROR.DB_ERROR.message["en"] +
            (RESPONSE_MESSAGES.STATUS_MSG.ERROR.INVALID_ID.message[language] ||
              RESPONSE_MESSAGES.STATUS_MSG.ERROR.INVALID_ID.message["en"]) +
            data.value;
        }
      } else {
        errorToSend = data;
      }
      let customErrorMessage = errorToSend;
      if (typeof customErrorMessage == "string") {
        if (errorToSend.indexOf("[") > -1) {
          customErrorMessage = errorToSend.substr(errorToSend.indexOf("["));
        }
        customErrorMessage =
          customErrorMessage && customErrorMessage.replace(/"/g, "");
        customErrorMessage =
          customErrorMessage && customErrorMessage.replace("[", "");
        customErrorMessage =
          customErrorMessage && customErrorMessage.replace("]", "");

        customErrorMessage =
          customErrorMessage &&
          customErrorMessage.replace(
            customErrorMessage.charAt(0),
            customErrorMessage.charAt(0).toUpperCase()
          );
      }

      return Boom.badImplementation(500, customErrorMessage);
    }
  } catch (err) {
    console.log("***************8 ERR ***", err);
    return Boom.badImplementation(500, "Something went wrong on server.");
  }
};

const sendSuccess = function (language, successMsg, data) {
  successMsg =
    successMsg || RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT.message;

  if (
    typeof successMsg == "object" &&
    successMsg.hasOwnProperty("statusCode") &&
    successMsg.hasOwnProperty("message")
  ) {
    return {
      type: "Success",
      statusCode: successMsg.statusCode,
      message: successMsg.message[language || "en"],
      info: data || {},
    };
  } else {
    return {
      type: "Success",
      statusCode: 200,
      message: successMsg,
      info: data || {},
    };
  }
};

const sendUnauthorizedError = (language, msgObj) => {
  return Boom.unauthorized(msgObj.message[language || "en"]);
};

const parseSocketResponse = (language, errorMsgObj) => {
  if (!language) {
    language = "en";
  }
  if (typeof errorMsgObj === "string") {
    return errorMsgObj;
  } else {
    let parsedErrorMsgObj = lodash.cloneDeep(errorMsgObj);
    if (errorMsgObj.message && typeof errorMsgObj.message == "object") {
      parsedErrorMsgObj.message =
        errorMsgObj.message[language] || errorMsgObj.message["en"];
    } else {
      parsedErrorMsgObj.message = "Implementation Error.";
    }
    return parsedErrorMsgObj;
  }
};

module.exports = {
  sendError: sendError,
  sendSuccess: sendSuccess,
  sendUnauthorizedError,
  parseSocketResponse,
};
