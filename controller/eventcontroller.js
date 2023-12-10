const Evenement=require("../model/evenement");
const Ticket = require("../model/ticket");

async function adde (req, res, next){
    try{
        const evenement = new Evenement(req.body);
        await evenement.save();
        res.send("Evenement add")
    } catch (err){
        console.log(err);
    }
}

async function showe (req, res, next) {
    try{
      const data = await Evenement.find();
      res.json(data);
    }catch(err){
      console.log(err);
    }
  }

  async function dletee (req, res, next) {
    try{
      await Evenement.findByIdAndDelete(req.params.id, req.body);
      res.send('removed');
    } catch (err) {
      console.log(err);
    }
  }

  async function updatee (req, res, next) {
    try{
      await Evenement.findByIdAndUpdate(req.params.id, req.body);
      res.send("updated");
    } catch (err) {
      console.log(err);
    }
  }

  async function addevent(data) {
    try {
      const evenement = new Evenement({
          nom:data.nom,
          place:data.place,
          nbticket:data.tickets,
          description:data.description
      });
      console.log("jjjjj" + JSON.stringify(data));
      await evenement.save();
      //res.status(200).send("add good partie");
    } catch (err) {
      console.log(err);
    }
  }
  async function affichet(){
    try{
     const d = await Evenement.find();
      return d;
    }catch(err){
      console.log(err);
    }
  }

 async function additionticket(data){
    try {
    
      const eve = await Evenement.findOne({ name: data.nom });
      const  n = eve.nbticket-data.ticket
     eve.nbticket=n
     
      await eve.save();
      //res.status(200).send("add good partie");
    } catch (err) {
      console.log(err);
    }
  }

module.exports= {adde, showe, dletee , updatee, addevent, affichet, additionticket};