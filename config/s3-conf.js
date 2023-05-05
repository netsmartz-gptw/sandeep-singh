'use strict';
require('dotenv').config();

module.exports = {
    AWS_S3: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    },
    S3_ENV_FOLDER: process.env.NODE_ENV
};