const { Persons, OfferDocuments } = require('../models')
const { aggregateData, findAndUpdate, saveData, findOne, populateData, aggregateDataWithPopulate, getData } = require('../dao/queries')
const UniversalFunctions = require('../utils/universal-functions')
const { DATABASE: {
  EMAIL_TYPE: { CUSTOMER_CREATION_BY_REALTOR },
  PERSON_ROLE: {
    CUSTOMER,
  }
} } = require('../constants/appDefaults')
const mongoose = require('mongoose')
const { sendEmail } = require("../lib/email-manager");

let createPersonFunc = async (dataToCreate, options = {}) => {
  return saveData(Persons, dataToCreate, options)
}


let upsertPersonFunc = async (criteria, dataToSave) => {

  let setQuery = {
    $set: {
      ...dataToSave,
      updatedDateMili: Date.now(),
      updatedAt: Date.now(),
    },
    $setOnInsert: {
      isDeleted: false,
      createdDateMili: Date.now(),
    }
  }

  let options = {
    lean: true,
    upsert: true,
    new: true
  }

  let upsertData = await findAndUpdate(Persons, criteria, setQuery, options)
  return upsertData
}

let getPersonFunc = async (getCriteria, projection = {}) => {
  let criteria = {}
  if (getCriteria.email) criteria.email = getCriteria.email
  if (getCriteria._id) criteria._id = getCriteria._id
  if (getCriteria.personId) criteria.profileCreatedBy = getCriteria.personId

  projection = {
    ...projection
  }
  let options = {
    lean: true
  }

  let listData = await findOne(Persons, criteria, projection, options)
  return listData
}


let getPersonPopulateFunc = async (getCriteria) => {
  let criteria = {}
  if (getCriteria.email) {
    criteria.email = getCriteria.email
  }

  let projection = {}
  let options = {
    lean: true
  }

  let populateArray = [{
    path: 'emailId',
    select: 'email',
    model: 'Emails'
  }]

  let listData = await populateData(Persons, criteria, projection, options, populateArray)
  return listData
}

let updatePersonFunc = async (dataToUpdate, _id, options = {}) => {
  let criteria = {
    _id
  }

  let dataToSet = {
    $set: dataToUpdate
  }

  if (dataToUpdate.deviceToken) dataToSet.$addToSet = { deviceTokens: dataToUpdate.deviceToken }
  if (dataToUpdate.deviceTokenToPull) dataToSet.$pull = { deviceTokens: dataToUpdate.deviceTokenToPull }

  options = {
    ...options,
    lean: true,
    new: true
  }
  let updatedData = await findAndUpdate(Persons, criteria, dataToSet, options)
  return updatedData
}


let getEmailValidationFunc = async (getCriteria) => {
  let criteria = {}
  if (getCriteria.personId) {
    criteria._id = getCriteria.personId
  }
  if (getCriteria.email) {
    criteria.email = getCriteria.email
  }

  let projection = {}
  let options = {
    lean: true
  }
  // console.log(criteria, projection, options)
  let listData = await findOne(Persons, criteria, projection, options)
  return listData
}

