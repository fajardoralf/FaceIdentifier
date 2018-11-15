const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

//function imports
const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

//initialize database
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "ralf",
    password: "",
    database: "facerecognition"
  }
});

//initialize express
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/signin", (req, res) => {
  signIn.handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

//check if server is working
app.listen(3000, () => {
  console.log("app is running on port 3000");
});
