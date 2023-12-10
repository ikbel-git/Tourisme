const http=require('http');
const express = require('express');
const mongo=require('mongoose');
const mongoconnect = require('./config/dbconnection.json');
const path =require("path");
const {add}=require("./controller/chatcontroller");
const {addevent, affichet, additionticket}=require("./controller/eventcontroller");
const {addticket}=require("./controller/ticketcontroller")

mongo.connect(mongoconnect.url,{
    useNewUrlParser: true, //affichage de base de donne
    useUnifiedTopology: true //access au base de donner d'apres la topologie
    })
    .then(() => console.log('mongo connecter '))
    .catch((err) => console.log(err));

const classroomrouter= require("./routes/classroom");
const eventrouter= require("./routes/evenement");
const ticketrouter= require("./routes/ticket");

const bodyParser = require('body-parser');
const { Socket } = require('socket.io');


var app= express();
app.set("views",path.join(__dirname,"views"));
app.set("view engine","twig");
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/classroom', classroomrouter);
app.use('/event', eventrouter);
app.use('/ticket', ticketrouter);


const serveur =http.createServer(app);
const io=require("socket.io")(serveur);

io.on("connection",(socket) => {//ouverture du flux howa il io ou el connection mot cle lezem tkoun heya
    console.log("user connected");
    
    socket.on("msgs",(data) => {
        io.emit("msgs",data+" is connected");//el socket mawjouda fiwest el flux
    });

    socket.on("msg",(data) => {
        add(data.object);
        io.emit("msg",data.name + " : " + data.object);//houni tkatchi el data ely tab3athha el fonction send mil html
    });

    socket.on("typing",(data) => {
         io.emit("typing",data + "is typing ...");//houni tkatchi el data ely tab3athha el fonction send mil html
     });


            socket.on("addition", (data) => {
                addevent(data);
                io.emit("addition", data);
            });
            socket.on("affichetableau",async () => {
                const  datas = await affichet();
                io.emit("affichetableau", datas);
            });
            socket.on("additionticket", (data) => {
                addticket(data);
                additionticket(data);
                io.emit("additionticket", data);
            });


    socket.on("disconnect",() => {
        console.log("user disconnected");
        io.emit("msg","user is disconnected");
    });
});
serveur.listen(3000, console.log('serveur run'));

module.exports=app;//zedetha 5ater nal9a prof zedha 