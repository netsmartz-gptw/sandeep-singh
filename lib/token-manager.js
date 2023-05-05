'use strict';
// npm modules
const jwt = require('jsonwebtoken');

// constants imported
const CONSTANTS = require('../constants/appDefaults');
// const RESPONSE_MESSAGES = CONSTANTS.responseMessages;

// local modules imported
const Dao = require('../dao').queries;
const Models = require('../models');
// const ResponseManager = require('./response-manager');


let generateToken = (tokenData, userType) => {
    try {
        let secretKey;
        switch (userType) {
            case CONSTANTS.AUTH_STRATEGIES.ADMIN: { secretKey = CONSTANTS.JWT_SECRET.Admin; }
                break;
            case CONSTANTS.AUTH_STRATEGIES.PERSON: { secretKey = CONSTANTS.JWT_SECRET.Person; }
                break;
            case CONSTANTS.CONTRACT.CBSR_SIGNATURE_LINK: { secretKey = CONSTANTS.JWT_SECRET.Admin; }
                break;
            case CONSTANTS.AUTH_STRATEGIES.NDA_FORM_LINK: { secretKey = CONSTANTS.JWT_SECRET.NDAFromLink; }
                break;
            default: secretKey = CONSTANTS.JWT_SECRET.Admin;
        }

        return jwt.sign(tokenData, secretKey);
    } catch (err) {
        throw err;
    }
};


let verifyToken = async (tokenData) => {
    // console.log('+++TOKENDATA+++', tokenData)
    let user;
    try {
        if (tokenData.scope === CONSTANTS.AUTH_STRATEGIES.ADMIN) {
            user = await Dao.findOne(Models.Admins, {
                _id: tokenData._id,
                // tokenIssuedAt: tokenData.tokenIssuedAt
            }, {
                __v: 0,
                password: 0
            }, { lean: true });
        } else if (tokenData.scope === CONSTANTS.AUTH_STRATEGIES.PERSON) {
            user = await Dao.findOne(Models.Persons, {
                _id: tokenData._id,
                // tokenIssuedAt: tokenData.tokenIssuedAt
            }, {
                __v: 0
            }, { lean: true });
        } else if (tokenData.scope === CONSTANTS.CONTRACT.CBSR_SIGNATURE_LINK) {
            user = await Dao.findOne(Models.Contracts, {
                _id: tokenData.contractId,
                // tokenIssuedAt: tokenData.tokenIssuedAt
            }, {
                __v: 0
            }, { lean: true });
        } else if (tokenData.scope === CONSTANTS.AUTH_STRATEGIES.NDA_FORM_LINK) {
            user = await Dao.findOne(Models.NDAs, {
                _id: tokenData.NDAId,
                // tokenIssuedAt: tokenData.tokenIssuedAt
            }, {
                __v: 0
            }, { lean: true });
        }
    } catch (err) {
        console.error(err);
    }

    if (!!user && !!user._id) {
        user.scope = tokenData.scope;
        return { isValid: true, credentials: user };
    } else {
        return { isValid: false };
        // throw ResponseManager.sendError("en", RESPONSE_MESSAGES.STATUS_MSG.ERROR.UNAUTHORIZED);
    }

};

/*
@params {Object} - model - This is the model on which token to update
@params {String} - userId - This is ths _id ObjectId of the user of which the token to update
@params {String} - token - Jwt token to update
@params {String} - tokenField - Token field to update in db
@params {Number} - tokenIssuedAt - Time in milisends on which token is issued
 */
const updatingTokenInfoInDb = async (model, userId, token, tokenIssuedAt, tokenField, extraData, unsetData) => {
    if (!!!extraData) {
        extraData = {};
    }

    let criteria = {
        _id: userId
    };

    let setQuery = {
        $set: {
            tokenIssuedAt,
            ...extraData
        }
    };

    if (!!unsetData) {
        setQuery.$unset = unsetData;
    }

    if (!!tokenField) {
        setQuery.$set[tokenField] = token;
    }

    let options = {
        new: true
    };

    return await Dao.findAndUpdate(model, criteria, setQuery, options);
};

const generateAndUpdateTokenInfoInDb = async (model, scope, userId, extraData, unsetData) => { // let currentTime = TimeManager.getCurrentTimeMili();
    let currentTime = Date.now()
    let tokenData = {
        _id: userId,
        scope: scope,
        tokenIssuedAt: currentTime
    };
    let token = generateToken(tokenData, scope);
    await updatingTokenInfoInDb(model, userId, null, currentTime, null, extraData, unsetData);
    return token;
};

const decodeAndVerifyToken = (token) => {
    let decoded = jwt.decode(token);
    return jwt.verify(token, CONSTANTS.JWT_SECRET[decoded.scope]);
};

// const test = (data) => {
//     console.log('**********8', data);
//     // return data.message = 'ADASFASDFADSFDSFA';
//     return ResponseManager.sendUnauthorizedError("en", RESPONSE_MESSAGES.STATUS_MSG.ERROR.UNAUTHORIZED);
// };


module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
    generateAndUpdateTokenInfoInDb,
    updatingTokenInfoInDb,
    decodeAndVerifyToken,
    // test
};
