// constants imported
const RESPONSE_MESSAGES = require("../constants/responseMessage");
const { API: { VERSIONS: { v1 } },
  AUTH_STRATEGIES: { PERSON, ADMIN },
} = require("../constants/appDefaults");

// local modules
const SuccessResponse = require("../lib/response-manager").sendSuccess;
const ErrorResponse = require("../lib/response-manager").sendError;
const {
  languageHeaderObj,
  failActionFunction,
  authorizationHeaderObj,
} = require("../utils/universal-functions");
const {
  LOGIN_PAYLOAD,
  REGISTER_PAYLOAD,
  SOCIAL_SIGNUP_PAYLOAD,
  PROFILE_UPDATE_PAYLOAD,
  CREATE_CUSTOMER_PAYLOAD,
  PROFILE_UPDATE_CUSTOMER_BY_REALTOR_PAYLOAD,
  PERSON_ID_PARAMS,
  PERSON_UPDATE_PAYLOAD,
  GET_PERSON_LIST_QUERY,
  GET_PERSON_SEARCH_QUERY,
  EMAIL_VERIFICATION_PAYLOAD,
  CHANGE_PASSWORD_PAYLOAD,
  PASSWORD_CHANGE_PAYLOAD,
  CODE_VERIFICATION_PAYLOAD,
  LOGOUT_PAYLOAD, CREATE_PROFILE_PAYLOAD
} = require("../validators").personValidator;
const {
  personRegister,
  personSocialSignup,
  personLogin,
  updatePerson,
  emailVerification,
  changePassword,
  forgetPasswordInit,
  codeVerification,
  passwordChange,
  getPerson,
  updatedPersonProfileData,
  getPersonListForAdmin,
  updatePersonByAdmin,
  updateProfileOfCustomerByRealtor,
  getRealtorCustomerList, createCustomerThroughPlus, personLogOut, getPersonSearch, createPerson, deleteCustomer } = require("../controllers").personController;
const Joi = require("joi");
const { emailValidation, emailAlreadyExists, profileCreatorCheck, emailAlreadyExistsReturnProfile } = require("../pre/email.pre");
const { createCustomerFromContacts, getCustomerList } = require("../controllers/person.controller");
const { CONTACT_UPLOAD_PAYLOAD, GET_CUSTOMER_SEARCH_QUERY, DELETE_CUSTOMER_PARAMS } = require("../validators/personValidator");

let JSON_SWAGGER_REQUEST = {};

let FORM_SWAGGER_REQUEST = {
  payloadType: "form",
};

