'use strict';
// npm modules
const mongoose = require('mongoose');

// Constants imported
const APP_CONSTANTS = require('../constants/appDefaults');

// constructor
const Schema = mongoose.Schema;

const Admins = new Schema({
    name: { type: String, trim: true, default: null },
    email: { type: String, trim: true, default: null, index: true },
    password: { type: String, required: true },
    tokenIssuedAt: { type: Number, index: true, sparse: true, min: 0 },
    roles: [{
        roleType: { type: String }
    }],
    scope: { type: String, default: APP_CONSTANTS.AUTH_STRATEGIES.ADMIN, index: true },
    registrationDate: { type: Date, default: Date.now, required: true },
    updatedDateMili: { type: Number, default: Date.now, required: true, index: true },
    createdDateMili: { type: Number, default: Date.now, required: true, index: true }
}, { timestamps: true });

module.exports = mongoose.model('Admins', Admins);
