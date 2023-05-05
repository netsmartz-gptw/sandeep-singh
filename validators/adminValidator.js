const Joi = require("joi");

module.exports = {
    LOGIN_PAYLOAD: Joi.object(
        { email: Joi.string().email().trim().lowercase().required(), password: Joi.string().required().trim() }
    )
}
