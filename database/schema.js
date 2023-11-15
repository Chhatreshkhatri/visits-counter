const mongoose = require("mongoose");

module.exports = mongoose.model("visitsBadge", new mongoose.Schema({
    uniqueID: String,
    passKey: String,
    visitsCount: {
        type: Number,
        default: 0,
    },
}));