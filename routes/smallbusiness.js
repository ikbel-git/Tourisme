var express =require ("express");
var router = express.Router();
var smallBusinessController =require('../controller/smallBController');
const validate= require("../middl/validate");
router.post('/add', smallBusinessController.createSmallBusiness); //, validate
router.get('/showAll', smallBusinessController.showSmallBusinesses);
router.delete('/delete/:id', smallBusinessController.deleteSmallBusiness);
router.put('/update/:id', smallBusinessController.updateSmallBusiness);  
router.get('/showOne/:id', smallBusinessController.showOne);
router.get('/showbyname/:name', smallBusinessController.showbyname);
router.get('/smallB', (req,res,next)=>{
    res.render('smallBusiness');
});

module.exports=router;  