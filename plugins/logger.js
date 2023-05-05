// let logger = {
//     plugin: require('hapi-pino'),
//     options: {
//       prettyPrint: true,
//       // Redact Authorization headers, see https://getpino.io/#/docs/redaction
//       redact: ['req.headers', 'res.headers'],
//       logPayload: true,
//       logQueryParams: true,
//     //   logRequestStart: true,
//     //   logRequestComplete: true
//     }
//   }
const pino = require('hapi-pino')

exports.plugin = {
  plugin: require('hapi-pino'),
  options: {
    prettyPrint: true,
    // Redact Authorization headers, see https://getpino.io/#/docs/redaction
    redact: ['req.headers', 'res.headers'],
    // logPayload: true,
    logQueryParams: true,
    allTags: pino.Level
    // tags: ({ [error in pino.Level]?: string })
    //   logRequestStart: true,
    //   logRequestComplete: true
  }
}
