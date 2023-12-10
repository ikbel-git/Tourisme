const express = require("express");
const router = express.Router();
const restaurantcontroller = require("../controller/restaurantcontroller");

router.post('/addrestaurant',restaurantcontroller.add);
router.get('/showall',restaurantcontroller.show);
router.put("/update/:id", restaurantcontroller.update);
router.delete("/delete/:id",  restaurantcontroller.deleted);
router.get("/showbyid/:id", restaurantcontroller.showbyid);
router.get("/showbyname/:name", restaurantcontroller.showbyname);
router.get('/restaurant',(req,res,next)=>{
    res.render("restaurant");
});


module.exports=router;