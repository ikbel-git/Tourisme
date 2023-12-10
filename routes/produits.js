var express =require ("express");
var router = express.Router();
var produitController =require('../controller/produitController');
const validate= require("../middl/validate");
router.post('/add', produitController.addProduit); //, validate
router.get('/showAll', produitController.show);
router.delete('/delete/:id', produitController.deleteProduit);
router.put('/update/:id', produitController.updateProduit);  
router.get('/showOne/:id', produitController.showOne);
router.get('/showbyname/:name', produitController.showbyname);
router.get('/prodsocket', (req,res,next)=>{
    res.render('produits');
});

module.exports=router;  