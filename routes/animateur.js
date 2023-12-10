
const express = require("express");
const router = express.Router();

const animateurController = require('../controller/animateurController');
const animateur = require("../model/animateur");

router.post('/add', animateurController.add);
router.get('/show',animateurController.show);
router.delete('/delete/:id', animateurController.supprimer);
router.put('/update/:id', animateurController.update);


router.get('/pageanimateur',(req,res,next)=>{ 
    res.render("animateur");
   })
   
module.exports = router;
