const yup = require("yup");


const validate = async (req, res, next ) => {
try{
    const Schema = yup.object().shape({
        name : yup.string().required(), ///////ya3 validation si howa string ou non vide ou required ta3ti true wala false 
        email : yup.string().email().required(),
        nbrstudent : yup.number().required(),
    });
    await Schema.validate(req.body);
    next ();
} catch (err) {
    console.log(err);
    res.status(404).send(err);
}
}



module.exports = validate ;