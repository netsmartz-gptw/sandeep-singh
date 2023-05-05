'use strict';
const { APP, SERVER } = require('./constants/appDefaults')
const Hapi = require('@hapi/hapi');
const Routes = require('./routes').routes;
const Db = require('./db-connections');
const Plugins = require('./plugins');
const Bootstrap = require('./utils/bootstrap');
const SocketModule = require('./socketModule');
require('./mongo')

const init = async () => {

    const server = Hapi.server({
        app: {
            name: APP.NAME
        },
        port: process.env.PORT || SERVER.PORT,
        // host: process.env.BASE_PATH,
        routes: {
            cors: true,
        }
    });

    await Db.mongoConnections.connect();
    await Bootstrap.startBootstrap()
    await server.register(Plugins);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
    })

    await server.route(Routes);

    // Default Routes
    // server.route({
    //     method: 'GET',
    //     path: '/{path*}',
    //     handler: {
    //         directory: {
    //             path: '.',
    //             redirectToSlash: true,
    //             listing: false,
    //             index: true,
    //         }
    //     },
    //     config: {
    //         auth: false
    //     }
    // });

    server.route({
        method: 'GET',
        path: '/home',
        handler: async (request, h) => {
            return h.view('home', { basePath: process.env.IP })
        },
        options: {
            auth: false
        }
    })
    SocketModule.connectSocket(server);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
