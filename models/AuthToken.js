"use strict"

const mongoose = require("mongoose");

const authTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    token: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "1h"
    }
});

const AuthToken = mongoose.model("AuthToken", authTokenSchema)


module.exports = AuthToken;