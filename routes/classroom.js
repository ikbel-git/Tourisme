const express= require ('express');
const router=express.Router();
const classroomcontroller=require ("../controller/classroomcontroller");
const validate=require('../middl/validate');

router.post('/addclassroom',validate,classroomcontroller.add);
router.get('/showclassroom',classroomcontroller.show);
router.delete('/dleteclassroom/:id',classroomcontroller.dlete);
router.put('/updateclassroom/:id',classroomcontroller.update);

router.get('/chat',(req,res,next) => {
    res.render("chat");
});

module.exports=router;