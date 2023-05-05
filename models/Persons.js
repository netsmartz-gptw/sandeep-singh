'use strict';
// npm modules
const mongoose = require('mongoose');

// Constants imported
const APP_CONSTANTS = require('../constants/appDefaults');

let ProfilePicURLSchema = {
    original: { type: String, trim: true, default: "" },
    thumbnail: { type: String, trim: true, default: "" }
};

function toLower(v) {
    return v.toLowerCase();
}

// constructor
const Schema = mongoose.Schema;

const Persons = new Schema({
    facebookId: { type: String, index: true },
    googleId: { type: String, index: true },
    addressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Addresses', index: true, },
    phoneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Phones', index: true, },
    profileCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Persons', index: true, },
    clientTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Persons', index: true, },
    passwordVerificationProcess: {
        code: { type: Number, trim: true, index: true },
        state: { type: Boolean, trim: true, index: true },
        timestamps: { type: Number, trim: true, index: true },
    },
    email: { type: String, trim: true, index: true },
    password: { type: String, trim: true },
    fullName: { type: String, trim: true },
    firstName: { type: String, trim: true, default: null },
    lastName: { type: String, trim: true, default: null },
    middleName: { type: String, trim: true, default: null },
    gender: { type: String, trim: true, index: true, sparse: true },
    birthDay: { type: String, trim: true, index: true, sparse: true },
    birthMonth: { type: String, trim: true, index: true, sparse: true },
    birthYear: { type: String, trim: true, index: true, sparse: true },
    ethnicity: { type: String, trim: true, index: true, sparse: true },
    SSN: { type: String, trim: true, index: true, sparse: true },
    profileImg: ProfilePicURLSchema,
    tokenIssuedAt: { type: Number, index: true, sparse: true, min: 0 },
    countryCode: { type: String, trim: true, },
    phoneNumber: { type: String, trim: true, },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    notes: { type: String, trim: true, },
    designation: { type: String, trim: true, },
    birthDate: { type: Number, trim: true, },
    deviceTokens: [{ type: String, trim: true, }],
    dashboardNotes: { type: String, },

    updatedDateMili: { type: Number, default: Date.now, required: true, index: true },
    createdDateMili: { type: Number, default: Date.now, required: true, index: true }
}, { timestamps: true });

module.exports = mongoose.model('Persons', Persons);
