const db = require('mongoose')
const Models = require("../models");
const {
  compareHashPassword,
  deleteObjKeys,
  randomStringGenerator,
} = require("../utils/universal-functions");
const RESPONSE_MESSAGES = require("../constants/responseMessage");
const {
  AUTH_STRATEGIES: { PERSON },
  DATABASE: {
    PERSON_ROLE: { CUSTOMER },
    EMAIL_TYPE: { AGENT_REGISTRATION, PERSON_FORGOT_PASSWORD, CUSTOMER_CREATION_BY_REALTOR }
  },

} = require("../constants/appDefaults");
const TokenManager = require("../lib/token-manager");
const { hashPassword, codeGenerator } = require("../utils/universal-functions");
const {
  createPersonFunc,
  getPersonPopulateFunc,
  updatePersonFunc,
  getPersonFunc,
  getPersonListForAdminFunc,
  updatePersonByAdminFunc,
  getRealtorCustomerListFunc,
  aggregateRealtorCustomerFunc,
  sendCustomerProfileCreationMailFunc,
  listAggregateCustomerFunc,
  upsertPersonFunc,
  aggregateCustomerFunc,
  deleteSoftCustomerFunc
} = require("../methods/person.methods");
const {
  sendEmailToPersonFunc,
} = require("../methods/email.methods");
const {
  createRoleFunc,
  listRolesFunc,
  getRoleFunc,
  upsertRoleFunc,
} = require("../methods/role.methods");
const { upsertOfficeFunc, getOfficeFunc } = require("../methods/office.methods");
const { listPhonesFunc, createPhoneFunc, upsertPhoneFunc } = require("../methods/phone.methods");
const { listAddressesFunc, createAddressFunc } = require("../methods/address.methods");
const { listPersonEventFunc } = require("../methods/personEvent.methods");


const personLogOut = async (payloadData, personData) => {
  try {
    let dataToUpdate = {
      deviceTokenToPull: payloadData.deviceToken
    }

    let dataToReturn = await updatePersonFunc(dataToUpdate, personData._id)
    return dataToReturn
  } catch (e) {
    throw e
  }
}

const personRegister = async (payloadData) => {

  let session = await db.startSession();

  try {
    session.startTransaction();
    let sessionObject = {}
    // let sessionObject = {...session}
    // hashing password
    payloadData.password = hashPassword(payloadData.password);
    if (payloadData.middleName) {
      payloadData.fullName = (`${payloadData.firstName} ${payloadData.middleName} ${payloadData.lastName}`).trim();
    } else {
      payloadData.fullName = (`${payloadData.firstName} ${payloadData.lastName}`).trim();
    }

    // formating dob
    payloadData.fullDate = payloadData.birthDate;
    payloadData.birthDay = payloadData.birthDate.getUTCDate();
    payloadData.birthMonth = payloadData.birthDate.getUTCMonth() + 1;
    payloadData.birthYear = payloadData.birthDate.getUTCFullYear();

    let createAgentData = await createPersonFunc(payloadData, sessionObject);
    if (createAgentData) {
      let dataToCreateRole = {
        personId: createAgentData._id,
        roleType: payloadData.roleType,
      };
      await createRoleFunc(dataToCreateRole, sessionObject);
      let [getAgentRole, officeData] = await Promise.all([listRolesFunc({ personId: createAgentData._id }), getOfficeFunc({ createdBy: createAgentData._id })])
      createAgentData = createAgentData.toObject();
      createAgentData.roles = getAgentRole;
      createAgentData.office = officeData

      if (payloadData.phoneNumber) {

        let dataToSave = {
          createdBy: createAgentData._id,
          personId: createAgentData._id,
          ...payloadData
        }
        await createPhoneFunc(dataToSave, sessionObject)
      }

      if (payloadData.city && payloadData.state) {

        let dataToSave = {
          createdBy: createAgentData._id,
          personId: createAgentData._id,
          ...payloadData
        }
        await createAddressFunc(dataToSave, sessionObject)
      }

      if (payloadData.deviceToken) {

        let dataToUpdate = {
          deviceToken: payloadData.deviceToken
        }

        await updatePersonFunc(dataToUpdate, createAgentData._id, sessionObject)
      }
    }


    createAgentData.accessToken = await TokenManager.generateAndUpdateTokenInfoInDb(
      Models.Persons,
      PERSON,
      createAgentData._id
    );

    // sending verification email
    await sendEmailToPersonFunc(
      AGENT_REGISTRATION,
      { userName: payloadData.firstName },
      payloadData.email,
      createAgentData
    );
    await session.commitTransaction();
    return createAgentData;

  } catch (e) {
    // console.log('++++', e)
    await session.abortTransaction();
    throw e
  } finally {
    session.endSession()
  }
};

