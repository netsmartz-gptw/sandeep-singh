// npm modules
const nodeMailerModule = require("nodemailer")
const AWS = require('aws-sdk');

// constants imported
const {
  APP: { NAME },
  DATABASE: {
    NOTIFICATION: {
      USER: {
        EMAIL: {
          REGISTRATION: {
            TYPE: AGENT_REGISTRATION_TYPE,
            BODY: AGENT_REGISTRATION_BODY,
            SUBJECT: AGENT_REGISTRATION_SUBJECT,
          },
          CONTRACT_SIGN_LINK: {
            TYPE: CONTRACT_SIGN_LINK_TYPE,
            BODY: CONTRACT_SIGN_LINK_BODY,
            SUBJECT: CONTRACT_SIGN_LINK_SUBJECT,
          },
          FORGOT_PASSWORD: {
            TYPE: PERSON_FORGOT_PASSWORD_TYPE,
            BODY: PERSON_FORGOT_PASSWORD_BODY,
            SUBJECT: PERSON_FORGOT_PASSWORD_SUBJECT,
          },
          CUSTOMER_CREATION_BY_REALTOR: {
            TYPE: CUSTOMER_CREATION_BY_REALTOR_TYPE,
            BODY: CUSTOMER_CREATION_BY_REALTOR_BODY,
            SUBJECT: CUSTOMER_CREATION_BY_REALTOR_SUBJECT,
          },
          NDA_FORM_LINK: {
            TYPE: NDA_FORM_LINK_TYPE,
            BODY: NDA_FORM_LINK_BODY,
            SUBJECT: NDA_FORM_LINK_SUBJECT,
          },
          NDA_PDF_FILE_MAIL: {
            TYPE: NDA_PDF_FILE_MAIL_TYPE,
            BODY: NDA_PDF_FILE_MAIL_BODY,
            SUBJECT: NDA_PDF_FILE_MAIL_SUBJECT,
          }
        },
      },
    },
  },
} = require("../constants/appDefaults");

// config
const { USER: { FROM_EMAIL }, AWS_SES: { accessKeyId, secretAccessKey } } = require("../config/email-conf");

// local modules
const UniversalFunctions = require("../utils/universal-functions");

let transporter = nodeMailerModule.createTransport({
  SES: new AWS.SES({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: 'us-east-2',
    apiVersion: "2010-12-01"
  })
});

const sendEmail = async function (emailType, emailVariables, emailId) {
  let mailOptions = {
    from: FROM_EMAIL,
    priority: "high",
  };

  if (typeof emailId === "object") {
    mailOptions.bcc = emailId.toString();
  } else {
    mailOptions.to = emailId;
  }
  // console.log('++++++++',NDA_PDF_FILE_MAIL_TYPE,  emailType, emailVariables)
  switch (emailType) {
    case AGENT_REGISTRATION_TYPE:
      mailOptions.subject = AGENT_REGISTRATION_SUBJECT;
      mailOptions.html = await UniversalFunctions.replaceTextPlaceholderContent(
        AGENT_REGISTRATION_BODY,
        emailVariables
      );
      break;
    case PERSON_FORGOT_PASSWORD_TYPE:
      mailOptions.subject = PERSON_FORGOT_PASSWORD_SUBJECT;
      mailOptions.html = await UniversalFunctions.replaceTextPlaceholderContent(
        PERSON_FORGOT_PASSWORD_BODY,
        emailVariables
      );
      break;
    case CONTRACT_SIGN_LINK_TYPE:
      mailOptions.subject = CONTRACT_SIGN_LINK_SUBJECT;
      mailOptions.html = await UniversalFunctions.replaceTextPlaceholderContent(
        CONTRACT_SIGN_LINK_BODY,
        emailVariables
      );
      break;
    case CUSTOMER_CREATION_BY_REALTOR_TYPE:
      mailOptions.subject = CUSTOMER_CREATION_BY_REALTOR_SUBJECT;
      mailOptions.html = await UniversalFunctions.replaceTextPlaceholderContent(
        CUSTOMER_CREATION_BY_REALTOR_BODY,
        emailVariables
      );
      break;
    case NDA_FORM_LINK_TYPE:
      mailOptions.subject = NDA_FORM_LINK_SUBJECT;
      mailOptions.html = await UniversalFunctions.replaceTextPlaceholderContent(
        NDA_FORM_LINK_BODY,
        emailVariables
      );
      break;
    case NDA_PDF_FILE_MAIL_TYPE:
      mailOptions.subject = NDA_PDF_FILE_MAIL_SUBJECT;
      mailOptions.html = await UniversalFunctions.replaceTextPlaceholderContent(
        NDA_PDF_FILE_MAIL_BODY,
        emailVariables
      );
      mailOptions.attachments = [{
        filename: emailVariables.pdfFileName,
        path: emailVariables.pdfUrl,
        // filename: 'test.pdf',
        // path: 'https://resureprojectbucket.s3.us-east-2.amazonaws.com/6181253f24205b6c66783dc1/NDA_PDF/1635853945144.pdf',
        contentType: 'application/pdf'
      }]
      break;
    default:
      throw "Invalid Email Type.";
  }

  return await sendMailViaTransporter(mailOptions);
};

async function sendMailViaTransporter(mailOptions, level = 1) {
  // console.log('mailOptions', mailOptions)
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('++++++++++++', info.messageId)
    // console.info(`Mail Sent Callback info:${JSON.stringify(info)}`);
  } catch (err) {
    if (level < 4) {
      await sendMailViaTransporter(mailOptions, level + 1);
    } else {
      console.log('+++++1err', err)
      // console.info(`Mail Sent Callback error:${JSON.stringify(err)}`);
    }
  }
}


// sendEmail('NDA_PDF_FILE_MAIL', {}, 'sandeepworkmail5@yopmail.com')

module.exports = {
  sendEmail,
};
