module.exports = {
    STATUS_MSG: {
        SUCCESS: {
            DEFAULT: {
                statusCode: 200,
                message: {
                    en: 'Success'
                },
                type: 'DEFAULT'
            },
            SUCCESS: {
                statusCode: 200,
                message: {
                    en: 'Success.'
                },
                type: 'SUCCESS'
            },
            CREATED: {
                statusCode: 201,
                message: {
                    en: 'Successfully created.'
                },
                type: 'CREATED'
            },
            UPDATED: {
                statusCode: 201,
                message: {
                    en: 'Successfully updated.'
                },
                type: 'UPDATED'
            }
        },
        ERROR: {INVALID_OTP: {
            statusCode: 400,
            message: {
                en: `Incorrect OTP.`
            },
            type: 'INVALID_OTP'
        },OTP_EXPIRED: {
            statusCode: 400,
            message: {
                en: `OTP expired.`
            },
            type: 'OTP_EXPIRED'
        },ID_TYPE_ALREADY_CREATED: {
            statusCode: 400,
            message: {
                en: `id type already created.`
            },
            type: 'ID_TYPE_ALREADY_CREATED'
        },
            ID_ASSIGNED_TO_OTHER_PROFILE: {
                statusCode: 400,
                message: {
                    en: `id assigned registered with other profile.`
                },
                type: 'ID_ASSIGNED_TO_OTHER_PROFILE'
            },
            TEMPLATE_NAME_ALREADY_EXIST: {
                statusCode: 400,
                message: {
                    en: `Template Name already exists, try with a new one.`
                },
                type: 'TEMPLATE_NAME_ALREADY_EXIST'
            },
            ROLE_CREATED_ALREADY: {
                statusCode: 400,
                message: {
                    en: `Role already created for the user. `
                },
                type: 'ROLE_CREATED_ALREADY'
            },
            EMAIL_DOESNT_REGISTERED: {
                statusCode: 400,
                message: {
                    en: `Email Id not registered with us. `
                },
                type: 'EMAIL_DOESNT_REGISTERED'
            },
            PUSH_TYPE_MISMATCH: {
                statusCode: 400,
                message: {
                    en: `Push type doesn't matched`
                },
                type: 'PUSH_TYPE_MISMATCH'
            },
            PHONE_OR_EMAIL_INFO_REQUIRED: {
                statusCode: 400,
                message: {
                    en: 'Phone no or Email info is required.'
                },
                type: 'PHONE_OR_EMAIL_INFO_REQUIRED'
            },
            FILE_UPLOAD: {
                VIDEO_DURATION_ERROR: {
                    statusCode: 400,
                    type: 'VIDEO_DURATION_ERROR',
                    message: {
                        en: 'Video should be of atleast 3 seconds.'
                    }
                }
            },
            INVALID_TOKEN_FIELD: {
                statusCode: 400,
                message: {
                    en: 'Token type must be of Bearer type.'
                },
                type: 'INVALID_TOKEN_TYPE'
            },
            INVALID_TOKEN_TYPE: {
                statusCode: 400,
                message: {
                    en: 'Token type must be of Bearer type.'
                },
                type: 'INVALID_TOKEN_TYPE'
            },
            INVALID_TOKEN: {
                statusCode: 401,
                message: {
                    en: 'Your session has been expired.'
                },
                type: 'UNAUTHORIZED'
            },
            UNAUTHORIZED: {
                statusCode: 401,
                message: {
                    en: 'You are not authorized to perform this action.'
                },
                type: 'UNAUTHORIZED'
            },
            ONELOGIN_TOKEN_NOT_COMES: {
                statusCode: 500,
                message: {
                    en: 'Sorry token is not given by one login.'
                },
                type: 'ONELOGIN_TOKEN_NOT_COMES'
            },
            SOMETHING_WENT_WRONG_ONELOGIN: {
                statusCode: 500,
                message: {
                    en: 'Something went wrong on onelogin side.'
                },
                type: 'SOMETHING_WENT_WRONG_ONELOGIN'
            },
            IMPLEMENTATION_ERROR: {
                statusCode: 512,
                message: {
                    en: 'Implementation Error.'
                },
                type: 'IMPLEMENTATION_ERROR'
            },
            SOMETHING_WENT_WRONG: {
                statusCode: 500,
                message: {
                    en: 'Something went wrong on server.'
                },
                type: 'SOMETHING_WENT_WRONG'
            },
            DB_ERROR: {
                statusCode: 400,
                message: {
                    en: 'DB Error : '
                },
                type: 'DB_ERROR'
            },
            DUPLICATE: {
                statusCode: 400,
                message: {
                    en: 'Duplicate Entry'
                },
                type: 'DUPLICATE'
            },
            INVALID_EMAIL: {
                statusCode: 400,
                message: {
                    en: 'Email does not exist.'
                },
                type: 'INVALID_EMAIL'
            },
            NOTHING_TO_UPDATE: {
                statusCode: 400,
                message: {
                    en: 'Sorry nothing is provided to update.'
                },
                type: 'NOTHING_TO_UPDATE'
            },
            INVALID_OLD_PASSWORD: {
                statusCode: 400,
                message: {
                    en: 'Sorry invalid old password.'
                },
                type: 'INVALID_OLD_PASSWORD'
            },
            OLD_NEW_PASSWORD_NOT_BE_SAME: {
                statusCode: 400,
                message: {
                    en: 'Sorry old and new password should be different.'
                },
                type: 'OLD_NEW_PASSWORD_NOT_BE_SAME'
            },
            INVALID_EMAIL_VERIFICATION_TOKEN: {
                statusCode: 400,
                message: {
                    en: 'Sorry the verification token is invalid.'
                },
                type: 'INVALID_EMAIL_VERIFICATION_TOKEN'
            },
            PHONE_NO_ALREADY_VERIFIED: {
                statusCode: 400,
                message: {
                    en: 'Sorry your phone no is already verified.'
                },
                type: 'PHONE_NO_ALREADY_VERIFIED'
            },
            VERIFY_EMAIL_FIRST: {
                statusCode: 400,
                message: {
                    en: 'Email id is not verified yet, please visit to the email link we have send you to your email address.'
                },
                type: 'VERIFY_EMAIL_FIRST'
            },
            ACCOUNT_BLOCKED: {
                statusCode: 400,
                message: {
                    en: 'Sorry your account is deactivated by admin, Please contact admin to deactivate.'
                },
                type: 'ACCOUNT_BLOCKED'
            },
            INVALID_OTP: {
                statusCode: 400,
                message: {
                    en: 'Sorry otp is invalid.'
                },
                type: 'INVALID_OTP'
            },
            EMAIL_DOESNT_EXISTS:{
                statusCode: 400,
                message: {
                    en: 'Sorry your email is doesnt exists in our database.'
                },
                type: 'EMAIL_DOESNT_EXISTS'
            },
            EMAIL_ALREADY_VERIFIED: {
                statusCode: 400,
                message: {
                    en: 'Sorry your email is already verified.'
                },
                type: 'EMAIL_ALREADY_VERIFIED'
            },
            EMAIL_ALREADY_EXISTS: {
                statusCode: 400,
                message: {
                    en: 'Email is already exists.'
                },
                type: 'EMAIL_ALREADY_EXISTS'
            },
            USER_EXISTS_WITH_DIFFERENT_ROLE: {
                statusCode: 400,
                message: {
                    en: 'User exists with different role'
                },
                type: 'USER_EXISTS_WITH_DIFFERENT_ROLE'
            },
            PROFILE_NOT_CREATED_BY_YOU:{
                statusCode: 400,
                message: {
                    en: 'Profile of this customer is not created by you.'
                },
                type: 'PROFILE_NOT_CREATED_BY_YOU'
            },
            NO_CUSTOMER_FOUND: {
                statusCode: 400,
                message: {
                    en: 'No customer found with same email and role as a customer.'
                },
                type: 'NO_CUSTOMER_FOUND'
            },
            LINK_EXPIRED: {
                statusCode: 400,
                message: {
                    en: 'Link is expired.'
                },
                type: 'LINK_EXPIRED'
            },
            PHONE_NO_NOT_EXIST: {
                statusCode: 400,
                message: {
                    en: 'Sorry this phone no. does not exist.'
                },
                type: 'PHONE_NO_NOT_EXIST'
            },
            INVALID_PASSWORD: {
                statusCode: 400,
                message: {
                    en: 'Invalid password.'
                },
                type: 'INVALID_PASSWORD'
            },
            ACCOUNT_BLOCKED: {
                statusCode: 400,
                message: {
                    en: 'Sorry your account is blocked by Admin.'
                },
                type: 'ACCOUNT_BLOCKED'
            },
            INVALID_ID: {
                statusCode: 400,
                message: {
                    en: 'Invalid id provided.'
                },
                type: 'INVALID_ID'
            },
            INVALID_USER: {
                statusCode: 400,
                message: {
                    en: 'This user is no longer exist.'
                },
                type: 'INVALID_USER'
            },
            INVALID_STYLIST: {
                statusCode: 400,
                message: {
                    en: 'This stylist is no longer exist.'
                },
                type: 'INVALID_STYLIST'
            },
            APP_ERROR: {
                statusCode: 400,
                message: {
                    en: 'Application Error.'
                },
                type: 'APP_ERROR'
            },
            SUBSCRIPTION: {
                ADMIN: {
                    SUBSCRIPTION_DUPLICATE: {
                        statusCode: 400,
                        message: {
                            en: 'Subscription with this name already exist.'
                        },
                        type: 'SUBSCRIPTION_DUPLICATE'
                    }
                }
            },
            SERVICE_CATEGORY_ERROR: {
                ADMIN: {
                    CATEGORY_DUPLICATE: {
                        statusCode: 400,
                        message: {
                            en: 'Record with this name already exist.'
                        },
                        type: 'CATEGORY_DUPLICATE'
                    },
                    INVALID_SERVICE_CATEGORY: {
                        statusCode: 400,
                        message: {
                            en: 'This category id not exist.'
                        },
                        type: 'INVALID_SERVICE_CATEGORY'
                    },
                    INVALID_PARENT_SERVICE_CATEGORY: {
                        statusCode: 400,
                        message: {
                            en: 'This parent category id not exist.'
                        },
                        type: 'INVALID_PARENT_SERVICE_CATEGORY'
                    }
                },
                STYLIST: {
                    INVALID_SERVICE_CATEGORY: {
                        statusCode: 400,
                        message: {
                            en: 'This admin service id is not exist.'
                        },
                        type: 'INVALID_SERVICE_CATEGORY'
                    },
                    INVALID_SERVICE_ID: {
                        statusCode: 400,
                        message: {
                            en: 'This service is already exist.'
                        },
                        type: 'DUPLICATE_STYLIST_SERVICE'
                    },
                    DUPLICATE_STYLIST_SERVICE: {
                        statusCode: 400,
                        message: {
                            en: 'This service is already exist.'
                        },
                        type: 'DUPLICATE_STYLIST_SERVICE'
                    }
                }
            },
            STYLIST_SERVICES: {
                INVALID_SERVICES_IDS: {
                    statusCode: 400,
                    message: {
                        en: 'Some services are invalid.'
                    },
                    type: 'INVALID_SERVICES_IDS'
                }
            },
            STYLIST: {
                CANNOT_UPDATE_IF_NOT_SERVICE_PROVIDER: {
                    statusCode: 400,
                    message: {
                        en: 'You cannnot update service related information such as serviceType,service acceptence on same date or availablity untill not providing service.'
                    },
                    type: 'CANNOT_UPDATE_IF_NOT_SERVICE_PROVIDER'
                },
                SALOON_NAME_REQ: {
                    statusCode: 400,
                    message: {
                        en: 'Saloon name is required..'
                    },
                    type: 'SALOON_NAME_REQ'
                },
                INVALID_PHONE_NO: {
                    statusCode: 400,
                    message: {
                        en: 'This phone no is invalid.'
                    },
                    type: 'INVALID_PHONE_NO'
                },
                INVALID_MEMBER_ID: {
                    statusCode: 400,
                    message: {
                        en: 'Invalid member id.'
                    },
                    type: 'INVALID_MEMBER_ID'
                },
                EMAIL_EXIST: {
                    statusCode: 400,
                    message: {
                        en: 'This email is already exist.'
                    },
                    type: 'EMAIL_EXIST'
                },
                PHONE_NO_EXIST: {
                    statusCode: 400,
                    message: {
                        en: 'This phone no is already exist.'
                    },
                    type: 'PHONE_NO_EXIST'
                }
            },
            CREDIT_TRANSACTION: {
                INVALID_TXN_TYPE: {
                    statusCode: 400,
                    message: {
                        en: 'Invalid transaction type.'
                    },
                    type: 'INVALID_TXN_TYPE'
                }
            },
            USER: {
                INVALID_USER_ADDRESS_ID: {
                    statusCode: 400,
                    message: {
                        en: 'This addressId is invalid.'
                    },
                    type: 'INVALID_USER_ADDRESS_ID'
                },
                INVALID_PHONE_NO: {
                    statusCode: 400,
                    message: {
                        en: 'This phone no is invalid.'
                    },
                    type: 'INVALID_PHONE_NO'
                },
                INVALID_REFERRAL_CODE: {
                    statusCode: 400,
                    message: {
                        en: 'This referral code is invalid.'
                    },
                    type: 'INVALID_REFERRAL_CODE'
                },
                PROVIDE_EMAIL_OR_PHONE_NO: {
                    statusCode: 400,
                    message: {
                        en: 'Plsease provide atleast email or contact details.'
                    },
                    type: 'PROVIDE_EMAIL_OR_PHONE_NO'
                },
                INTEREST_EXIST: {
                    statusCode: 400,
                    message: {
                        en: 'This ineterst is already exist.'
                    },
                    type: 'INTEREST_EXIST'
                },
                SOME_INTEREST_EXIST: {
                    statusCode: 400,
                    message: {
                        en: 'Some inetersts are already exist.'
                    },
                    type: 'SOME_INTEREST_EXIST'
                },
                EMAIL_EXIST: {
                    statusCode: 400,
                    message: {
                        en: 'This email is already exist.'
                    },
                    type: 'EMAIL_EXIST'
                },
                PHONE_NO_EXIST: {
                    statusCode: 400,
                    message: {
                        en: 'This phone no is already exist.'
                    },
                    type: 'PHONE_NO_EXIST'
                }
            },
            SERVICE_CATEGORY: {
                DUPLICATE_STYLIST_SERVICE: {
                    statusCode: 400,
                    message: {
                        en: 'This service is already exist.'
                    },
                    type: 'DUPLICATE_STYLIST_SERVICE'
                },
                INVALID_SERVICE_CATEGORY: {
                    statusCode: 400,
                    message: {
                        en: 'This category id not exist.'
                    },
                    type: 'INVALID_SERVICE_CATEGORY'
                },
                SOME_INVALID_SERVICE_CATEGORY: {
                    statusCode: 400,
                    message: {
                        en: 'Some category ids are not exist.'
                    },
                    type: 'SOME_INVALID_SERVICE_CATEGORY'
                },
                INVALID_SERVICE_ID: {
                    statusCode: 400,
                    message: {
                        en: 'This service id not exist.'
                    },
                    type: 'INVALID_SERVICE_ID'
                }
            }
        }
    }
};
