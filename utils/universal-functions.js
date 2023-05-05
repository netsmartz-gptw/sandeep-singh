const joi = require('joi');
const md5 = require('md5');
const handlebars = require('handlebars');
const RESPONSE_MESSAGES = require("../constants/responseMessage");

const failActionFunction = function (request, reply, error) {
    try {
        console.log("mmmmmmmmmm", request.payload);

        error.output.payload.type = "Joi Error";

        if (error.isBoom) {
            delete error.output.payload.validation;
            if (error.output.payload.message.indexOf("authorization") !== -1) {
                error.output.statusCode = RESPONSE_MESSAGES.STATUS_MSG.ERROR.UNAUTHORIZED.statusCode;
                return error;
            }
            let details = error.details[0];
            if (details.message.indexOf("pattern") > -1 && details.message.indexOf("required") > -1 && details.message.indexOf("fails") > -1) {
                error.output.payload.message = "Invalid " + details.path;
                return error;
            }
        }

        let customErrorMessage = '';
        if (error.output.payload.message.indexOf("[") > -1) {
            customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf("["));
        } else {
            customErrorMessage = error.output.payload.message;
        } customErrorMessage = customErrorMessage.replace(/"/g, '');
        customErrorMessage = customErrorMessage.replace('[', '');
        customErrorMessage = customErrorMessage.replace(']', '');
        customErrorMessage = customErrorMessage.replace(customErrorMessage.charAt(0), customErrorMessage.charAt(0).toUpperCase());
        error.output.payload.message = customErrorMessage;
        delete error.output.payload.validation;
        return error;
    } catch (err) {
        console.error(err);
    }
};

const authorizationHeaderObj = joi.object({authorization: joi.string().required(), language: joi.string().trim().optional()}).unknown();
const authorizationHeaderObjOptional = joi.object({authorization: joi.string().optional(), language: joi.string().trim().optional()}).unknown();

const languageHeaderObj = joi.object({language: joi.string().trim().optional()}).unknown();


const escapeRegex = (str)=>{
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};

const hashPassword = function (plainTextPassword) {
    return md5(md5(plainTextPassword));
};

const replaceTextPlaceholderContent = async function (text, data) {
    return new Promise(async (resolve, reject) =>{
        console.log(text, data)
        text = handlebars.compile(text);
        let dataToReturn = await text(data)
        resolve(dataToReturn);
    })
};

const compareHashPassword = function (plainTextPassword, hash) {
    return md5(md5(plainTextPassword)) === hash;
};

const deleteObjKeys = (obj, keysToRemove) => {
    if (typeof keysToRemove !== 'object' || !keysToRemove.length) {
        throw '"keysToRemove" parameter must be of type array.';
    }
    let newObj = Object.assign({}, obj);
    for (let i = 0; i < keysToRemove.length; i++) {
        delete newObj[keysToRemove[i]];
    }

    return newObj;
};

const generateFilenameWithExtension = function (oldFilename, newFilename) {
	let ext = oldFilename.substr(oldFilename.lastIndexOf(".") + 1);
	return newFilename + new Date().getTime() + Math.floor(Math.random() * 2920) + 1 + '.' + ext;
};

const codeGenerator = () => {
    return Math.floor(1000 + Math.random() * 9000);
}

const randomStringGenerator = () => {
    return (Math.random() + 1).toString(36).substring(7);
}

module.exports = {
    failActionFunction,
    authorizationHeaderObj,
    languageHeaderObj,
    hashPassword,
    compareHashPassword,
    deleteObjKeys,
    replaceTextPlaceholderContent,
    escapeRegex,
    generateFilenameWithExtension,
    codeGenerator,
    randomStringGenerator,
    authorizationHeaderObjOptional
}