let AuthRoutes = [
  {
    method: "DELETE",
    path: `/${v1}/customer/{customerId}`,
    handler: async (request, h) => {
      try {
        let responseData = await deleteCustomer( 
          request.params,
          request.auth.credentials
        );
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      description: "Customer Delete",
      auth: PERSON,
      tags: ["api", "customer"],
      validate: {
        params: DELETE_CUSTOMER_PARAMS,
        headers: authorizationHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": JSON_SWAGGER_REQUEST,
      },
    },
  },
  
  // not in use
  {
    method: "GET",
    path: `/${v1}/customerList`,
    handler: async (request, h) => {
      try {
        let responseData = await getCustomerList(
          request.query,
          request.auth.credentials
        );
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      description: "Realtor Customer List",
      auth: PERSON,
      tags: ["api", "person", "Not in use"],
      validate: {
        query: GET_CUSTOMER_SEARCH_QUERY,
        headers: authorizationHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": JSON_SWAGGER_REQUEST,
      },
    },
  },
  {
    method: "GET",
    path: `/${v1}/realtorCustomerList`,
    handler: async (request, h) => {
      try {
        let responseData = await getRealtorCustomerList(
          // request.params,
          request.auth.credentials
        );
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      description: "Realtor Customer List",
      auth: PERSON,
      tags: ["api", "person"],
      validate: {
        // params: PERSON_ID_PARAMS,
        headers: authorizationHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": JSON_SWAGGER_REQUEST,
      },
    },
  },
  {
    method: "PUT",
    path: `/${v1}/person/{personId}`,
    handler: async (request, h) => {
      try {
        let responseData = await updatePersonByAdmin(
          request.params,
          request.payload,
          request.auth.credentials
        );
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      description: "Update Person for Admin",
      auth: ADMIN,
      tags: ["api", "admin"],
      validate: {
        // payload: REGISTER_PAYLOAD,
        params: PERSON_ID_PARAMS,
        payload: PERSON_UPDATE_PAYLOAD,
        headers: authorizationHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": JSON_SWAGGER_REQUEST,
      },
    },
  },
  {
    method: "GET",
    path: `/${v1}/person`,
    handler: async (request, h) => {
      try {
        let responseData = await getPersonListForAdmin(
          request.query,
          request.auth.credentials
        );
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      description: "Person list for Admin",
      auth: ADMIN,
      tags: ["api", "admin"],
      validate: {
        // payload: REGISTER_PAYLOAD,
        query: GET_PERSON_LIST_QUERY,
        headers: authorizationHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": JSON_SWAGGER_REQUEST,
      },
    },
  }, {
    method: "POST",
    path: `/${v1}/person/logout`,
    handler: async (request, h) => {
      try {
        let responseData = await personLogOut(request.payload, request.auth.credentials);
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      description: "Person Log out",
      auth: PERSON,
      tags: ["api", "person"],
      validate: {
        payload: LOGOUT_PAYLOAD,
        headers: authorizationHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": JSON_SWAGGER_REQUEST,
      },
    },
  }, {
    method: "GET",
    path: `/${v1}/customer/search`,
    handler: async (request, h) => {
      try {
        let responseData = await getPersonSearch(
          // request.pre,
          request.query,
          request.auth.credentials
        );
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      // pre: [
      //   {
      //     method: async (request, h) =>
      //       emailValidation(request.query, request.headers),
      //     assign: "emailValidation",
      //   },
      // ],
      description: "Search Person",
      auth: PERSON,
      tags: ["api", "customer"],
      validate: {
        query: GET_PERSON_SEARCH_QUERY,
        headers: authorizationHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": JSON_SWAGGER_REQUEST,
      },
    },
  },
];

let NonAuthRoutes = [
  {
    method: "POST",
    path: `/${v1}/person/register`,
    handler: async (request, h) => {
      try {
        let responseData = await personRegister(request.payload);
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      pre: [
        {
          method: async (request, h) =>
            emailAlreadyExists(request.payload, request.headers),
          assign: "emailAlreadyExists",
        },
      ],
      description: "Register Person",
      auth: false,
      tags: ["api", "person"],
      validate: {
        payload: REGISTER_PAYLOAD,
        headers: languageHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": JSON_SWAGGER_REQUEST,
      },
    },
  },
  {
    method: "POST",
    path: `/${v1}/person/login`,
    handler: async (request, h) => {
      try {
        let responseData = await personLogin(request.payload);
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      description: "Login Person",
      auth: false,
      tags: ["api", "person"],
      validate: {
        payload: LOGIN_PAYLOAD,
        headers: languageHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": FORM_SWAGGER_REQUEST,
      },
    },
  },
  {
    method: "POST",
    path: `/${v1}/emailVerification`,
    handler: async (request, h) => {
      try {
        let responseData = await emailVerification(request.payload);
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      description: "Email verification",
      auth: false,
      tags: ["api", "person"],
      validate: {
        payload: EMAIL_VERIFICATION_PAYLOAD,
        headers: languageHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": FORM_SWAGGER_REQUEST,
      },
    },
  },
  {
    method: "PUT",
    path: `/${v1}/person/profileUpdateOfCustomerByRealtor`,
    handler: async (request, h) => {
      try {
        let responseData = await updateProfileOfCustomerByRealtor(
          request.payload,
          request.auth.credentials
        );
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      pre: [
        {
          method: async (request, h) =>
            profileCreatorCheck(request.headers, request.payload, request.auth.credentials),
          assign: "profileCreatorCheck",
        },
      ],
      description: "Update Person By Realtor",
      auth: PERSON,
      tags: ["api", "person"],
      validate: {
        payload: PROFILE_UPDATE_CUSTOMER_BY_REALTOR_PAYLOAD,
        headers: authorizationHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": JSON_SWAGGER_REQUEST,
      },
    },
  },
  {
    method: "PUT",
    path: `/${v1}/person/profileUpdate`,
    handler: async (request, h) => {
      try {
        let responseData = await updatePerson(
          request.payload,
          request.auth.credentials
        );
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      description: "Update Person",
      auth: PERSON,
      tags: ["api", "person"],
      validate: {
        payload: PROFILE_UPDATE_PAYLOAD,
        headers: authorizationHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": JSON_SWAGGER_REQUEST,
      },
    },
  },
  {
    method: "PUT",
    path: `/${v1}/person/changePassword`,
    handler: async (request, h) => {
      try {
        let responseData = await changePassword(
          request.payload,
          request.auth.credentials
        );
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      description: "Change Password Person",
      auth: PERSON,
      tags: ["api", "person"],
      validate: {
        payload: CHANGE_PASSWORD_PAYLOAD,
        headers: authorizationHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": JSON_SWAGGER_REQUEST,
      },
    },
  },
  {
    method: "POST",
    path: `/${v1}/person/forgetPasswordInti`,
    handler: async (request, h) => {
      try {
        let responseData = await forgetPasswordInit(
          request.pre,
          request.payload
        );
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      pre: [
        {
          method: async (request, h) =>
            emailValidation(request.payload, request.headers),
          assign: "emailValidation",
        },
      ],
      description: "Forget Password Person",
      auth: false,
      tags: ["api", "person"],
      validate: {
        payload: Joi.object({
          emailId: Joi.string().required(),
        }),
        headers: languageHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": FORM_SWAGGER_REQUEST,
      },
    },
  },
  {
    method: "POST",
    path: `/${v1}/person/codeVerification`,
    handler: async (request, h) => {
      try {
        let responseData = await codeVerification(
          request.pre,
          request.payload
        );
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      pre: [
        {
          method: async (request, h) =>
            emailValidation(request.payload, request.headers),
          assign: "emailValidation",
        },
      ],
      description: "Forget Password Person",
      auth: false,
      tags: ["api", "person"],
      validate: {
        payload: CODE_VERIFICATION_PAYLOAD,
        headers: languageHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": FORM_SWAGGER_REQUEST,
      },
    },
  },
  {
    method: "POST",
    path: `/${v1}/person/passwordChange`,
    handler: async (request, h) => {
      try {
        let responseData = await passwordChange(
          request.pre,
          request.payload
        );
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      pre: [
        {
          method: async (request, h) =>
            emailValidation(request.payload, request.headers),
          assign: "emailValidation",
        },
      ],
      description: "Forget Password Person",
      auth: false,
      tags: ["api", "person"],
      validate: {
        payload: PASSWORD_CHANGE_PAYLOAD,
        headers: languageHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": FORM_SWAGGER_REQUEST,
      },
    },
  },
  {
    method: "GET",
    path: `/${v1}/personDetailedData/{personId}`,
    handler: async (request, h) => {
      try {
        let responseData = await getPerson(
          request.params,
          request.auth.credentials
        );
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      description: "Get Person Data",
      auth: PERSON,
      tags: ["api", "person"],
      validate: {
        params: PERSON_ID_PARAMS,
        headers: authorizationHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": JSON_SWAGGER_REQUEST,
      },
    },
  },
  {
    method: "GET",
    path: `/${v1}/realtorDetailedData`,
    handler: async (request, h) => {
      try {
        let responseData = await updatedPersonProfileData(
          // request.params,
          request.auth.credentials
        );
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      description: "Get Person Data",
      auth: PERSON,
      tags: ["api", "person"],
      validate: {
        // params: PERSON_ID_PARAMS,
        headers: authorizationHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": JSON_SWAGGER_REQUEST,
      },
    },
  },
  {
    method: "POST",
    path: `/${v1}/customer/createCustomer`,
    handler: async (request, h) => {
      try {
        let responseData = await createCustomerThroughPlus(
          request.payload,
          request.auth.credentials
        );
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      // pre: [
      //   {
      //     method: async (request, h) => emailAlreadyExists(request.payload, request.headers),
      //     assign: "emailAlreadyExists",
      //   },
      // ],
      description: "Create Customer By Realtor",
      auth: PERSON,
      tags: ["api", "customer"],
      validate: {
        payload: CREATE_CUSTOMER_PAYLOAD,
        headers: authorizationHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": JSON_SWAGGER_REQUEST,
      },
    },
  },
  {
    method: "POST",
    path: `/${v1}/customer/contacts`,
    handler: async (request, h) => {
      try {
        let responseData = await createCustomerFromContacts(
          request.payload,
          request.auth.credentials
        );
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      description: "Contact uploaded By Realtor",
      auth: PERSON,
      tags: ["api", "customer"],
      validate: {
        payload: CONTACT_UPLOAD_PAYLOAD,
        headers: authorizationHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": JSON_SWAGGER_REQUEST,
      },
    },
  },
  {
    method: "POST",
    path: `/${v1}/person/createProfile`,
    handler: async (request, h) => {
      try {
        let responseData = await createPerson(
          request.payload,
          request.auth.credentials
        );
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      pre: [
        {
          method: async (request, h) => emailAlreadyExistsReturnProfile(request.payload, request.headers),
          assign: "emailAlreadyExists",
        },
      ],
      description: "Create Person Profile By Realtor",
      auth: PERSON,
      tags: ["api", "customer"],
      validate: {
        payload: CREATE_PROFILE_PAYLOAD,
        headers: authorizationHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": JSON_SWAGGER_REQUEST,
      },
    },
  },

  // social signup pending

  {
    method: "POST",
    path: `/${v1}/person/socialSignup`,
    handler: async (request, h) => {
      try {
        let responseData = await personSocialSignup(request.payload);
        return SuccessResponse(
          request.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          responseData
        );
      } catch (err) {
        return ErrorResponse(request.headers.language, err);
      }
    },
    options: {
      pre: [
        {
          method: async (request, h) =>
            emailAlreadyExists(request.payload, request.headers),
          assign: "emailAlreadyExists",
        },
      ],
      description: "Social Signup Person",
      auth: false,
      tags: ["api", "person"],
      validate: {
        payload: SOCIAL_SIGNUP_PAYLOAD,
        headers: languageHeaderObj,
        failAction: failActionFunction,
      },
      plugins: {
        "hapi-swagger": JSON_SWAGGER_REQUEST,
      },
    },
  }

];

module.exports = [...NonAuthRoutes, ...AuthRoutes];
