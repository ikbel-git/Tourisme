const Plat = require("../model/plat"); 

async function add (req, res, next){
  try{
      const plat=new Plat(req.body);
      await plat.save();
      res.status(200).send("plat add");
  }catch(err){
      console.log(err)
  }
}

async function show(req, res, next) {
    try{
      const data = await Plat.find();
      res.json(data);
    }
    catch(err){
      console.log(err);
    }
  }

  async function update(req, res, next){
    try{
      await Plat.findByIdAndUpdate(req.params.id, req.body);
      res.send("update");
    }
    catch(err){
      console.log(err);
    }
  }

  async function deleted (req, res, next){
    try{
      await Plat.findByIdAndDelete(req.params.id, req.body);
      res.json("remove");
    }
    catch(err){
      console.log(err);
    }
  }

  async function showbyid(req, res, next){
    try{
      const data = await Plat.findById(req.params.id, req.body);
      res.json(data);
    }
    catch(err){
      console.log(err);
    }
  }
  

  async function showbyname(req, res, next){
    try{
      const data = await Plat.findOne(req.params);
      res.send(data);
    }
    catch(err){
      console.log(err);
    }
  }
module.exports={add,show,update,deleted,showbyid,showbyname}