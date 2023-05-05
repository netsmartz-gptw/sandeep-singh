/**
 * Makes all features available to outer modules.
 */

module.exports = {
    routes: [
        ...require('./admin.routes'),
        ...require('./person.routes')
    ]
};
