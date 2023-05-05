// const adminMethods = require('../methods/admin.methods')
const {compareHashPassword, deleteObjKeys} = require('../utils/universal-functions')
const RESPONSE_MESSAGES = require('../constants/responseMessage')
const {AUTH_STRATEGIES: {ADMIN}} = require('../constants/appDefaults')
const {generateAndUpdateTokenInfoInDb} = require('../lib/token-manager')
const {Persons, Contracts, Admins} = require('../models')
const { getDashboardCount, getDashboardChange, getAdminFunc } = require('../methods/admin.methods')

let adminLogin = async (payloadData) => {
    try { // check admin exist
        let criteria = {
            email: payloadData.email
        };

        let adminData = await getAdminFunc(criteria, {})

        if (!! adminData && adminData._id) {
            if (compareHashPassword(payloadData.password, adminData.password)) { // generating token
                adminData.accessToken = await generateAndUpdateTokenInfoInDb(Admins, ADMIN, adminData._id);
                return deleteObjKeys(adminData, ['__v', 'password']);
            } else {
                throw RESPONSE_MESSAGES.STATUS_MSG.ERROR.INVALID_PASSWORD;
            }
        } else {
            throw RESPONSE_MESSAGES.STATUS_MSG.ERROR.INVALID_EMAIL;
        }
    } catch (err) {
        throw err;
    }
}

let adminDashboardData = async () => {
    try{
        let [activeUsersCount, activeUsersChange, totalUsersCount, totalUsersChange, totalContractsCount, totalContractsChange, activeContractsCount, activeContractsChange] = await Promise.all([
            getDashboardCount(Persons, {isActive: true}),
            getDashboardChange(Persons, {isActive: true}),
            getDashboardCount(Persons,{}),
            getDashboardChange(Persons, {}),
            getDashboardCount(Contracts, {}),
            getDashboardChange(Contracts, {}),
            getDashboardCount(Contracts, {isDeleted: false}),
            getDashboardChange(Contracts, {isDeleted: false}),
        ])
        return {countsAndChanges: [{title: "activeUsersCount", value: activeUsersCount, titleChange: "activeUsersChange", valuechange: activeUsersChange}, {title: "totalUsersCount", value: totalUsersCount, titleChange: "totalUsersChange", valuechange: totalUsersChange}, {title: "totalContractsCount", value: totalContractsCount, titleChange: "totalContractsChange", valuechange: totalContractsChange}, {title: "activeContractsCount", value: activeContractsCount, titleChange: "activeContractsChange", valuechange: activeContractsChange}]}
    }catch(e){
        throw e
    }
}

module.exports = {
    adminLogin,
    adminDashboardData
}
