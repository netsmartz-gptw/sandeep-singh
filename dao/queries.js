'use strict';

let saveData = function (model, data, options = {}) {
    return new model(data).save(options);
};

let getData = function (model, query, projection, options) {
    return model.find(query, projection, options);
};

let findOne = function (model, query, projection, options) {
    return model.findOne(query, projection, options);
};

let findAndUpdate = function (model, conditions, update, options) {
    return model.findOneAndUpdate(conditions, update, options);
};

let findAndRemove = function (model, conditions, update, options) {
    return model.findOneAndRemove(conditions, update, options);
};

let update = function (model, conditions, update, options) {
    return model.updateMany(conditions, update, options);
};

let remove = function (model, condition, options) {
    return model.findOneAndDelete(condition, options);
};

let removeMany = function (model, condition, options) {
    return model.deleteMany(condition, options);
};

/*------------------------------------------------------------------------
 * FIND WITH REFERENCE
 * -----------------------------------------------------------------------*/
let populateData = function (model, query, projection, options, collectionOptions) {
    return model.find(query, projection, options).populate(collectionOptions).exec();
};

let populateOne = function (model, query, projection, options, collectionOptions) {
    return model.findOne(query, projection, options).populate(collectionOptions).exec();
};

let count = function (model, condition) {
    return model.countDocuments(condition);
};
/*
 ----------------------------------------
 AGGREGATE DATA
 ----------------------------------------
 */
let aggregateData = function (model, aggregateArray, options) {

    let aggregation = model.aggregate(aggregateArray);
    if (options) {
        aggregation.options = options;
    }

    return aggregation.exec();
};

let insert = function (model, data, options) {
    return model.collection.insert(data, options);
};

let insertMany = function (model, data, options) {
    return model.insertMany(data, options);
};

let aggregateDataWithPopulate = function (model, group, populateOptions) {
    return new Promise((resolve, reject) => {
        model.aggregate(group, (err, data) => {

            if (err) {
                reject(err);
            }

            model.populate(data, populateOptions, function (err, populatedDocs) {

                if (err) {
                    reject(err);
                }
                resolve(populatedDocs); // This object should now be populated accordingly.
            });
        });
    });
};

let bulkFindAndUpdate = function (bulk, query, update, options) {
    bulk.find(query).upsert().update(update, options);
};

let bulkFindAndUpdateOne = function (bulk, query, update, options) {
    bulk.find(query).upsert().updateOne(update, options);
};


// =============== getting distinct records in array =======

let gettingDistinctValues = function (model, field, criteria) {
    return model.distinct(field, criteria);
};


module.exports = {
    saveData,
    getData,
    update,
    remove,
    removeMany,
    insert,
    insertMany,
    count,
    findOne,
    findAndUpdate,
    findAndRemove,
    populateData,
    populateOne,
    aggregateData,
    aggregateDataWithPopulate,
    bulkFindAndUpdate,
    bulkFindAndUpdateOne,
    gettingDistinctValues
};
