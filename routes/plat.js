const express = require("express");
const router = express.Router();
const platcontroller = require("../controller/platcontroller");


router.post('/addplat',platcontroller.add);
router.get('/showall',platcontroller.show);
router.put("/update/:id", platcontroller.update);
router.delete("/delete/:id",  platcontroller.deleted);
router.get("/showbyid/:id", platcontroller.showbyid);
router.get("/showbyname/:name", platcontroller.showbyname);
router.get('/plat',(req,res,next)=>{
    res.render("plat");
});


module.exports=router;