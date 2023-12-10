const mongo = require('mongoose');
const Schema = mongo.Schema;
const Ticket =new Schema({
    eventname : String,
    owner : String, 
    ticketnb : Number,
});
module.exports= mongo.model("ticket", Ticket);