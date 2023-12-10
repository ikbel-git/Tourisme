const mongo = require('mongoose');
const Schema = mongo.Schema;
const Evenement =new Schema({
    nom : String,
    place : String,
    nbticket : Number,
    description : String,
});
module.exports= mongo.model("evenement", Evenement);