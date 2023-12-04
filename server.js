const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const http = require("http");
const dbConfig = require("./app/config/db.config");
const socketIO = require("socket.io");
const path = require("path")

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(cors());

app.use(express.static(path.join(__dirname, "views")));
app.set("view engine","twig");
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "lamouchi-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("./app/models");
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
  res.json({ message: "Welcome to lamouchi application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
app.get("/signin", (req, res) => {
  res.render("signin"); // Ensure the path matches the view file's name
});

// socket
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle signup event
  socket.on("signup", (userData) => {
    // Process signup logic here
    const { username, password } = userData;

    // Example: In-memory user storage
    const newUser = { username, password };
    users.push(newUser);

    // Emit a response back to the client
    socket.emit("signupResponse", { message: "Signup successful!", user: newUser });
  });

  // Handle signin event
  socket.on("signin", (userData) => {
    // Process signin logic here
    const { username, password } = userData;

    // Example: Check if user exists
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      socket.emit("signinResponse", { message: "Signin successful!", user });
    } else {
      socket.emit("signinResponse", { message: "Invalid username or password" });
    }
  });

  // Handle disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected");
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
