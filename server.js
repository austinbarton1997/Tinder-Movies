const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const { v4: uuidv4 } = require('uuid');

//For BodyParser
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static("public"));

//For Passport
app.use(
  session({
    genid: function (req) {
      return uuidv4();
    },
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
); //Session Secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set("view engine", "ejs");

//Models
var models = require("./app/models");

//Routes 
var authRoute = require("./app/routes/auth.js")(app, passport);

//Load Passport Strategies
require("./app/config/passport/passport.js")(passport, models.user);

//Sync Database
models.sequelize
  .sync()
  .then(function () {
    console.log("Nice! Database looks fine");
  })
  .catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

app.listen(3000, function (err) {
  if (!err) console.log("Site is live");
  else console.log(err);
});
