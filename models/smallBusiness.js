const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BusinessSchema = new Schema({
    name: String,
    adresse: String,
    contact: String,
    produits: [{ type: Schema.Types.ObjectId, ref: 'produit' }]
});

module.exports = mongoose.model("Business", BusinessSchema);


/*var mongo = require("mongoose");
const Schema= mongo.Schema;
const Business=new Schema({
    name:String,
    adresse:String,
    contact:String,
    produits: [
        { type: Schema.Types.ObjectId, ref: 'produit'}//, ref: 'produit' }
      ]
});
module.exports=mongo.model("business",Business);*/
  