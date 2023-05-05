"use strict";

module.exports = [
  require("./swagger"),
  require("./hapi-auth-jwt2"),
  require("@hapi/vision"),
  require("@hapi/inert"),
  require("./logger").plugin,
];
