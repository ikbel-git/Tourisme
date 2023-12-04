var mongo=require("mongoose");
const schema= mongo.Schema;

const Categorie =new schema({
    title:String,
    description:String,
    nbplace:Number,

});

module.exports= mongo.model("categorie",Categorie); 