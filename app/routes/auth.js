let { storeMovie, createMovie, displayDashboard, displayAbout, renderMovies } = require("./movie.js");
let authController = require("../controllers/authcontroller.js");

module.exports = function (app, passport) {
  app.get("/register", authController.signup);
  app.get("/login", authController.signin);
  app.get("/logout", authController.logout);

  app.get("/", isLoggedIn, (req, res) => {
    //Renders dashboard
    displayDashboardPage(req, res)
  });

  app.get("/movies", isLoggedIn, (req, res) => {
    //renders list of liked movies
    renderMoviePage(req, res)
  });

  app.get("/ourMovies", isLoggedIn, (req, res) => {
    //renders list of you + partner movies
    getPartnerEmail(req, res)
  });

  app.get("/about", isLoggedIn, (req, res) => {
    //renders list of liked movies
    displayAboutPage(req, res)
  });

  app.post(
    //Passport registration authentication
    "/register",
    passport.authenticate("local-signup", {
      successRedirect: "/",

      failureRedirect: "/register",
    })
  );

  app.post(
    //Passport login authentication
    "/login",
    passport.authenticate("local-signin", {
      successRedirect: "/",

      failureRedirect: "/login",
    })
  );

<<<<<<< HEAD
  app.post("/yes", (req, res, error) => {
    //Selects current movie and stores into userMovies table
    selectCurrentMovie(req, res)
    //Renders new movie using IMDB database and stored json file
    fetchUserMovie(req, res)
=======
  app.get("/", isLoggedIn, (req, res) => {
    //Renders dashboard
    displayDashboard(res, req.user.id)
  });

  app.post("/yes", (req, res, error) => {
    //Selects current movie and stores into userMovies table
    storeMovie(req.user.id)
    //Renders new movie using IMDB database and stored json file
    createMovie(req.user.id);
>>>>>>> parent of 10285ef... Async Fixes, Partner Creation, Compare User / Partner Movies
    //Renders dashboard
    displayDashboard(res, req.user.id);
  });

  app.post("/no", (req, res, error) => {
    //Renders new movie using IMDB database and stored json file
<<<<<<< HEAD
    fetchUserMovie(req, res)
  });

=======
    createMovie(req.user.id);
    //Renders dashboard
    displayDashboard(res, req.user.id);
  });

  app.get("/movies", (req, res) => {
    //renders list of liked movies
    renderMovies(res, req.user.id)
  });

  app.get("/about", (req, res) => {
    //renders list of liked movies
    displayAbout(res, req.user.id)
  });
>>>>>>> parent of 10285ef... Async Fixes, Partner Creation, Compare User / Partner Movies

  function isLoggedIn(req, res, next) {
    //login authentication
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
  }
};