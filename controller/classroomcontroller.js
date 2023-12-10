const Classroom=require("../model/classroom");

async function add (req, res, next){
    try{
        const classroom = new Classroom(req.body);
        await classroom.save();
        res.send("classroom add")
    } catch (err){
        console.log(err);
    }
}

async function show (req, res, next) {
    try{
      const data = await Classroom.find();
      res.json(data);
    }catch(err){
      console.log(err);
    }
  }

  async function dlete (req, res, next) {
    try{
      await Classroom.findByIdAndDelete(req.params.id, req.body);
      res.send('removed');
    } catch (err) {
      console.log(err);
    }
  }

  async function update (req, res, next) {
    try{
      await Classroom.findByIdAndUpdate(req.params.id, req.body);
      res.send("updated");
    } catch (err) {
      console.log(err);
    }
  }

module.exports= {add, show, dlete , update};
