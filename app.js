const http = require('http');
const express=require('express');
const categorie = require("./routes/categorie");
const animateur = require("./routes/animateur");


var mongo=require('mongoose'); 
var mongoconnect=require("./config/dbConnection.json");
const bodyParser = require('body-parser');

mongo.connect(mongoconnect.url,{
    useNewUrlParser:true,     //affichage a partir de BD (parser URl)
    useUnifiedTopology:true      //acceder a la BD a partir de topologie exacte
  })
  .then(()=>console.log('mongo connected'))
  .catch((err)=>console.log(err));

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/categorie",categorie);
app.use("/animateur",animateur);

const server = http.createServer(app);
   server.listen(3000,console.log("server run"))
   module.exports= app;
