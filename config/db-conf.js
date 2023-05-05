'use strict';
require('dotenv').config();

let MONGO_URI = `mongodb://${process.env.MONGO_HOST
    }/${process.env.MONGO_DB_NAME
    }`;
// console.log(process.env.NODE_ENV, process.env.MONGO_USER_NAME, process.env.MONGO_USER_PASSWORD, MONGO_URI)
// if (process.env.MONGO_USER_NAME !== "" && process.env.MONGO_USER_PASSWORD !== "" && process.env.NODE_ENV === 'production') {
if (process.env.MONGO_USER_NAME !== "" && process.env.MONGO_USER_PASSWORD !== "") {
    if (process.env.SERVER_TYPE === 'NORMAL') {
        MONGO_URI = `mongodb://${process.env.MONGO_USER_NAME
            }:${process.env.MONGO_USER_PASSWORD
            }@${process.env.MONGO_HOST
            }/${process.env.MONGO_DB_NAME
            }?retryWrites=false`;
            // }`;
    }

    if (process.env.SERVER_TYPE === 'KUBERNATES') {
        MONGO_URI = `mongodb://${process.env.MONGO_USER_NAME
            }:${process.env.MONGO_USER_PASSWORD
            }@${process.env.MONGO_HOST
            }/${process.env.MONGO_DB_NAME
            }?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;
    };
}

module.exports = {
    MONGO_URI
};
