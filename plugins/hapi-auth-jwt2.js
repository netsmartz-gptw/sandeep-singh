'use strict';

// constants imported
const CONSTANTS = require('../constants/appDefaults');

// local modules
const TokenManager = require('../lib/token-manager');

exports.plugin = {
    name: 'auth',
    register: async (server, options) => {
        await server.register(require('hapi-auth-jwt2'));
        server.auth.strategy(CONSTANTS.AUTH_STRATEGIES.ADMIN, 'jwt', { // errorFunc : TokenManager.test,
            key: CONSTANTS.JWT_SECRET.Admin, // Never Share your secret key
            validate: TokenManager.verifyToken, // validate function defined above
            verifyOptions: {
                algorithms: ['HS256'],
                ignoreExpiration: false
            } // pick a strong algorithm
        });
        server.auth.strategy(CONSTANTS.AUTH_STRATEGIES.PERSON, 'jwt', {
            key: CONSTANTS.JWT_SECRET.Person, // Never Share your secret key
            validate: TokenManager.verifyToken, // validate function defined above
            verifyOptions: {
                algorithms: ['HS256'],
                ignoreExpiration: false
            } // pick a strong algorithm
        });
        server.auth.strategy(CONSTANTS.AUTH_STRATEGIES.NDA_FORM_LINK, 'jwt', {
            key: CONSTANTS.JWT_SECRET.NDAFromLink, // Never Share your secret key
            validate: TokenManager.verifyToken, // validate function defined above
            verifyOptions: {
                algorithms: ['HS256'],
                ignoreExpiration: false
            } // pick a strong algorithm
        });
        server.auth.strategy(CONSTANTS.AUTH_STRATEGIES.ADMIN_PERSON, 'jwt', {
            key: [
                CONSTANTS.JWT_SECRET.Person, CONSTANTS.JWT_SECRET.Admin
            ], // Never Share your secret key
            validate: TokenManager.verifyToken, // validate function defined above
            verifyOptions: {
                algorithms: ['HS256'],
                ignoreExpiration: false
            } // pick a strong algorithm
        });
        server.auth.default(CONSTANTS.AUTH_STRATEGIES.ADMIN);
    }
};
