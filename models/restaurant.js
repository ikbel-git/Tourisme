const mongo=require("mongoose");
const Schema=mongo.Schema;
const Restaurant=new Schema({
    name:String,
    localisation:String
});
module.exports=mongo.model("restaurant", Restaurant);