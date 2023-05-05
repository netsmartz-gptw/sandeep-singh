require("dotenv").config();

module.exports = {
  APP: {
    NAME: "RE-Sure",
  },
  SERVER: {
    HOST: "localhost",
    PORT: 8000,
    SOCKET_PORT: 8005,
    SCHEDULER_PORT: 8006,
  },
  API: {
    VERSIONS: {
      v1: "v1",
      v2: "v2",
    },
    BASE_PATH: process.env.BASE_PATH,
  },
  AWS: {
    S3: {
      BUCKET_NAME: "resureprojectbucket"
    }
  },
  AUTH_STRATEGIES: {
    PERSON: "Person",
    ADMIN: "Admin",
    ADMIN_PERSON: "Admin_Person",
    CBSR_SIGNATURE_LINK: "CBSR_SIGNATURE_LINK",
    NDA_FORM_LINK: "NDA_FORM_LINK",
  },
  CONTRACT: {
    CBSR_SIGNATURE_LINK: "CBSR_SIGNATURE_LINK",
  },
  JWT_SECRET: {
    Person: process.env.JWT_SECRET_AGENT,
    Admin: process.env.JWT_SECRET_ADMIN,
    NDAFromLink: process.env.JWT_SECRET_NDA_LINK,
    CBSR_Signature: process.env.JWT_SECRET_CBSR_SIGNATURE,
  },
  DATABASE: {
    DASHBOARD_CONSTANTS: {
      REMINDER: "REMINDER",
      SCHEDULE: "SCHEDULE",
    },
    DOCUMENT_TYPE: { DOCUMENT: "DOCUMENT", TEMPLATE: "TEMPLATE" },
    OFFER_DOCUMENT_PARTY_STATUS: { OFFER_DOC_DRAFT: "DRAFT", OFFER_DOC_SUBMITTED: "SUBMITTED", OFFER_DOC_ACTIVE: "ACTIVE", OFFER_DOC_CANCEL: "CANCELLED" },
    BUG_REPORT_STATUS: { ACTIVE: "ACTIVE", CLOSED: "CLOSED" },
    NOTIFICATIONS_STATUS: { ACTIVE: "ACTIVE", CLOSED: "CLOSED" },
    NDA_STATUS: { PENDING: "PENDING", COMPLETE: "COMPLETE" },
    CONTRACT_TYPE: { ERTS: "ERTS", CBSR: "CBSR", },
    PROPERTY_SCREEN_MODULE: { LISTINGS: "LISTINGS", OFFERS: "OFFERS", CURRENT: "CURRENT", PAST: "PAST", },
    CONTRACT_HTML: { TO_STR: `<div id="canvas" align="center">`, END_STR: `</div>` },
    CATEGORY_TYPE: { PRIMARY_CATEGORY: "PRIMARY_CATEGORY", SUB_CATEGORY: "SUB_CATEGORY", DOC_TYPE: "DOC_TYPE", },
    CALENDAR_HOLIDAYS: [{ eventName: "New Year's Day", eventDate: "2022-01-01", eventDay: "01", eventMonth: "01" }, {
      eventName: "Martin Luther King Jr. Day", eventDate: "2022-01-17", eventDay: "17", eventMonth: "01"
    }, {
      eventName: "Presidents Day and Washington's Birthday", eventDate: "2022-02-21", eventDay: "21", eventMonth: "02"
    }, {
      eventName: "Cesar Chavez Day", eventDate: "2022-03-31", eventDay: "31", eventMonth: "03"
    }, {
      eventName: "World MS Day", eventDate: "2022-05-30", eventDay: "30", eventMonth: "05"
    }, {
      eventName: "National Cheese Day", eventDate: "2022-06-04", eventDay: "04", eventMonth: "06"
    }, {
      eventName: "Labor Day", eventDate: "2022-09-05", eventDay: "05", eventMonth: "09"
    }, {
      eventName: "Mean Girls Day", eventDate: "2022-10-03", eventDay: "03", eventMonth: "10"
    }, {
      eventName: "Veterans Day", eventDate: "2022-11-11", eventDay: "11", eventMonth: "11"
    }, {
      eventName: "National Day Of Mourning", eventDate: "2022-11-24", eventDay: "24", eventMonth: "11"
    }, {
      eventName: "Boxing Day", eventDate: "2022-12-26", eventDay: "26", eventMonth: "12"
    }],
    CSV_FORMAT: ["Last Name1", "First Name1", "Middle Name1", "Nick Name1", "PhCell1", "Email1", "DOB1", "SSN1", "Address Street Number", "Address Street Direction", "Address Street Name", "Address City", "Address State", "Address Zip", "Address County", "Company Name",], // need to remove after crosscheck
    EMAIL_TYPE: { AGENT_REGISTRATION: "AGENT_REGISTRATION", PERSON_FORGOT_PASSWORD: "PERSON_FORGOT_PASSWORD", CUSTOMER_CREATION_BY_REALTOR: "CUSTOMER_CREATION_BY_REALTOR", CONTRACT_SIGN_LINK: "CONTRACT_SIGN_LINK", NDA_FORM_LINK: "NDA_FORM_LINK", NDA_PDF_FILE_MAIL: "NDA_PDF_FILE_MAIL", },
    FILE_TYPE: { IMAGE: "IMAGE", PDF: "PDF" },
    PROPERTY_CONSTANTS: { LIST_TYPE: { SELLING: "SELLING", BUYING: "BUYING", }, PROPERTY_TYPE: { REALTY_MOLE: "REALTY MOLE", RETS: "RETS", BOULDER: "BOULDER", ERTS_PROPERTY: "ERTS_PROPERTY", }, RESURE_STATUSES: { UC_PENDING_SHOWINGS: "UC_PENDING_SHOWINGS", COMING_SOON: "COMING_SOON", ACTIVE_UNDER_CONTRACT: "ACTIVE_UNDER_CONTRACT", ACTIVE: "ACTIVE", PENDING: "PENDING", CANCELLED: "CANCELLED", CLOSED: "CLOSED", EXPIRED: "EXPIRED", HOLD: "HOLD", WITHDRAWN: "WITHDRAWN", }, },
    CONTRACT_OFFER_CONSTANTS: {
      OFFER_TABLE_CONSTANTS: {
        FILTER_CONSTANTS: {
          SORT_BY: {
            PRICE: "PRICE",
            CLOSING_DATE: "CLOSING_DATE",
            DOWN_PAYMENT_AMOUNT: "DOWN_PAYMENT_AMOUNT",
            LOAN_TYPE: "LOAN_TYPE",
          },
          SORT_WAVE: {
            ASC: "ASC",
            DEC: "DEC",
          },
        },
      },
      OFFER_STATUSES: {
        ACCEPTED: "ACCEPTED",
        SUBMITTED: "SUBMITTED",
        CANCELLED: "CANCELLED",
        NOT_SUBMITTED: "NOT_SUBMITTED",
        REJECTED: "REJECTED",
        BACKUP: "BACKUP",
        COMPLETE: "COMPLETE",
        DRAFT: 'DRAFT'
      },
      OFFER_TYPE: {
        TEMPLATE: "TEMPLATE",
        OFFER: "OFFER",
      },
      LOAN_TYPE: {
        CASH: "134",
        CONVENTIONAL: "conventional",
        VA: "VA",
        FHA: "FHA",
      },
    },
    S3_FOLDER_OF: {
      PROFILE_PICTURES: "PROFILE_PICTURES",
      CONTRACT: "CONTRACT",
      PROPERTY_DOCS_PDF: "PROPERTY_DOCS_PDF",
      PROPERTY_DOCS_IMAGE: "PROPERTY_DOCS_IMAGE",
      PDF_DOC: "PDF_DOC",
      CATEGORY_IMAGES: "CATEGORY_IMAGES",
      PROPERTY_DOCS_PDF_THUMBNAIL: "PROPERTY_DOCS_PDF_THUMBNAIL",
      PROPERTY_IMAGES: "PROPERTY_IMAGES",
      SIGNATURE_IMAGE: 'SIGNATURE_IMAGE',
      NDA_PDF: 'NDA_PDF',
    },
    IMAGE_TYPE: {
      THUMBNAIL: "THUMBNAIL",
    },
    CONSTANT_TYPE: {
      SUGGESTION: "SUGGESTION",
      CLAUSE: "CLAUSE",
    },
    SOCKET: {
      EVENTTS: {
        CONNNECTION: "connection",
        CONNNECTED: "connected",
        SOCKET_ERROR: "socket error",
        PARAMETER_ERROR: "parameter error",
        DISCONNECT: "disconnect",
        MESSAGE: "message",
        RECEIVE_MESSAGE: "receive message",
      },
    },
    PERSON_ROLE: {
      CUSTOMER: "CUSTOMER",
      REALTOR: "REALTOR",
      MORTGAGE_BROKER: "MORTGAGE_BROKER",
      TITLE_CLOSER: "TITLE_CLOSER",
      TRANSACTION_COORDINATOR: "TRANSACTION_COORDINATOR",
    },
    SELLER_PARTY: {
      SELLER_AGENT: "SELLER_AGENT",
      SELLER: "SELLER"
    },
    BUYER_PARTY: {
      BUYER_AGENT: "BUYER_AGENT",
      BUYER: "BUYER"
    },
    DOC_STATUS: {
      UNBLOCKED: "UNBLOCKED",
      BLOCKED: "BLOCKED",
      DELETE: "DELETE",
    },
    CONTRACT_STATUS: {
      DRAFT: "DRAFT",
      CONFIRMED: "CONFIRMED",
    },
    TRANSACTION_TYPE: {
      TEMPLATE: "TEMPLATE",
      OFFER: "OFFER",
    },
    LANGUAGES: {
      EN: "EN",
    },
    EVENT_TYPE: {
      BUYER_SIGNED: "BUYER_SIGNED",
      BUYER_AGENT_SIGNED: "BUYER_AGENT_SIGNED",
      SELLER_SIGNED: "SELLER_SIGNED",
      SELLER_AGENT_SIGNED: "SELLER_AGENT_SIGNED",
    },
    NOTIFICATION: {
      PUSH_NOTIFICATION_TYPES: {
        OFFER_DOCUMENT_SUBMITTED: "OFFER_DOCUMENT_SUBMITTED",
        OFFER_DOCUMENT_CANCELLED: "OFFER_DOCUMENT_CANCELLED",
        OFFER_ACCEPTED: "OFFER_ACCEPTED",
      },
      USER: {
        EMAIL: {
          REGISTRATION: {
            TYPE: "AGENT_REGISTRATION",
            BODY: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>Resure</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            
              <style type="text/css">
                a[x-apple-data-detectors] {color: inherit !important;}
              </style>
            
            </head>
            <body style="margin: 0; padding: 0;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 20px 0 30px 0;">
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
              <tr>
                <td align="center" bgcolor="#446EB4" style="padding: 7px 0;border-bottom: 3px solid #fff;">
                  <img src="https://resureprojectbucket.s3.amazonaws.com/PROFILE_PICTURES/3resure-logo.png" alt="Creating Email Magic." width="50" style="display: block;" />
                </td>
              </tr>
              <tr>
              <td>
                  <img src="https://cdn.uconnectlabs.com/wp-content/uploads/sites/5/2017/11/Colleyville-real-estate.jpeg" style="width: 600px;height: 200px; object-fit: cover;max-width: 100%;">
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                    <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif;">
                        <h1 style="font-size: 24px; margin: 0;">Hi {{userName}},</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 0;">
                        <p>Welcome to RE-Sure!  Please click on the button below to verify your new account.</p>
                      </td>
                    </tr>
                <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 0;">
                        <a href={{verificationUrl}} style="background-color: #446EB4;color: #fff;padding: 10px 20px;display: inline-block;text-decoration: none;font-size: 16px;font-family: Arial, sans-serif;text-transform: uppercase;border-radius: 22px;margin: 5px 0;">Verification Link</a>
                      </td>
                    </tr>
                <tr>
                      <td>
                        <p style="color: #ac9e9e;font-size: 14px;font-family: Arial, sans-serif;">-Team Resure</p>
                      </td>
                    </tr>
                    <tr>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#CDAB3E" style="padding: 15px 15px;font-family: Arial, sans-serif;">
                    <p style="margin: 0; color:#fff; font-size:14px">Copyright ©2022 Re-sure. All rights reserved.</p>
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </table>
            </body>
            </html>
            `,
            SUBJECT: "Welcome to RE-Sure",
          },
          FORGOT_PASSWORD: {
            TYPE: "PERSON_FORGOT_PASSWORD",
            BODY: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>Resure</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            
              <style type="text/css">
                a[x-apple-data-detectors] {color: inherit !important;}
              </style>
            
            </head>
            <body style="margin: 0; padding: 0;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 20px 0 30px 0;">
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
              <tr>
                <td align="center" bgcolor="#446EB4" style="padding: 7px 0;border-bottom: 3px solid #fff;">
                  <img src="https://resureprojectbucket.s3.amazonaws.com/PROFILE_PICTURES/3resure-logo.png" alt="Creating Email Magic." width="50" style="display: block;" />
                </td>
              </tr>
              <tr>
              <td>
                  <img src="https://cdn.uconnectlabs.com/wp-content/uploads/sites/5/2017/11/Colleyville-real-estate.jpeg" style="width: 600px;height: 200px; object-fit: cover;max-width: 100%;">
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                    <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif;">
                        <h1 style="font-size: 24px; margin: 0;">Hi {{userName}},</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 0;">
                        <p>Your forgot password code is {{verificationCode}}.</p>
                      </td>
                    </tr>
                <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 0;">
                        <a href={{verificationUrl}} style="background-color: #446EB4;color: #fff;padding: 10px 20px;display: inline-block;text-decoration: none;font-size: 16px;font-family: Arial, sans-serif;text-transform: uppercase;border-radius: 22px;margin: 5px 0;">Verification Link</a>
                      </td>
                    </tr>
                <tr>
                      <td>
                        <p style="color: #ac9e9e;font-size: 14px;font-family: Arial, sans-serif;">-Team Resure</p>
                      </td>
                    </tr>
                    <tr>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#CDAB3E" style="padding: 15px 15px;font-family: Arial, sans-serif;">
                    <p style="margin: 0; color:#fff; font-size:14px">Copyright ©2022 Re-sure. All rights reserved.</p>
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </table>
            </body>
            </html>`,
            SUBJECT: "Reset password for RE-Sure",
          },
          CONTRACT_SIGN_LINK: {
            TYPE: "CONTRACT_SIGN_LINK",
            BODY: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>Resure</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            
              <style type="text/css">
                a[x-apple-data-detectors] {color: inherit !important;}
              </style>
            
            </head>
            <body style="margin: 0; padding: 0;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 20px 0 30px 0;">
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
              <tr>
                <td align="center" bgcolor="#446EB4" style="padding: 7px 0;border-bottom: 3px solid #fff;">
                  <img src="https://resureprojectbucket.s3.us-east-2.amazonaws.com/PROFILE_PICTURES/283resure-logo.png" alt="Creating Email Magic." width="50" style="display: block;" />
                </td>
              </tr>
              <tr>
              <td>
                  <img src="https://cdn.uconnectlabs.com/wp-content/uploads/sites/5/2017/11/Colleyville-real-estate.jpeg" style="width: 600px;height: 200px; object-fit: cover;max-width: 100%;">
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                    <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif;">
                      </td>
                    </tr>
                    <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 0;">
                        <p>{{firstMessage}}</p>
                        <p>{{secondMessage}}</p>
                      </td>
                    </tr>
                <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 0;">
                        <a href={{contractUrlLink}} style="background-color: #446EB4;color: #fff;padding: 10px 20px;display: inline-block;text-decoration: none;font-size: 16px;font-family: Arial, sans-serif;text-transform: uppercase;border-radius: 22px;margin: 5px 0;">Document Link</a>
                      </td>
                    </tr>
                <tr>
                      <td>
                        <p style="color: #ac9e9e;font-size: 14px;font-family: Arial, sans-serif;">-Team Resure</p>
                      </td>
                    </tr>
                    <tr>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#CDAB3E" style="padding: 15px 15px;font-family: Arial, sans-serif;">
                    <p style="margin: 0; color:#fff; font-size:14px">Copyright ©2022 Re-sure. All rights reserved.</p>
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </table>
            </body>
            </html>`,
            SUBJECT: "Contract Sign Link",
          },
          CUSTOMER_CREATION_BY_REALTOR: {
            TYPE: "CUSTOMER_CREATION_BY_REALTOR",
            BODY: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>Resure</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            
              <style type="text/css">
                a[x-apple-data-detectors] {color: inherit !important;}
              </style>
            
            </head>
            <body style="margin: 0; padding: 0;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 20px 0 30px 0;">
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
              <tr>
                <td align="center" bgcolor="#446EB4" style="padding: 7px 0;border-bottom: 3px solid #fff;">
                  <img src="https://resureprojectbucket.s3.amazonaws.com/PROFILE_PICTURES/3resure-logo.png" width="50" style="display: block;" />
                </td>
              </tr>
              <tr>
              <td>
                  <img src="https://cdn.uconnectlabs.com/wp-content/uploads/sites/5/2017/11/Colleyville-real-estate.jpeg" style="width: 600px;height: 200px; object-fit: cover;max-width: 100%;">
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                    <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif;">
                        <h1 style="font-size: 24px; margin: 0;">Hi {{customerName}},</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 0;">
                        <p>{{firstMessage}}.</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 0;">
                        <p>{{secondMessage}}.</p>
                      </td>
                    </tr>
                    
                <tr>
                <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 0;">
                  <a href={{link}} style="background-color: #446EB4;color: #fff;padding: 10px 20px;display: inline-block;text-decoration: none;font-size: 16px;font-family: Arial, sans-serif;text-transform: uppercase;border-radius: 22px;margin: 5px 0;">Link to App</a>
                </td>
              </tr>
                <tr>
                      <td>
                        <p style="color: #ac9e9e;font-size: 14px;font-family: Arial, sans-serif;">-Team Resure</p>
                      </td>
                    </tr>
                    <tr>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#CDAB3E" style="padding: 15px 15px;font-family: Arial, sans-serif;">
                    <p style="margin: 0; color:#fff; font-size:14px">Copyright ©2022 Re-sure. All rights reserved.</p>
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </table>
            </body>
            </html>`,
            SUBJECT: "Customer Profile Creation Request",
          },
          NDA_FORM_LINK: {
            TYPE: "NDA_FORM_LINK",
            BODY: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>Resure</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            
              <style type="text/css">
                a[x-apple-data-detectors] {color: inherit !important;}
              </style>
            
            </head>
            <body style="margin: 0; padding: 0;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 20px 0 30px 0;">
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
              <tr>
                <td align="center" bgcolor="#446EB4" style="padding: 7px 0;border-bottom: 3px solid #fff;">
                  <img src="https://resureprojectbucket.s3.amazonaws.com/PROFILE_PICTURES/3resure-logo.png" alt="Creating Email Magic." width="50" style="display: block;" />
                </td>
              </tr>
              <tr>
              <td>
                  <img src="https://cdn.uconnectlabs.com/wp-content/uploads/sites/5/2017/11/Colleyville-real-estate.jpeg" style="width: 600px;height: 200px; object-fit: cover;max-width: 100%;">
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                    <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif;">
                        <h1 style="font-size: 24px; margin: 0;">Hi {{firstName}},</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 0;">
                        <p>Please click on the following button to Verify the NDA form.</p>
                        <p>Thank you!</p>
                      </td>
                    </tr>
                <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 0;">
                        <a href={{NDAFormLink}} style="background-color: #446EB4;color: #fff;padding: 10px 20px;display: inline-block;text-decoration: none;font-size: 16px;font-family: Arial, sans-serif;text-transform: uppercase;border-radius: 22px;margin: 5px 0;">Verify NDA</a>
                      </td>
                    </tr>
                <tr>
                      <td>
                        <p style="color: #ac9e9e;font-size: 14px;font-family: Arial, sans-serif;">-Team Resure</p>
                      </td>
                    </tr>
                    <tr>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#CDAB3E" style="padding: 15px 15px;font-family: Arial, sans-serif;">
                    <p style="margin: 0; color:#fff; font-size:14px">Copyright ©2022 Re-sure. All rights reserved.</p>
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </table>
            </body>
            </html>
            `,
            SUBJECT: "NDA form RE-Sure",
          },
          NDA_PDF_FILE_MAIL: {
            TYPE: "NDA_PDF_FILE_MAIL",
            BODY: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>Resure</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            
              <style type="text/css">
                a[x-apple-data-detectors] {color: inherit !important;}
              </style>
            
            </head>
            <body style="margin: 0; padding: 0;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 20px 0 30px 0;">
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
              <tr>
                <td align="center" bgcolor="#446EB4" style="padding: 7px 0;border-bottom: 3px solid #fff;">
                  <img src="https://resureprojectbucket.s3.amazonaws.com/PROFILE_PICTURES/3resure-logo.png" alt="Creating Email Magic." width="50" style="display: block;" />
                </td>
              </tr>
              <tr>
              <td>
                  <img src="https://cdn.uconnectlabs.com/wp-content/uploads/sites/5/2017/11/Colleyville-real-estate.jpeg" style="width: 600px;height: 200px; object-fit: cover;max-width: 100%;">
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                    <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif;">
                        <h1 style="font-size: 24px; margin: 0;">Hi {{firstName}},</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 0;">
                        <p>Attached is the copy of NDA you just signed with HANA software, inc.</p>
                      </td>
                    </tr>
                <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 0;">
                        <a href={{NDAFormLink}} style="background-color: #446EB4;color: #fff;padding: 10px 20px;display: inline-block;text-decoration: none;font-size: 16px;font-family: Arial, sans-serif;text-transform: uppercase;border-radius: 22px;margin: 5px 0;">NDA Form Link</a>
                      </td>
                    </tr>
                <tr>
                      <td>
                        <p style="color: #ac9e9e;font-size: 14px;font-family: Arial, sans-serif;">-Team Resure</p>
                      </td>
                    </tr>
                    <tr>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#CDAB3E" style="padding: 15px 15px;font-family: Arial, sans-serif;">
                    <p style="margin: 0; color:#fff; font-size:14px">Copyright ©2022 Re-sure. All rights reserved.</p>
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </table>
            </body>
            </html>
            `,
            SUBJECT: "NDA contract PDF RE-Sure",
          }
        },
        PUSH: {},
        SMS: {
          OTP: {
            TYPE: "AGENT_OTP",
            BODY: `Your otp is {{otp}}.`,
          },
          FORGOT_PASSWORD: {
            TYPE: "AGENT_FORGOT_PASSWORD",
            BODY: `Hello {{userName}} please click on link {{verificationUrl}} to update your password to {{password}}.`,
          },
        },
      },
    },
  },

  CBSRArrangement: {
    rating: "rating",
    "Time To Decide": "Time To Decide",
    "MEC": "MEC",
    "MEC Time Remaining": "MEC Time Remaining",
    Price: "Price",
    "Highest Escalated Price": "Highest Escalated Price",
    "Down Payment": "Down Payment",
    "Earnest Money": "Earnest Money",
    "Loan Type": "Loan Type",
    "Point In Approval": "Point In Approval",
    Concessions: "Concessions",
    "Extra Inclusions": "Extra Inclusions",
    Exclusions: "Exclusions",
    "Closing Fee": "Closing Fee",
    "Status Letter": "Status Letter",
    "Record Change Fee": "Record Change Fee",
    "Water Transfer Fee": "Water Transfer Fee",
    "Due Diligence Docs": "Due Diligence Docs",
    "Posession Penalty": "Posession Penalty",
    "Inspection Objection Deadline": "Inspection Objection Deadline",
    "Inspection Termination Deadline": "Inspection Termination Deadline",
    "Loan Termination Deadline": "Loan Termination Deadline",
    "Props Ins Termination Deadline": "Props Ins Termination Deadline",
    "Additional Prov": "Additional Prov",
    "Closing Date": "Closing Date",
    "Posession Date": "Posession Date",
    "Rent Back Cost": "Rent Back Cost",
    "Rent Back Deposit": "Rent Back Deposit",
    "Items Suggested To Counter": "Items Suggested To Counter",
    "Offer Package Supplements": "Offer Package Supplements",
    Notes: "Notes",
  },
};
