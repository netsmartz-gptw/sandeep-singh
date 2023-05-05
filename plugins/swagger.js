'use strict';

// npm modules
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');
const hapiSwagger = require('hapi-swagger');

// local modules
// const Logger = require('../lib/log-manager').logger;

// constants imported
const APP_CONSTANTS = require('../constants/appDefaults');


exports.plugin = {
    name: 'swagger-plugin',

    register: async (server) => {
        const swaggerOptions = {
            info: {
                title: `${
                    process.env.NODE_ENV
                } APi Doc of '${
                    APP_CONSTANTS.APP.NAME
                }' project.`
            },
            grouping: 'tags',
            // sortTags: 'name'
        };
        await server.register([
            inert, vision, {
                plugin: hapiSwagger,
                options: swaggerOptions
            }
        ]);
        console.info('Swagger Loaded');
    }
};
