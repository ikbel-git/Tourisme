const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");
const dbConfig = require("./config/db.config");
const userRouter = require("./routes/user");
const app = express();
const {add}=require("./controller/chatcontroller");
const {addevent, affichet, additionticket}=require("./controller/eventcontroller");
const {addticket}=require("./controller/ticketcontroller")
app.use(cors());

const {
  authenticate,
  show,
  add,deleteclass
} = require("./controllers/userController");
const classroomrouter= require("./routes/classroom");
const eventrouter= require("./routes/evenement");
const ticketrouter= require("./routes/ticket");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// parse requests of content-type - application/json
app.use(express.json());
app.use("/user", userRouter);
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use('/classroom', classroomrouter);
app.use('/event', eventrouter);
app.use('/ticket', ticketrouter);
app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("./models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

//socket
const server = http.createServer(app);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("user connected");
  socket.emit("msg", "user is connected");

 

  socket.on("connectUser", async (data) => {
  
    await authenticate(data, (result) => {
      socket.emit("connectUser", result);
    });
  });


  socket.on('registerUser', async (data) => {
    try {
      
      await add(data, (result) => {
       
        socket.emit('registerUser', result);
      });
    } catch (error) {
      console.error(error);
      socket.emit('registerUser', { success: false, error: error.message });
    }
  });

  socket.on('deleteUser', async (data) => {
    try {
    
      const userId = data.userId;

      
      await deleteclass(userId, (result) => {
      
        socket.emit('deleteUser', result);
      });
    } catch (error) {
      console.error(error);
      socket.emit('deleteUser', { success: false, error: error.message });
    }
  });

  socket.on("aff", async () => {
    try {
      const data = await show();
      console.log('Data to send:', data);
      if (data) {
        io.emit('aff', data);
      } else {
        console.error('Error fetching user data or data is undefined');
        socket.emit('aff_error', { error: 'Internal Server Error' });
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      socket.emit('aff_error', { error: 'Internal Server Error' });
    }
  });





  socket.on('logout', () => {
    console.log('User logged out');
    io.emit('userDisconnect', 'user disconnect');  
  });


  socket.on("disconnect", () => {
    console.log("user disconnect");
    io.emit("msg", "user disconnect");
  });
});


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
