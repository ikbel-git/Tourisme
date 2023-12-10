const Ticket=require("../model/ticket");

async function addt (req, res, next){
    try{
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.send("Ticket add")
    } catch (err){
        console.log(err);
    }
}

async function showt (req, res, next) {
    try{
      const data = await Ticket.find();
      res.json(data);
    }catch(err){
      console.log(err);
    }
  }

  async function dletet (req, res, next) {
    try{
      await Ticket.findByIdAndDelete(req.params.id, req.body);
      res.send('removed');
    } catch (err) {
      console.log(err);
    }
  }

  async function updatet (req, res, next) {
    try{
      await Ticket.findByIdAndUpdate(req.params.id, req.body);
      res.send("updated");
    } catch (err) {
      console.log(err);
    }
  }

  async function addticket(data) {
    try {
      const ticket = new Ticket({
        eventname :data.nom ,
        owner :data.owner , 
        ticketnb : data.ticket,
         
      });
      console.log("jjjjj" + JSON.stringify(data));
      await ticket.save();
      //res.status(200).send("add good partie");
    } catch (err) {
      console.log(err);
    }
  }

module.exports= {addt, showt, dletet , updatet, addticket};