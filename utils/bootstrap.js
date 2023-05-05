// local modules
const Dao = require('../dao').queries;
const { Contracts, Constants, Admins, ContractDocumentaries, Categories } = require('../models');
const { contracts, contractDocs, admins, constants, categories } = require('../utils/bootstrapData')

const bootstrapAdmin = async () => {
    try {

        let adminsData = admins;

        await Promise.all(adminsData.map(admin => createAndUpdateFunc(Admins, { email: admin.email }, admin)));
        console.info('Admin Bootstrap Completed.');

    } catch (err) {
        console.error(err);
    }
};

const bootstrapConstants = async () => {
    try {

        let constantsData = constants;

        await Promise.all(constantsData.map(constant => createAndUpdateFunc(Constants, { constantType: constant.constantType }, constant)));
        console.info('Constants Bootstrap Loaded.');

    } catch (err) {
        console.error(err);
    }
};

const bootstrapContracts = async () => {
    let contractsData = contracts

    await Promise.all(contractsData.map(contract => createAndUpdateFunc(Contracts, { _id: contract._id }, contract)));
    console.info('Contracts Bootstrap Completed.');
}

const bootstrapContractDocumentaries = async () => {
    let contractsDocData = contractDocs

    await Promise.all(contractsDocData.map(contractDoc => createAndUpdateFunc(ContractDocumentaries, { _id: contractDoc._id }, contractDoc)));
    console.info('Contracts Documentaries Bootstrap Completed.');
}

const bootstrapCategories = async () => {
    let categoriesData = categories

    await Promise.all(categoriesData.map(category => createAndUpdateFunc(Categories, { _id: category._id }, category)));
    console.info('Categories Bootstrap Completed.');
}

const createAndUpdateFunc = async (model, criteria, dataToUp) => {
    try {

        let setQuery = {
            $set: dataToUp
        };

        let options = {
            lean: true,
            upsert: true,
            new: true
        };
        return await Dao.findAndUpdate(model, criteria, setQuery, options);
    } catch (err) {
        throw err;
    }
};

module.exports = {
    startBootstrap: async () => { // starting bootstrap process
        await bootstrapContractDocumentaries();
        // await bootstrapContracts();
        // await bootstrapAdmin();
        // await bootstrapConstants();
        // await bootstrapCategories();
    }
};
