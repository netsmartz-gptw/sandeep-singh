require('dotenv').config();
// npm modules
const mongoose = require('mongoose');
// constants imported
let { MONGO_URI } = require('../config/db-conf');

// local modules
// const Logger	=	require('../lib/log-manager').logger;
console.log(MONGO_URI)
module.exports = {
    connect: async () => {
        return mongoose.connect(MONGO_URI, {
            retryWrites: false,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }).then(data => console.log('Mongodb connected.....')).catch(err => {
            console.log('Mongodb connection error.....', new Error(err));
            process.exit(1);
        });
    }
};
