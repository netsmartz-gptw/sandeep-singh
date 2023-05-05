const Joi = require("joi");
const {
    DATABASE: {
        PERSON_ROLE: {
            // BUYER,
            // SELLER,
            CUSTOMER,
            REALTOR,
            TRANSACTION_COORDINATOR,
            TITLE_CLOSER,
            MORTGAGE_BROKER,
        }
    }
} = require('../constants/appDefaults')

module.exports = {
    SOCIAL_SIGNUP_PAYLOAD: Joi.object(
        {
            firstName: Joi.string().trim().min(1).required(),
            lastName: Joi.string().trim().min(1).optional(),
            middleName: Joi.string().trim().min(1).optional(),
            ethnicity: Joi.string().trim().min(1).optional(),
            gender: Joi.string().trim().min(1).optional(),
            SSN: Joi.string().trim().min(1).optional(),
            email: Joi.string().trim().email().lowercase().required(),
            countryCode: Joi.string().trim().lowercase().optional(),
            areaCode: Joi.string().trim().lowercase().optional(),
            phoneNumber: Joi.string().trim().lowercase().optional(),
            city: Joi.string().allow("").trim().optional(),
            state: Joi.string().trim().optional(),
            googleId: Joi.string().trim().optional(),
            facebookId: Joi.string().trim().optional(),
            birthDate: Joi.date().iso().required(),
            deviceToken: Joi.string().optional(),
            profileImg: Joi.object().keys(
                { original: Joi.string().trim().min(1).required(), thumbnail: Joi.string().trim().min(1).required() }
            ).optional(),
            roleType: Joi.string().valid(
                CUSTOMER,
                REALTOR,
                TRANSACTION_COORDINATOR,
                TITLE_CLOSER,
                MORTGAGE_BROKER).required()
        }
    ),
    REGISTER_PAYLOAD: Joi.object(
        {
            firstName: Joi.string().trim().min(1).required(),
            lastName: Joi.string().trim().min(1).optional(),
            middleName: Joi.string().trim().min(1).optional(),
            ethnicity: Joi.string().trim().min(1).optional(),
            gender: Joi.string().trim().min(1).optional(),
            SSN: Joi.string().trim().min(1).optional(),
            email: Joi.string().trim().email().lowercase().required(),
            countryCode: Joi.string().trim().lowercase().optional(),
            areaCode: Joi.string().trim().lowercase().optional(),
            phoneNumber: Joi.string().trim().lowercase().optional(),
            city: Joi.string().allow("").trim().optional(),
            state: Joi.string().trim().optional(),
            // phoneId: Joi.string().trim().lowercase().optional().min(24),
            // addressId: Joi.string().trim().lowercase().optional().min(24),
            password: Joi.string().trim().required().min(6),
            birthDate: Joi.date().iso().required(),
            deviceToken: Joi.string().optional(),
            profileImg: Joi.object().keys(
                { original: Joi.string().trim().min(1).required(), thumbnail: Joi.string().trim().min(1).required() }
            ).optional(),
            roleType: Joi.string().valid(
                CUSTOMER,
                REALTOR,
                TRANSACTION_COORDINATOR,
                TITLE_CLOSER,
                MORTGAGE_BROKER).required()
        }
    ),
    PROFILE_UPDATE_PAYLOAD: Joi.object(
        {
            firstName: Joi.string().trim().min(1).optional(),
            lastName: Joi.string().trim().min(1).optional(),
            middleName: Joi.string().trim().allow("").optional(),
            ethnicity: Joi.string().trim().min(1).optional(),
            gender: Joi.string().trim().min(1).optional(),
            SSN: Joi.string().trim().min(1).optional(),
            deviceToken: Joi.string().optional(),
            password: Joi.string().trim().optional().min(6),
            birthDate: Joi.date().iso().optional(),
            dashboardNotes: Joi.string().trim().optional(),
            profileImg: Joi.object().keys(
                { original: Joi.string().trim().min(1).allow("").required(), thumbnail: Joi.string().trim().min(1).allow("").required() }
            ).optional(),
            // office: Joi.object({
            //     street: Joi.string().allow("").required(),
            //     city: Joi.string().allow("").required(),
            //     zipCode: Joi.string().allow("").optional(),
            //     state: Joi.string().allow("").required(),
            //     country: Joi.string().allow("").required(),
            // }).optional()
        }
    ),
    PROFILE_UPDATE_CUSTOMER_BY_REALTOR_PAYLOAD: Joi.object(
        {
            personId: Joi.string().trim().min(1).optional(),
            email: Joi.string().trim().min(1).optional(),
            firstName: Joi.string().trim().min(1).optional(),
            lastName: Joi.string().trim().min(1).optional(),
            middleName: Joi.string().trim().allow("").optional(),
            // fullName: Joi.string().trim().optional(),
            ethnicity: Joi.string().trim().min(1).optional(),
            gender: Joi.string().trim().min(1).optional(),
            SSN: Joi.string().trim().min(1).optional(),
            password: Joi.string().trim().optional().min(6),
            birthDate: Joi.number().min(13).optional(),
            designation: Joi.string().allow("").optional(),
            notes: Joi.string().optional(),
            // events: Joi.array().items(Joi.object().keys({
            //     name: Joi.string().required(),
            //     timestamp: Joi.string().required(),
            //   })),
            profileImg: Joi.object().keys(
                { original: Joi.string().trim().min(1).allow("").required(), thumbnail: Joi.string().trim().min(1).allow("").required() }
            ).optional(),
        }
    ),
    LOGIN_PAYLOAD: Joi.object(
        {
            email: Joi.string().email().trim().lowercase().required(),
            password: Joi.string().required().trim(),
            deviceToken: Joi.string().optional(),
        }
    ),
    CREATE_CUSTOMER_PAYLOAD: Joi.object(
        {
            firstName: Joi.string().trim().min(1).required(),
            lastName: Joi.string().trim().min(1).optional(),
            middleName: Joi.string().trim().allow("").optional(),
            ethnicity: Joi.string().trim().min(1).optional(),
            gender: Joi.string().trim().min(1).optional(),
            SSN: Joi.string().trim().min(1).optional(),
            email: Joi.string().trim().email().lowercase().required(),
            countryCode: Joi.string().trim().lowercase().optional(),
            areaCode: Joi.string().trim().lowercase().optional(),
            phoneNumber: Joi.string().trim().lowercase().optional(),
            notes: Joi.string().allow("").optional(),
            address: Joi.string().optional(),
            // phoneId: Joi.string().trim().lowercase().optional().min(24),
            // addressId: Joi.string().trim().lowercase().optional().min(24),
            // password: Joi.string().trim().required().min(6),
            // birthDate: Joi.date().iso().required(),
            // profileImg: Joi.object().keys(
            //     {original: Joi.string().trim().min(1).required(), thumbnail: Joi.string().trim().min(1).required()}
            // ).optional(),
            roleType: Joi.string().valid(
                CUSTOMER,
                REALTOR,
                TRANSACTION_COORDINATOR,
                TITLE_CLOSER,
                MORTGAGE_BROKER).required()
        }
    ),
    CONTACT_UPLOAD_PAYLOAD: Joi.object(
        {
            contacts: Joi.array().items(Joi.object().keys({
                firstName: Joi.string().trim().allow("").min(1).required(),
                lastName: Joi.string().trim().allow("").min(1).optional(),
                middleName: Joi.string().trim().allow("").optional(),
                email: Joi.string().trim().email().allow("").lowercase().optional(),
                countryCode: Joi.string().trim().lowercase().optional(),
                areaCode: Joi.string().trim().lowercase().optional(),
                phoneNumber: Joi.string().trim().allow("").lowercase().optional(),
        })).required()
    }
    ),
    CREATE_PROFILE_PAYLOAD: Joi.object(
        {
            firstName: Joi.string().trim().min(1).required(),
            lastName: Joi.string().trim().min(1).optional(),
            middleName: Joi.string().trim().allow("").optional(),
            ethnicity: Joi.string().trim().min(1).optional(),
            gender: Joi.string().trim().min(1).optional(),
            SSN: Joi.string().trim().min(1).optional(),
            email: Joi.string().trim().email().lowercase().required(),
            countryCode: Joi.string().trim().lowercase().optional(),
            areaCode: Joi.string().trim().lowercase().optional(),
            phoneNumber: Joi.string().trim().lowercase().optional(),
            notes: Joi.string().allow("").optional(),
            address: Joi.string().optional(),
            profileCreatedBy: Joi.string().required(),
            roleType: Joi.string().valid(
                CUSTOMER,
                REALTOR,).required()
        }
    ),
    PERSON_ID_PARAMS: Joi.object({
        personId: Joi.string().required(),
    }),
    PERSON_UPDATE_PAYLOAD: Joi.object({
        isActive: Joi.boolean().optional(),
        isEmailVerified: Joi.boolean().optional(),
    }),
    GET_PERSON_LIST_QUERY: Joi.object({
        skip: Joi.number().required(),
        limit: Joi.number().required(),
    }),
    GET_PERSON_SEARCH_QUERY: Joi.object({
        search: Joi.string().allow("").required(),
        skip: Joi.number().required(),
        limit: Joi.number().required(),
    }),
    GET_CUSTOMER_SEARCH_QUERY: Joi.object({
        search: Joi.string().allow("").optional(),
        listType: Joi.string().valid('ACTIVE', 'NON-ACTIVE', 'ALL').required(),
        skip: Joi.number().required(),
        limit: Joi.number().required(),
    }),
    EMAIL_VERIFICATION_PAYLOAD: Joi.object({
        userId: Joi.string().optional(),
        timestamp: Joi.string().optional(),
        emailId: Joi.string().optional(),
    }),
    CHANGE_PASSWORD_PAYLOAD: Joi.object({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required(),
    }),
    PASSWORD_CHANGE_PAYLOAD: Joi.object({
        emailId: Joi.string().optional(),
        password: Joi.string().required(),
    }),
    CODE_VERIFICATION_PAYLOAD: Joi.object({
        emailId: Joi.string().optional(),
        code: Joi.number().required(),
    }),
    LOGOUT_PAYLOAD: Joi.object(
        {
            deviceToken: Joi.string().required(),
        }
    ),
    DELETE_CUSTOMER_PARAMS: Joi.object(
        {
            customerId: Joi.string().required(),
        }
    )
}
