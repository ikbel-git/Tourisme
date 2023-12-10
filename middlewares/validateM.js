const yup =require("yup");

const validate =async(req,res,next)=>{
    try{
        const schema = yup.object().shape({
            name: yup.string().required('Name is required'),
            price: yup.number().positive().integer().required('prix est requis'),
           // email: yup.string().email('L\'email doit être valide').required('L\'email est requis'),
          });
          await schema.validate(req.body);//,{abortEarly:false});
    }catch(err){
       console.log(err);
            res.status(404).send(err);
        }
    }

//const { validate } = require("../model/class");

module.exports=validate;