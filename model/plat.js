const mongo=require("mongoose");
const Schema=mongo.Schema;
const Plat=new Schema({
    name:String,
    id:Number,
    Price:Number,
    IdRestaurant:Number
});
module.exports=mongo.model("plat", Plat);