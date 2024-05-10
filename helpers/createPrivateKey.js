"use strict"

const crypto = require("crypto");

const secret = crypto.randomBytes(32).toString("hex");

console.log(secret); //31e9df117acdeff67501c570fa0e3bf905476272b6685cee4f18d139dee2d18e
