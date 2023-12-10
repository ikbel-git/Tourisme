const mongo = require("mongoose");
const Schema = mongo.Schema;
const UserTwig = new Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user', 
    },

});
module.exports = mongo.model("user", UserTwig);
