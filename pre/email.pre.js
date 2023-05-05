const ErrorResponse = require("../lib/response-manager").sendError;
const SuccessResponse = require("../lib/response-manager").sendSuccess;
const { getEmailValidationFunc, getPersonFunc } = require("../methods/person.methods");
const RESPONSE_MESSAGES = require("../constants/responseMessage");
const { getRoleFunc } = require("../methods/role.methods");

let emailValidation = async (requestData, requestHeader) => {
  let emailValidation = await getEmailValidationFunc({
    email: requestData.emailId,
  });
  if (emailValidation && emailValidation._id) {
    return emailValidation
  } else {
    return ErrorResponse(requestHeader.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.EMAIL_DOESNT_REGISTERED);
  }
}

let emailAlreadyExists = async (requestData, requestHeader) => {
  let checkEmailValid = await getEmailValidationFunc({
    email: requestData.email,
  });
  console.log(checkEmailValid)
  if (checkEmailValid && checkEmailValid._id) {
    return ErrorResponse(requestHeader.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.EMAIL_ALREADY_EXISTS);
  } else {
    return true
  }
}

let emailAlreadyExistsReturnProfile = async (requestData, requestHeader) => {
  let checkEmailValid = await getEmailValidationFunc({
    email: requestData.email,
  });
  console.log(checkEmailValid)
  if (checkEmailValid && checkEmailValid._id) {
    let checkRole = await getRoleFunc({
      personId: checkEmailValid._id,
      roleType: requestData.roleType
    });

    if (checkRole && checkRole._id) {
      return SuccessResponse(
        requestHeader.language,
        RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
        checkEmailValid
      );
    } else {
      return ErrorResponse(requestHeader.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.USER_EXISTS_WITH_DIFFERENT_ROLE);
    }
  } else {
    return true
  }
}

let profileCreatorCheck = async (requestHeader, requestData, authPersonData) => {
  let checkPersonData = await getPersonFunc({
    _id: requestData.personId,
  });
  // console.log(checkPersonData.profileCreatedBy, authPersonData._id, JSON.stringify(checkPersonData.profileCreatedBy) != JSON.stringify(authPersonData._id))
  if (checkPersonData && checkPersonData._id) {
    if (JSON.stringify(checkPersonData.profileCreatedBy) != JSON.stringify(authPersonData._id)) {
      return ErrorResponse(requestHeader.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.PROFILE_NOT_CREATED_BY_YOU);
    } else {
      return true
    }
  } else {
    return ErrorResponse(requestHeader.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.NO_CUSTOMER_FOUND);
  }
}

module.exports = {
  emailValidation,
  emailAlreadyExists,
  emailAlreadyExistsReturnProfile,
  profileCreatorCheck
}