let getPersonListForAdminFunc = async (criteria) => {
  let pipeline = []
  let lookupRoleObject = {
    $lookup: {
      from: 'roles',
      localField: '_id',
      foreignField: 'personId',
      as: 'rolesData'
    }
  }
  let lookupContractOfferDocumentsObject = {
    $lookup: {
      from: 'contractOfferDocuments',
      localField: '_id',
      foreignField: 'personId',
      as: 'contractTransactionData'
    }
  }

  let unwindRoleObject = {
    $unwind: "$rolesData"
  }

  let matchSearchObject = {
    $match: {
      "rolesData.roleType": CUSTOMER,
      isActive: criteria.isActive || false
      // $or: [
      //     {
      //       email: new RegExp(
      //         UniversalFunctions.escapeRegex(criteria.search),
      //         "i"
      //       ),
      //     },
      //     {
      //       fullName: new RegExp(
      //         UniversalFunctions.escapeRegex(criteria.search),
      //         "i"
      //       ),
      //     },
      //     {
      //       firstName: new RegExp(
      //         UniversalFunctions.escapeRegex(criteria.search),
      //         "i"
      //       ),
      //     },
      //     {
      //       middleName: new RegExp(
      //         UniversalFunctions.escapeRegex(criteria.search),
      //         "i"
      //       ),
      //     },
      //     {
      //       lastName: new RegExp(
      //         UniversalFunctions.escapeRegex(criteria.search),
      //         "i"
      //       ),
      //     }]
    }
  }

  let projectObject = {
    $project: {
      _id: 1,
      profileImg: 1,
      fullName: 1,
      createdAt: 1,
      phoneNumber: 1,
      email: 1,
      isActive: 1,
      isEmailVerified: 1,
    }
  }

  let sortObject = {
    $sort: { createdAt: -1 },
  };

  let skipObject = {
    $skip: criteria.skip,
  };

  let limitObject = {
    $limit: criteria.limit,
  };

  if (criteria.search) pipeline.push(lookupRoleObject)
  if (criteria.search) pipeline.push(unwindRoleObject)
  if (criteria.search) pipeline.push(matchSearchObject)
  pipeline.push(projectObject)
  pipeline.push(sortObject)
  pipeline.push(skipObject)
  pipeline.push(limitObject)

  // console.log(JSON.stringify(pipeline))
  let listPerson = await aggregateData(Persons, pipeline)
  return listPerson
}

let updatePersonByAdminFunc = async (criteriaData, dataToUpdateJson) => {
  let criteria = {}
  if (criteriaData.personId) criteria._id = criteriaData.personId

  let dataToUpdate = {}
  if (dataToUpdateJson.isActive === true || dataToUpdateJson.isActive === false) dataToUpdate.isActive = dataToUpdateJson.isActive
  if (dataToUpdateJson.isEmailVerified === true || dataToUpdateJson.isEmailVerified === false) dataToUpdate.isEmailVerified = dataToUpdateJson.isEmailVerified

  let options = {
    lean: true,
    new: true
  }
  let updateData = await findAndUpdate(Persons, criteria, { $set: dataToUpdate }, options)
  return updateData
}

let getRealtorCustomerListFunc = async (personData) => {
  let criteria = { profileCreatedBy: personData._id }

  let projection = { firstName: 1, lastName: 1, middleName: 1, fullName: 1, _id: 1, profileImg: 1 }
  let options = {
    lean: true,
    sort: { _id: -1 }
  }

  let data = await getData(Persons, criteria, projection, options)
  return data
}

let aggregateRealtorCustomerFunc = async (personData) => {
  let timestampToSplit = Date.now() - 60 * 24 * 3600000
  let pipeline = []
  let matchCriteria = {
    $match: {
      clientTo: personData._id,
      isDeleted: false
    }
  }
  let lookupDocuments = {
    $lookup: {
      "from": "offerdocuments",
      "let": { "clientId": "$_id" },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              $or: [{ "$in": ["$$clientId", "$buyerIds"] },
              { "$in": ["$$clientId", "$sellerIds"] }],
              // buyerDocumentStatus: {$ne: 'DRAFT' },
            }
          }
        },
        {
          "$project": {
            "updatedAt": "$updatedAt", _id: "$_id"
          }
        }
      ],
      "as": "clientDocumentArray"
    }
  }

  let unwindDocuments = {
    $unwind: {
      path: "$clientDocumentArray",
      preserveNullAndEmptyArrays: true,
    },
  }

  let sortByDate = {
    $sort: {
      "timestampUpdatedAt": -1
    }
  }

  let addFields = {
    $addFields: {
      timestampUpdatedAt: {
        "$toLong": "$updatedAt"
      }
    }
  }

  let groupClient = {
    $group: {
      _id: "$_id",
      "firstName": { $first: "$firstName" },
      "lastName": { $first: "$lastName" },
      "middleName": { $first: "$middleName" },
      "profileImg": { $first: "$profileImg" },
      "fullName": { $first: "$fullName" },
      "updatedAt": { $first: "$clientDocumentArray.updatedAt" },
    }
  }

  let facetOutput = {
    $facet: {
      activeClients: [{
        $match: {
          "timestampUpdatedAt": { $gt: timestampToSplit }
        }
      }],
      nonActiveClients: [{
        $match: {
          $or: [{ "timestampUpdatedAt": { $lt: timestampToSplit } }, { timestampUpdatedAt: null }]

        }
      }],
    }
  }

  pipeline.push(matchCriteria)
  pipeline.push(lookupDocuments)
  pipeline.push(unwindDocuments)
  pipeline.push(groupClient)
  pipeline.push(addFields)
  pipeline.push(sortByDate)
  pipeline.push(facetOutput)

  // console.log('QUERY+++++++++', JSON.stringify(pipeline))
  let result = await aggregateData(Persons, pipeline)
  return result
}

