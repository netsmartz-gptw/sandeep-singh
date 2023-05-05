'use strict';
require('dotenv').config();

module.exports = {
	AWS_SES: {
		accessKeyId: process.env.SES_ACCESS_KEY_ID,
		secretAccessKey: process.env.SES_SECRET_ACCESS_KEY
	},
	USER: {
		FROM_EMAIL: 'support@hana-software.com'
		// FROM_EMAIL: 'sihyung@new-decade.com'
		// FROM_EMAIL: 'sandeep.singh1@netsmartz.net'
	},
	TEST: {
		service: "Gmail",
		secure: true,
		auth: {
			user: "sihyung@new-decade.com",
			pass: "testingfordevelopment9"
		}
	}
};