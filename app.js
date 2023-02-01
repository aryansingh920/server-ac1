"use strict";
//jshint esversion:7

// require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
// const _ = require("lodash");
const mongoose = require("mongoose");
// const {
//   PassportLocalSchema
// } = require('mongoose');
// const session = require("express-session");
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const findOrCreate = require("mongoose-findorcreate");
const fs = require("fs");
const path = require("path");
const app = express();
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const axios = require("axios");
const multer = require("multer");

// app.use(cookieParser())

// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xjjka.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`).then(() => {
//   console.log('connected to cluster : ' + process.env.DB_NAME)
// }).catch((err) => {
//   console.log(err + ' : error connecting to cluster')
// });

mongoose
  .connect(
    `mongodb+srv://srm:srm@cluster0.zr4qq.mongodb.net/sportsApp?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected to cluster: " + "sportsApp");
  })
  .catch((err) => {
    console.log(err + " : error connecting to cluster");
  });

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  date: String,
  email: String,
  phno: String,
  pin: String,
});

const user = mongoose.model("users", userSchema);

// module.exports = invited;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// const Models = require('./database/models.js');

// const routes = require("./routes/routes");

// app.use("/app", routes)

app.get("/", (req, res) => {
  res.send("Hi");
});

app.post("/post/form", (req, res) => {
  const newUser = new user({
    name: req.body.name,
    date: req.body.date,
    email: req.body.email,
    phno: req.body.phno,
    pin: req.body.pin,
  });
  newUser
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

// const uuidv4 = require("uuid/v4");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../", "images"));
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname.toLowerCase().split(" ").join("-");
//     cb(null, "file" + "-" + fileName + Date.now());
//   },
// });

// var upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
//     }
//   },
// });

// app.post("/post/image", upload.single("file"), (req, res) => {
//   console.log(req.file);
// });

// app.get("/",async(req,res)=>{
//     res.send("4000");
// })

const port = process.env.PORT || 8000;
app.listen(port, async (req, res) => {
  console.log("server is running on port http://localhost:" + port);
});
