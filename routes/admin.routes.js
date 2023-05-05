// constants imported
const { API: { VERSIONS: { v1 } }, AUTH_STRATEGIES: {
    ADMIN
} } = require('../constants/appDefaults');
const RESPONSE_MESSAGES = require('../constants/responseMessage');

// local modules
const SuccessResponse = require('../lib/response-manager').sendSuccess
const ErrorResponse = require('../lib/response-manager').sendError
const { languageHeaderObj, failActionFunction, authorizationHeaderObj } = require('../utils/universal-functions');
const { LOGIN_PAYLOAD } = require('../validators').adminValidator;
const { adminLogin, adminDashboardData } = require('../controllers').adminController;

let JSON_SWAGGER_REQUEST = {};

let FORM_SWAGGER_REQUEST = {
    payloadType: 'form'
};

let AuthRoutes = [{
    method: 'GET',
    path: `/${v1}/admin/dashboardData`,
    handler: async (request, h) => {
        try {
            let responseData = await adminDashboardData();
            return SuccessResponse(request.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, responseData);
        } catch (err) {
            return ErrorResponse(request.headers.language, err);
        }
    },
    options: {
        description: 'Dashboard data',
        auth: ADMIN,
        tags: [
            'api', 'admin'
        ],
        validate: {
            headers: authorizationHeaderObj,
            failAction: failActionFunction
        },
        plugins: {
            'hapi-swagger': FORM_SWAGGER_REQUEST
        }
    }
}];

let NonAuthRoutes = [{
    method: 'POST',
    path: `/${v1}/admin/login`,
    handler: async (request, h) => {
        try {
            let responseData = await adminLogin(request.payload);
            return SuccessResponse(request.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, responseData);
        } catch (err) {
            return ErrorResponse(request.headers.language, err);
        }
    },
    options: {
        description: 'Login Admin',
        auth: false,
        tags: [
            'api', 'admin'
        ],
        validate: {
            payload: LOGIN_PAYLOAD,
            headers: languageHeaderObj,
            failAction: failActionFunction
        },
        plugins: {
            'hapi-swagger': FORM_SWAGGER_REQUEST
        }
    }
}];


module.exports = [
    ...NonAuthRoutes,
    ...AuthRoutes
];