// social signup pending

const personSocialSignup = async (payloadData) => {

  try {
    // hashing password
    payloadData.password = hashPassword(payloadData.password);
    if (payloadData.middleName) {
      payloadData.fullName = (`${payloadData.firstName} ${payloadData.middleName} ${payloadData.lastName}`).trim();
    } else {
      payloadData.fullName = (`${payloadData.firstName} ${payloadData.lastName}`).trim();
    }

    // formating dob
    payloadData.fullDate = payloadData.birthDate;
    payloadData.birthDay = payloadData.birthDate.getUTCDate();
    payloadData.birthMonth = payloadData.birthDate.getUTCMonth() + 1;
    payloadData.birthYear = payloadData.birthDate.getUTCFullYear();

    let createAgentData = await createPersonFunc(payloadData);
    if (createAgentData) {
      let dataToCreateRole = {
        personId: createAgentData._id,
        roleType: payloadData.roleType,
      };
      await createRoleFunc(dataToCreateRole);
      let [getAgentRole, officeData] = await Promise.all([listRolesFunc({ personId: createAgentData._id }), getOfficeFunc({ createdBy: createAgentData._id })])
      createAgentData = createAgentData.toObject();
      createAgentData.roles = getAgentRole;
      createAgentData.office = officeData

      if (payloadData.phoneNumber) {

        let dataToSave = {
          createdBy: createAgentData._id,
          personId: createAgentData._id,
          ...payloadData
        }
        await createPhoneFunc(dataToSave)
      }

      if (payloadData.city && payloadData.state) {

        let dataToSave = {
          createdBy: createAgentData._id,
          personId: createAgentData._id,
          ...payloadData
        }
        await createAddressFunc(dataToSave)
      }

      if (payloadData.deviceToken) {

        let dataToUpdate = {
          deviceToken: payloadData.deviceToken
        }

        await updatePersonFunc(dataToUpdate, createAgentData._id)
      }
    }


    createAgentData.accessToken = await TokenManager.generateAndUpdateTokenInfoInDb(
      Models.Persons,
      PERSON,
      createAgentData._id
    );

    // sending verification email
    await sendEmailToPersonFunc(
      AGENT_REGISTRATION,
      { userName: payloadData.firstName },
      payloadData.email,
      createAgentData
    );

    return createAgentData;
  } catch (e) {
    throw e;
  }
};
// social signup pending

let personLogin = async (payloadData) => {
  try {
    let criteria = {
      email: payloadData.email,
      clientTo: {$exists: false}
    };

    let personData = await getPersonFunc(criteria);
    if (!personData) {
      throw RESPONSE_MESSAGES.STATUS_MSG.ERROR.INVALID_EMAIL;
    }
    if (!personData.isActive) {
      return Promise.reject(RESPONSE_MESSAGES.STATUS_MSG.ERROR.ACCOUNT_BLOCKED)
    }

    if (!personData.isEmailVerified) {
      return Promise.reject(RESPONSE_MESSAGES.STATUS_MSG.ERROR.VERIFY_EMAIL_FIRST)
    }

    if (!!personData && personData._id) {
      let [personPasswordData, personRoleData, officeData] = await Promise.all([
        getPersonPopulateFunc({ email: personData.email }),
        listRolesFunc({ personId: personData._id }),
        getOfficeFunc({ createdBy: personData._id })
      ]);

      if (personPasswordData.length) personPasswordData = personPasswordData[0];
      personPasswordData.roles = personRoleData;
      personPasswordData.office = officeData;
      if (
        compareHashPassword(payloadData.password, personPasswordData.password)
      ) {
        // generating token
        personPasswordData.accessToken = await TokenManager.generateAndUpdateTokenInfoInDb(
          Models.Persons,
          PERSON,
          personPasswordData._id
        );
        if (payloadData.deviceToken) {

          let dataToUpdate = {
            deviceToken: payloadData.deviceToken
          }

          await updatePersonFunc(dataToUpdate, personData._id)
        }

        return deleteObjKeys(personPasswordData, ["__v", "password", "deviceTokens", "passwordVerificationProcess"]);
      } else {
        throw RESPONSE_MESSAGES.STATUS_MSG.ERROR.INVALID_PASSWORD;
      }
    } else {
      throw RESPONSE_MESSAGES.STATUS_MSG.ERROR.INVALID_EMAIL;
    }
  } catch (err) {
    throw err;
  }
};

