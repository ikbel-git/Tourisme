var mongo=require("mongoose");
const schema= mongo.Schema;

const Animateur =new schema({
    name:String,
    age:Number,
    tel:Number

});

module.exports= mongo.model("animateur",Animateur); 