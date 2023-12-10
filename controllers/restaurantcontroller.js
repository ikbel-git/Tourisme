const Restaurant = require("../model/restaurant"); 

async function add (req, res, next){
  try{
      const restaurant=new Restaurant(req.body);
      await restaurant.save();
      res.status(200).send("restaurant add");
  }catch(err){
      console.log(err)
  }
}
async function show(req, res, next) {
    try{
      const data = await Restaurant.find();
      res.json(data);
    }
    catch(err){
      console.log(err);
    }
  }

  async function update(req, res, next){
    try{
      await Restaurant.findByIdAndUpdate(req.params.id, req.body);
      res.send("update");
    }
    catch(err){
      console.log(err);
    }
  }

  async function deleted (req, res, next){
    try{
      await Restaurant.findByIdAndDelete(req.params.id, req.body);
      res.json("remove");
    }
    catch(err){
      console.log(err);
    }
  }

  async function showbyid(req, res, next){
    try{
      const data = await Restaurant.findById(req.params.id, req.body);
      res.json(data);
    }
    catch(err){
      console.log(err);
    }
  }
  

  async function showbyname(req, res, next){
    try{
      const data = await Restaurant.findOne(req.params);
      res.send(data);
    }
    catch(err){
      console.log(err);
    }
  }
module.exports={add,show,update,deleted,showbyid,showbyname}