let emailVerification = async (payloadData) => {
  try {
    let { timestamp, userId, emailId } = payloadData;

    if (timestamp < Date.now()) return Promise.reject(RESPONSE_MESSAGES.STATUS_MSG.ERROR.LINK_EXPIRED);
    let emailData = await getPersonFunc({
      _id: userId,
      email: emailId
    });
    if (emailData) {
      if (emailData.isEmailVerified) {
        return Promise.reject(
          RESPONSE_MESSAGES.STATUS_MSG.ERROR.EMAIL_ALREADY_VERIFIED
        );
      } else {
        await updatePersonFunc({ isEmailVerified: true }, emailData._id);
        return;
      }
    } else {
      return Promise.reject(
        RESPONSE_MESSAGES.STATUS_MSG.ERROR.EMAIL_DOESNT_EXISTS
      );
    }
  } catch (e) {
    throw e;
  }
};

let updatePerson = async (payloadData, personData) => {
  try {
    if (payloadData.middleName !== "") {
      payloadData.fullName = (`${payloadData.firstName} ${payloadData.middleName} ${payloadData.lastName}`).trim();
    } else {
      payloadData.fullName = (`${payloadData.firstName} ${payloadData.lastName}`).trim();
    }
    await updatePersonFunc(
      payloadData,
      personData._id
    );
    let [personUpdatedData, personRole] = await Promise.all([getPersonFunc({ _id: personData._id }), listRolesFunc({ personId: personData._id })])
    let dataToSend = personUpdatedData
    // if(payloadData.office) {
    //   let officeObject = {
    //     ...payloadData.office,
    //     createdBy: personData._id,
    //     ownerId: personData._id
    //   }
    //   await upsertOfficeFunc(officeObject)
    //   let officeData = await getOfficeFunc({createdBy: personData._id})
    //   dataToSend.office = officeData
    // }
    dataToSend.roles = personRole
    return deleteObjKeys(dataToSend, ["__v", "password"]);
  } catch (e) {
    throw e;
  }
};

let updateProfileOfCustomerByRealtor = async (payloadData, personData) => {
  try {
    let { firstName, lastName, middleName } = payloadData
    if (!!firstName && !!lastName) {
      if (!!middleName) payloadData.fullName = (`${firstName} ${middleName} ${lastName}`).trim();
      else payloadData.fullName = (`${firstName} ${lastName}`).trim();
    }
    await updatePersonFunc(
      payloadData,
      payloadData.personId
    );

    let [personUpdatedData, personRole] = await Promise.all([getPersonFunc({ _id: payloadData.personId }), listRolesFunc({ personId: payloadData.personId })])
    return personUpdatedData
  } catch (e) {
    throw e
  }
}

let changePassword = async (payloadData, personData) => {
  try {
    if (compareHashPassword(payloadData.oldPassword, personData.password)) {
      let dataToUpdate = {
        password: hashPassword(payloadData.newPassword),
      };
      let personProfileUpdateData = await updatePersonFunc(
        dataToUpdate,
        personData._id
      );
      return personProfileUpdateData;
    } else {
      return Promise.reject(
        RESPONSE_MESSAGES.STATUS_MSG.ERROR.INVALID_OLD_PASSWORD
      );
    }
  } catch (e) {
    throw e;
  }
};

let forgetPasswordInit = async (preData, payloadData) => {
  try {
    let { emailValidation } = preData;
    let verificationCode = await codeGenerator();
    await updatePersonFunc(
      {
        "passwordVerificationProcess.code": verificationCode,
        "passwordVerificationProcess.state": true,
        "passwordVerificationProcess.timestamps": Date.now(),
      },
      emailValidation._id
    );
    await sendEmailToPersonFunc(
      PERSON_FORGOT_PASSWORD,
      { verificationCode, userName: emailValidation.firstName },
      emailValidation.email,
      {}
    );
  } catch (e) {
    throw e;
  }
};

