const http=require("http");
const express=require("express");
const platrouter=require("./routes/plat");
const restaurantrouter=require("./routes/restaurant");
const mongo=require("mongoose");
const server=require('http');
const mongoconnect=require("./config/dbconnection.json");
const bodyParser = require("body-parser");
const path = require("path")
const{add}=require("./controller/restaurantcontroller");

mongo.connect(mongoconnect.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }).then(() => console.log('mongo connecter')).catch((err) => console.log(err));
var app=express();
app.set("views",path.join(__dirname,"views"))
app.set("view engine" ,"twig")
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use("/plat",platrouter);
app.use("/restaurant",restaurantrouter);


const serveur = server.createServer(app);
const io =require("socket.io")(serveur);

/*
io.on("connection",(socket)=>{;
  console.log("user connected")
  socket.on("msgs",(data)=>{
    io.emit("msgs",data + "Client is connected");
  });

  socket.on("typing", (data)=>{
    console.log(data);
    io.emit("typing", data+"is typing ....");
  });

  socket.on("msg", (data)=>{
    add(data.object);
    console.log(data);
    io.emit("msg", data.name +":"+data.object);
  });

  



  socket.on("disconnect",()=>{
    console.log("Client disconnected");
    io.emit("msg","Client disconnected");
  });
});*/

/*io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Événements pour les plats
  socket.on('newOrderPlat', (order) => {
    console.log('New order for plat:', order);
    // Traitement de la commande de plat
    io.emit('newOrderPlat', order); // Diffusion à tous les clients connectés
  });

  // Événements pour les restaurants
  socket.on('reservation', (details) => {
    console.log('New reservation:', details);
    // Traitement de la réservation de restaurant
    io.emit('newReservation', details); // Diffusion à tous les clients connectés
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
}); */
io.on('connection', (socket) => {
  socket.on("msg", async (data) => {
    console.log(data);
    await add(io, data.object);
    io.emit("restaurantAdded", data.object);
  });
});

io.on('connection', (socket) => {
  socket.on("msg", async (data) => {
    console.log(data);
    await add(io, data.object);
    io.emit("platAdded", data.object);
  });
});

      serveur.listen(3000 , console.log("server run"));
module.exports = app;

  // Emit all restaurants when a user connects
  /*
  Restaurant.find({}, (err, restaurants) => {
    if (err) {
      console.error('Error fetching restaurants:', err);
      return;
    }
    socket.emit('allRestaurants', restaurants);
  });

  // Emit all plats when a user connects
  Plat.find({}, (err, plats) => {
    if (err) {
      console.error('Error fetching plats:', err);
      return;
    }
    socket.emit('allPlats', plats);
  });

  // Other socket event listeners can be added here...

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
*/