let aggregateCustomerFunc = async (personData) => {
  let timestampToSplit = Date.now() - 60 * 24 * 3600000
  let pipeline = []
  let matchObjectForCriteria = {
    clientTo: personData.personId,
    isDeleted: false
  }

  if (personData.search) {
    matchObjectForCriteria.$or = [{
      firstName: new RegExp(UniversalFunctions.escapeRegex(personData.search), "i")
    },
    {
      lastName: new RegExp(UniversalFunctions.escapeRegex(personData.search), "i")
    }]
  }

  let matchCriteria = {
    $match: matchObjectForCriteria
  }
  let lookupDocuments = {
    $lookup: {
      "from": "offerdocuments",
      "let": { "clientId": "$_id" },
      "pipeline": [
        { "$match": { "$expr": { $or: [{ "$in": ["$$clientId", "$buyerIds"] }, { "$in": ["$$clientId", "$sellerIds"] }] } } },
        {
          "$project": {
            "updatedAt": "$updatedAt", _id: "$_id"
          }
        }
      ],
      "as": "clientDocumentArray"
    }
  }

  let unwindDocuments = {
    $unwind: {
      path: "$clientDocumentArray",
      preserveNullAndEmptyArrays: true,
    },
  }

  let sortByDate = {
    $sort: {
      "timestampUpdatedAt": -1
    }
  }

  let addFields = {
    $addFields: {
      timestampUpdatedAt: {
        "$toLong": "$updatedAt"
      }
    }
  }

  let groupClient = {
    $group: {
      _id: "$_id",
      "firstName": { $first: "$firstName" },
      "lastName": { $first: "$lastName" },
      "middleName": { $first: "$middleName" },
      "profileImg": { $first: "$profileImg" },
      "fullName": { $first: "$fullName" },
      "updatedAt": { $first: "$clientDocumentArray.updatedAt" },
    }
  }

  let matchObject = {}

  if (personData.listType === 'ACTIVE') matchObject.timestampUpdatedAt = { $gt: timestampToSplit }
  if (personData.listType === 'NON-ACTIVE') matchObject.$or = [{ timestampUpdatedAt: { $lt: timestampToSplit } }, { timestampUpdatedAt: null }]
  let matchTimestamp = {
    $match: matchObject
  }

  let skip = {
    $skip: personData.skip
  }
  let limit = {
    $limit: personData.limit
  }

  pipeline.push(matchCriteria)
  pipeline.push(lookupDocuments)
  pipeline.push(unwindDocuments)
  pipeline.push(groupClient)
  pipeline.push(addFields)
  pipeline.push(sortByDate)
  pipeline.push(matchTimestamp)
  pipeline.push(skip)
  pipeline.push(limit)

  let result = await aggregateData(Persons, pipeline)
  return result
}

let sendCustomerProfileCreationMailFunc = async (customerData) => {
  let customerMailData = {}
  customerMailData.email = customerData.email;
  customerMailData.firstMessage = `Context: RE-Sure realtor have created a profile on RE-Sure app with email ${customerData.email}. `;
  customerMailData.secondMessage = `Your temporary password for the app login is ${customerData.passwordGenerated}`
  customerMailData.link = process.env.BASE_PATH
  sendEmail(
    CUSTOMER_CREATION_BY_REALTOR,
    customerMailData,
    customerData.email
  )
}

