var mongo = require("mongoose");
const Schema= mongo.Schema;
const Produit=new Schema({
    name:String,
    price:Number,
    stock:Number
});
module.exports=mongo.model("produit",Produit);
  