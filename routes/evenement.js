const express= require ('express');
const router=express.Router();
const eventcontroller=require ("../controller/eventcontroller");


router.post('/addevent',eventcontroller.adde);
router.get('/showevent',eventcontroller.showe);
router.delete('/dleteevent/:id',eventcontroller.dletee);
router.put('/updateevent/:id',eventcontroller.updatee);

router.get("/events", (req, res, next) => {
    res.render("events");
  });

router.get("/buyEvent", (req, res, next) => {
    res.render("buyEvent");
  });

router.get("/addEvent", (req, res, next) => {
    res.render("addEvent");
  });
module.exports=router;