const express= require ('express');
const router=express.Router();
const ticketcontroller=require ("../controller/ticketcontroller");


router.post('/addticket',ticketcontroller.addt);
router.get('/showticket',ticketcontroller.showt);
router.delete('/dleteticket/:id',ticketcontroller.dletet);
router.put('/updateticket/:id',ticketcontroller.updatet);


module.exports=router;