let listAggregateCustomerFunc = async (criteria) => {
  let pipeline = []
  let lookupRoleObject = {
    $lookup: {
      from: 'roles',
      localField: '_id',
      foreignField: 'personId',
      as: 'rolesData'
    }
  }

  let unwindRoleObject = {
    $unwind: "$rolesData"
  }

  let matchSearchObject = {
    $match: {
      "rolesData.roleType": CUSTOMER,
      "isDeleted": false,
      clientTo: criteria.clientTo
    }
  }


  if (criteria.search !== "") {
    matchSearchObject.$match.$or = [
      {
        email: new RegExp(
          UniversalFunctions.escapeRegex(criteria.search),
          "i"
        ),
      },
      {
        fullName: new RegExp(
          UniversalFunctions.escapeRegex(criteria.search),
          "i"
        ),
      },
      {
        firstName: new RegExp(
          UniversalFunctions.escapeRegex(criteria.search),
          "i"
        ),
      },
      {
        middleName: new RegExp(
          UniversalFunctions.escapeRegex(criteria.search),
          "i"
        ),
      },
      {
        lastName: new RegExp(
          UniversalFunctions.escapeRegex(criteria.search),
          "i"
        ),
      }]
  }

  let projectObject = {
    $project: {
      _id: 1,
      firstName: 1,
      lastName: 1,
      middleName: 1,
      email: 1,
    }
  }

  let sortObject = {
    $sort: {
      firstName: 1
    }
  }

  let skipObject = {
    $skip: criteria.skip,
  };

  let limitObject = {
    $limit: criteria.limit,
  };

  pipeline.push(lookupRoleObject)
  pipeline.push(unwindRoleObject)
  pipeline.push(matchSearchObject)
  pipeline.push(projectObject)
  pipeline.push(sortObject)
  pipeline.push(skipObject)
  pipeline.push(limitObject)

  // console.log(JSON.stringify(pipeline))
  let listPerson = await aggregateData(Persons, pipeline)
  return listPerson
}

let deleteSoftCustomerFunc = async (deleteCriteria) => {
  let criteria = {}
  if (deleteCriteria.customerId) criteria._id = deleteCriteria.customerId

  let update = {
    $set: {
      isDeleted: true
    }
  }

  let options = {
    new: true
  }

  let deleteUpdateData = await findAndUpdate(Persons, criteria, update, options)
  return deleteUpdateData
}

let aggregateClientListFunc = async (criteriaObject) => {
  let pipeline = []

  let matchCriteria = {
      $match: {
          clientTo: criteriaObject.personId
      }
  }
  let addFields = {
      $addFields: {
          timestampToCompare: "$birthDate",
          birthDay: { "$dayOfMonth": { $toDate: "$birthDate" } },
          birthMonth: { "$month": { $toDate: "$birthDate" } },
          birthYear: { "$year": { $toDate: "$birthDate" } },
      }
  }

  
  let matchObject = {}
  if(criteriaObject.responseType === 'YEAR') matchObject = {
      birthYear: criteriaObject.yearForCriteria,
  }

  if(criteriaObject.responseType === 'DAY') matchObject = {
    birthDay: criteriaObject.day,
    birthMonth: criteriaObject.month
  }
  let matchCriteriaBirthday = {
      $match: matchObject
  }

  let project = {
      $project: {
          "clientId": "$_id",
          "birthDate": "$birthDate",
          "birthDay": "$birthDay",
          "birthMonth": "$birthMonth",
          "birthYear": "$birthYear",
          "profileImg": 1,
          "firstName": 1,
          "lastName": 1,
          "timestampToCompare": "$timestampToCompare",
          type: "BIRTHDAY"
      }
  }

  pipeline.push(matchCriteria)
  pipeline.push(addFields)
  pipeline.push(matchCriteriaBirthday)
  pipeline.push(project)

  console.log('+++b', JSON.stringify(pipeline))

  let dataToReturn = await aggregateData(Persons, pipeline)
  return dataToReturn
}

module.exports = {
  createPersonFunc,
  upsertPersonFunc,
  getPersonFunc,
  getPersonPopulateFunc,
  updatePersonFunc,
  getEmailValidationFunc,
  getPersonListForAdminFunc,
  updatePersonByAdminFunc,
  getRealtorCustomerListFunc,
  aggregateRealtorCustomerFunc,
  aggregateCustomerFunc,
  sendCustomerProfileCreationMailFunc,
  listAggregateCustomerFunc,
  deleteSoftCustomerFunc,
  aggregateClientListFunc
}
