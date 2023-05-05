const ErrorResponse = require("../lib/response-manager").sendError;
const { getCBSRFilledFunc } = require("../methods/contract1.methods");
const RESPONSE_MESSAGES = require("../constants/responseMessage");

let templateNamePre = async (requestData, requestHeader, authData) => {
    if(requestData.transactionType === 'TEMPLATE'){
        let templateList = await getCBSRFilledFunc({
            createdBy: authData._id,
            transactionType: requestData.transactionType,
            templateName: requestData.templateName
          });
    if (templateList.length) {
        return ErrorResponse(requestHeader.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.TEMPLATE_NAME_ALREADY_EXIST);
    } else {
        return true
    }
    }else{
        return true
    }
  }

  module.exports = {
    templateNamePre,
  }