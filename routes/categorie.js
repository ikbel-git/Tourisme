
const express = require("express");
const router = express.Router();

const categorieController = require('../controller/categorieController');
const categorie = require("../model/categorie");

router.post('/add', categorieController.add);
router.get('/show',categorieController.show);
router.delete('/delete/:id', categorieController.supprimer);
router.put('/update/:id', categorieController.update);


router.get('/pagescategorie',(req,res,next)=>{   // partie de twig pour afficher il faut faire appel a router
    res.render("categorie");
   })

module.exports = router;
