var Categorie = require("../model/categorie");


    async function add(req,res,next){

      try{
  
          const categorie = new Categorie(req.body);
          await categorie.save();
          res.status(200).json({ message: 'Successfully added categorie' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Failed to add categorie' });
        }
  }
    async function show(req, res, next) {
      try {
        const categorie = await Categorie.find();
        res.status(200).json(categorie);
      } catch (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des categorie');
      }
    }
    async function supprimer (req, res, next) {
      try{
        const data = await Categorie.findByIdAndDelete(req.params.id,req.body);
        res.send('Categorie deleted');
      }
      catch(err){
        console.log(err);
      }
      
    }
    
    async function update (req, res, next) {
      try{
        const data = await Categorie.findByIdAndUpdate(req.params.id,req.body);
        res.send('Categorie updated');
      }
      catch(err){
        console.log(err);
      }
      
    }

module.exports = {add,show,supprimer,update}