let codeVerification = async (preData, payloadData) => {
  try {
    let { emailValidation } = preData;
    let getPersonData = await getPersonFunc({
      email: emailValidation.email,
    });
    if (
      getPersonData &&
      getPersonData.passwordVerificationProcess.state &&
      getPersonData.passwordVerificationProcess.code === payloadData.code
    ) {
      return true;
    } else {
      return Promise.reject(RESPONSE_MESSAGES.STATUS_MSG.ERROR.INVALID_OTP);
    }
  } catch (e) {
    throw e;
  }
};

let passwordChange = async (preData, payloadData) => {
  try {
    let { emailValidation } = preData
    let dataToUpdate = {
      password: await hashPassword(payloadData.password),
      "passwordVerificationProcess.state": false,
    };
    let personProfileUpdateData = await updatePersonFunc(
      dataToUpdate,
      emailValidation._id
    );
    return personProfileUpdateData;
  } catch (e) {
    throw e;
  }
};

let getPerson = async (paramsData, personData) => {
  try {
    let [personData, personPhoneData, personAddressData, personEventData] = await Promise.all([getPersonFunc({ _id: paramsData.personId }), listPhonesFunc({ personId: paramsData.personId }), listAddressesFunc({ personId: paramsData.personId }), listPersonEventFunc({ personId: paramsData.personId })])
    let personUpdatedAt = personData.updatedAt
    let addressUpdatedAt = personAddressData.length ? personAddressData[0].updatedAt : null
    let phoneUpdatedAt = personPhoneData.length ? personPhoneData[0].updatedAt : null

    // console.log('+++++++++++', personAddressData)

    let profileUpdatedAt = Math.max(personUpdatedAt, addressUpdatedAt, phoneUpdatedAt)
    return {
      ...personData,
      profileUpdatedAt,
      phoneData: personPhoneData.length ? personPhoneData[0] : {},
      addressData: personAddressData.length ? personAddressData[0] : {},
      eventData: personEventData
    }
  } catch (e) {
    throw e
  }
}

let updatedPersonProfileData = async (personData) => {
  try {
    let dataToReturn = personData
    let [officeData, personRole, personPhoneData, addressData] = await Promise.all([getOfficeFunc({ createdBy: personData._id }), listRolesFunc({ personId: personData._id }), listPhonesFunc({ personId: personData._id }), listAddressesFunc({ personId: personData._id })])
    dataToReturn.phoneData = personPhoneData.length ? personPhoneData[0] : {},
      dataToReturn.addressData = addressData.length ? addressData[0] : {},
      dataToReturn.officeData = officeData ? officeData : {},
      dataToReturn.roles = personRole
    return dataToReturn
  } catch (e) {
    throw e
  }
}

let getPersonListForAdmin = async (queryData, personData) => {
  try {
    let getPersonListData = await getPersonListForAdminFunc(queryData)
    return getPersonListData
  } catch (e) {
    throw e
  }
}

let updatePersonByAdmin = async (paramsData, payloadData, personData) => {
  try {
    let getPersonListData = await updatePersonByAdminFunc(paramsData, payloadData)
    return getPersonListData
  } catch (e) {
    throw e
  }
}

let getRealtorCustomerList = async (personData) => {
  try {
    let aggregateRealtorCustomerListData = await aggregateRealtorCustomerFunc(personData)
    return { ...aggregateRealtorCustomerListData[0] }
  } catch (e) {
    throw e
  }
}


let getCustomerList = async (queryData, personData) => {
  try {
    let criteria = {
      ...queryData,
      personId: personData._id
    }
    let aggregateCustomerListData = await aggregateCustomerFunc(criteria)
    return aggregateCustomerListData
  } catch (e) {
    throw e
  }
}

let deleteCustomer = async (paramsData, personData) => {
  try {
    let criteria = {
      ...paramsData,
      personId: personData._id
    }
    let deleteData = await deleteSoftCustomerFunc(criteria)
    return deleteData
  } catch (e) {
    throw e
  }
}

// let personCSVDataUpload = async (payloadData, personData) => {
//   try{
//     // console.log('IIIIIIIIIIII', payloadData.file)

