

var Animateur = require("../model/animateur");


    async function add(req,res,next){

      try{
  
          const animateur = new Animateur(req.body);
          await animateur.save();
          res.status(200).json({ message: 'Successfully added animateur' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Failed to add animateur' });
        }
  }
    async function show(req, res, next) {
      try {
        const animateur = await Animateur.find();
        res.status(200).json(animateur);
      } catch (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des animateurs');
      }
    }
    async function supprimer (req, res, next) {
      try{
        const data = await Animateur.findByIdAndDelete(req.params.id,req.body);
        res.send('Animateur deleted');
      }
      catch(err){
        console.log(err);
      }
      
    }
    
    async function update (req, res, next) {
      try{
        const data = await Animateur.findByIdAndUpdate(req.params.id,req.body);
        res.send('Animateur updated');
      }
      catch(err){
        console.log(err);
      }
      
    }

module.exports = {add,show,supprimer,update}