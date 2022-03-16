const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    user_name: {
        type: String,
    },

    user_pass: {
        type: String,
    },
});

module.exports = AuthUser = mongoose.model("authusers", UserSchema);