//     let csvData = await formatCSVDataFunc(payloadData.file.path)
//     if(csvData.length){
//     // console.log(csvData)
//       for(let client of csvData) {
//         let criteria = {
//           email: client.email,
//           // personId: personData._id,
//         }
//         let personExistsCheck = await getPersonFunc(criteria)
//         if(!personExistsCheck){
//           let dataToSave = {
//             ...client, 
//             profileCreatedMethod: 'CSV',
//           // profileCreatedBy: personData._id,
//           }
//           let clientData = await createRealtorCustomerFunc(dataToSave)
//           await Promise.all([createAddressFunc({...client.addressData, realtorCustomerId: clientData._id}), createPhoneFunc({...client.phoneData, realtorCustomerId: clientData._id})])
//         }
//       }
//     }
//     return csvData
//   }catch(e){
//     throw e 
//   }
// }

// contact list clients
let createCustomerFromContacts = async (payloadData, personData) => {
  try {
    let createdCustomerList = []
    for (let contact of payloadData.contacts) {
      if (contact.firstName && contact.lastName && contact.middleName && contact.middleName !== "") {
        contact.fullName = (`${contact.firstName} ${contact.middleName} ${contact.lastName}`).trim();
      } else {
        contact.fullName = (`${contact.firstName} ${contact.lastName}`).trim();
      }

      contact.profileCreatedBy = personData._id
      contact.clientTo = personData._id

      let criteria = {
        clientTo: personData._id,
        profileCreatedBy: personData._id,
      }

      if (contact.email && contact.email !== "") criteria.email = contact.email
      if (contact.firstName && contact.firstName !== "") criteria.firstName = contact.firstName
      if (contact.lastName && contact.lastName !== "") criteria.lastName = contact.lastName
      let createdPersonData = await upsertPersonFunc(criteria, contact);
      if (createdPersonData) {
        let dataToCreateRole = {
          personId: createdPersonData._id,
          roleType: CUSTOMER,
        };
        // createdPersonData.passwordGenerated = passwordGenerated
        await upsertRoleFunc(dataToCreateRole, dataToCreateRole);
        // await sendCustomerProfileCreationMailFunc(createdPersonData);
      }

      if (contact.countryCode && contact.phoneNumber) {

        let criteriaPhone = {
          createdBy: personData._id,
          personId: createdPersonData._id,
        }
        if (contact.phoneNumber && contact.phoneNumber !== "") criteriaPhone.phoneNumber = contact.phoneNumber

        let dataToSave = {
          createdBy: personData._id,
          personId: createdPersonData._id,
          ...contact
        }
        await upsertPhoneFunc(criteriaPhone, dataToSave)
      }
      createdCustomerList.push(createdPersonData)
    } 
    return createdCustomerList

  } catch (e) {
    throw e
  }
}

// used in the profile creation while import url
let createPerson = async (payloadData, personData) => {
  try {
    if (payloadData.firstName && payloadData.lastName && payloadData.middleName && payloadData.middleName !== "") {
      payloadData.fullName = (`${payloadData.firstName} ${payloadData.middleName} ${payloadData.lastName}`).trim();
    } else {
      payloadData.fullName = (`${payloadData.firstName} ${payloadData.lastName}`).trim();
    }

    // formating dob
    if (payloadData.birthDate) payloadData.fullDate = payloadData.birthDate;
    if (payloadData.birthDate) payloadData.birthDay = payloadData.birthDate.getUTCDate();
    if (payloadData.birthDate) payloadData.birthMonth = payloadData.birthDate.getUTCMonth() + 1;
    if (payloadData.birthDate) payloadData.birthYear = payloadData.birthDate.getUTCFullYear();
    payloadData.profileCreatedBy = personData._id
    // payloadData.profileCreatedByRealtor = true
    // payloadData.isEmailVerified = true
    // let passwordGenerated = await randomStringGenerator()
    // payloadData.password = hashPassword(passwordGenerated)
    let criteria = {
      clientTo: personData._id,
      profileCreatedBy: personData._id,
    }
    let createdPersonData = await upsertPersonFunc(criteria, payloadData); // person-rel work
    if (createdPersonData) {
      let dataToCreateRole = {
        personId: createdPersonData._id,
        roleType: CUSTOMER,
      };
      // createdPersonData.passwordGenerated = passwordGenerated
      await upsertRoleFunc(dataToCreateRole, dataToCreateRole);
      // await sendCustomerProfileCreationMailFunc(createdPersonData);
    }

    if (payloadData.areaCode && payloadData.phoneNumber) {

      let criteriaPhone = {
        createdBy: personData._id,
        personId: createdPersonData._id,
      }
      if (payloadData.phoneNumber && payloadData.phoneNumber !== "") criteriaPhone.phoneNumber = payloadData.phoneNumber

      let dataToSave = {
        createdBy: personData._id,
        personId: createdPersonData._id,
        ...payloadData
      }
      await upsertPhoneFunc(criteriaPhone, dataToSave)
    }
    return createdPersonData
  } catch (e) {
    throw e
  }
}

