var http = require("http");
var express = require("express");
var path = require('path');
var mongo = require("mongoose");
var mongoConnect = require("./config/dbConnection.json");

const { addsmallBSocket,showSmallBusinesses } = require("./controller/smallBController");
const { addProdSocket, updateProduit, deleteProduit,show } = require("./controller/produitController");

mongo.connect(mongoConnect.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Mongo connected'))
    .catch((err) => console.log(err));

var produitRouter = require("./routes/produits");
var smallBusinessRouter = require("./routes/smallbusiness");

const bodyParser = require("body-parser");
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/produit", produitRouter);
app.use("/smallBusiness", smallBusinessRouter);

const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
    socket.on("msg", async (data) => {
        console.log(data);
        if (data.type === "produit") {
            await addProdSocket(io, data.object);
            io.emit("produitAdded", data.object);
        } else if (data.type === "smallBusiness") {
            await addsmallBSocket(io, data.object);
            io.emit("smallBusinessAdded", data.object);
        }
    });

    socket.on("updateProduit", async (data) => {
        try {
            await updateProduit(data.produitId);
            io.emit("produitUpdated", { produitId: data.produitId });
        } catch (err) {
            console.error(err);
        }
    });

    socket.on("deleteProduit", async (data) => {
        try {
            await deleteProduit(data.produitId);
            io.emit("produitDeleted", { produitId: data.produitId });
        } catch (err) {
            console.error(err);
            io.emit("deleteProduitError", { error: "Failed to delete produit", produitId: data.produitId });
        }
    });
    
    
    socket.on("getProduits", async () => {
        try {
            const produits = await show();
            socket.emit('getProduits', produits);
        } catch (err) {
            console.error(err);
            socket.emit('getProduitsError', { error: 'Internal Server Error' });
        }
    });
    io.on('connection', (socket) => {
        socket.on('getSmallBusinesses', async () => {
            try {
                const smallBusinesses = await businessController.showSmallBusinesses();
                socket.emit('getSmallBusinesses', smallBusinesses);
            } catch (err) {
                console.error(err);
                socket.emit('getSmallBusinessesError', { error: 'Internal Server Error' });
            }
        });
    });
    
    
});


server.listen(3000, () => console.log("Server is running on port 3000"));
module.exports = app;
