const express = require('express');
const categorie = require("./routes/categorie");
const animateur = require("./routes/animateur");
const mongo = require('mongoose');
const mongoconnect = require("./config/dbConnection.json");
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http'); // Importe le module HTTP

const app = express();
const server = http.createServer(app); 
const io = require('socket.io')(server); 

mongo.connect(mongoconnect.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('mongo connected'))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/categorie", categorie);
app.use("/animateur", animateur);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

io.on('connection', (socket) => {
  console.log('un animateur connecté');
  socket.on('animateurAjouter', (data) => {
    io.emit('animateurNotification', data);
  });
});

server.listen(3000, () => {
  console.log("server run");
});

module.exports = app;