let getPersonSearch = async (queryData, personData) => {
  try {
    queryData.clientTo = personData._id
    let personCustomerSearch = await listAggregateCustomerFunc(queryData)
    if (personCustomerSearch) {
      return personCustomerSearch;
    } else {
      return Promise.reject(
        RESPONSE_MESSAGES.STATUS_MSG.ERROR.NO_CUSTOMER_FOUND
      );
    }
  } catch (e) {
    throw e;
  }
};

// plus sign clients
let createCustomerThroughPlus = async (payloadData, personData) => {
  try {
    if (payloadData.firstName && payloadData.lastName && payloadData.middleName && payloadData.middleName !== "") {
      payloadData.fullName = (`${payloadData.firstName} ${payloadData.middleName} ${payloadData.lastName}`).trim();
    } else {
      payloadData.fullName = (`${payloadData.firstName} ${payloadData.lastName}`).trim();
    }

    // formating dob
    if (payloadData.birthDate) payloadData.fullDate = payloadData.birthDate;
    if (payloadData.birthDate) payloadData.birthDay = payloadData.birthDate.getUTCDate();
    if (payloadData.birthDate) payloadData.birthMonth = payloadData.birthDate.getUTCMonth() + 1;
    if (payloadData.birthDate) payloadData.birthYear = payloadData.birthDate.getUTCFullYear();
    payloadData.profileCreatedBy = personData._id
    payloadData.clientTo = personData._id
    // payloadData.profileCreatedByRealtor = true
    // payloadData.isEmailVerified = true
    // let passwordGenerated = await randomStringGenerator()
    // payloadData.password = hashPassword(passwordGenerated)
    let criteria = {
      email: payloadData.email,
      clientTo: personData._id,
      profileCreatedBy: personData._id,
    }
    console.log('+++++++++++++++++++++++', criteria, payloadData)
    let createdPersonData = await upsertPersonFunc(criteria, payloadData);
    if (createdPersonData) {
      let dataToCreateRole = {
        personId: createdPersonData._id,
        roleType: CUSTOMER,
      };
      // createdPersonData.passwordGenerated = passwordGenerated
      await upsertRoleFunc(dataToCreateRole, dataToCreateRole);
      // await sendCustomerProfileCreationMailFunc(createdPersonData);
    }

    if (payloadData.countryCode && payloadData.phoneNumber) {

      let criteriaPhone = {
        createdBy: personData._id,
        personId: createdPersonData._id,
      }
      if (payloadData.phoneNumber && payloadData.phoneNumber !== "") criteriaPhone.phoneNumber = payloadData.phoneNumber

      let dataToSave = {
        createdBy: personData._id,
        personId: createdPersonData._id,
        ...payloadData
      }
      await upsertPhoneFunc(criteriaPhone, dataToSave)
    }
    return createdPersonData
  } catch (e) {
    throw e
  }
}

module.exports = {
  personLogOut,
  personRegister,
  personSocialSignup,
  personLogin,
  updatePerson,
  emailVerification,
  changePassword,
  forgetPasswordInit,
  codeVerification,
  passwordChange,
  createCustomerThroughPlus, // in other file, would delete in future
  createPerson,
  getPerson,
  updatedPersonProfileData,
  getPersonListForAdmin,
  updatePersonByAdmin,
  updateProfileOfCustomerByRealtor,
  getRealtorCustomerList, // need to remove
  getCustomerList,
  getPersonSearch,
  // personCSVDataUpload // in other file, would delete in future,

  createCustomerFromContacts,
  deleteCustomer
};
