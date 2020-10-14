const imdb = require("name-to-imdb");
const path = require("path");
const { render } = require("ejs");
let mysql = require('mysql');
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, "..", "config", "config.json"))[env];
const movies = require(path.join(
  __dirname,
  "..",
  "..",
  "_data",
  "movies.json"
));
var values = Object.values(movies);

let connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database
});

<<<<<<< HEAD
async function selectCurrentMovie(req, res) {
  const sql = await "SELECT * FROM currentMovie where userID= " + req.user.id + "";
  connection.query(sql, function (err, userResults) {
    insertCurrentMovie(req, res, userResults)
    if (err) console.log(err)
  })
}

async function insertCurrentMovie(req, res, userResults) {
  const sqls = await
    `INSERT INTO userMovies (userID, movieID, title, year, poster, type) 
    SELECT * FROM (SELECT ${req.user.id}, ${userResults[0].movieID}, "${userResults[0].movieTitle}", ${userResults[0].releaseYear}, "${userResults[0].posterIMG}", "${userResults[0].filmType}") 
    AS tmp WHERE NOT EXISTS (SELECT movieID FROM userMovies WHERE movieID = ${userResults[0].movieID} and userID = ${req.user.id}) LIMIT 1;`
  connection.query(sqls, function (err) {
=======
function storeMovie(userID) {
  var sql = "SELECT * FROM currentMovie where userID= " + userID + "";
  connection.query(sql, function (err, results) {
    var sqls = "INSERT INTO userMovies (userID, movieID, title, year, poster, type) VALUES ?";
    var values = [
      [userID, results[0].movieID, results[0].movieTitle,
        results[0].releaseYear, results[0].posterIMG, results[0].filmType],
    ];
    connection.query(sqls, [values], function (err) {
      if (err) console.log(err)
    })
    //Displays any errors selecting from 
>>>>>>> parent of 10285ef... Async Fixes, Partner Creation, Compare User / Partner Movies
    if (err) console.log(err)
  })
}

<<<<<<< HEAD
async function fetchUserMovie(req, res) {
  const randomValue = values[parseInt(Math.random() * values.length)];
  try {
    const omdb = await fetch(`http://www.omdbapi.com/?t=${randomValue.title}&apikey=bdd6ba20`)
    if (!omdb.ok) throw omdb
    const { Poster: poster, imdbRating: imdbRating } = await omdb.json()
    if (!poster) return fetchUserMovie(req, res)
    await replaceCurrentMovie(req, res, randomValue, poster, imdbRating)
    displayDashboardPage(req, res)
  } catch (err) {
    console.error(err)
  }
}

async function replaceCurrentMovie(req, res, randomValue, poster, imdbRating) {
  const sql = await "REPLACE INTO currentMovie (userID, movieID, movieTitle, releaseYear, posterIMG, filmType, movieDescription, rating) VALUES ?";
  var movieValues = [
    [req.user.id, randomValue.show_id, randomValue.title, randomValue.release_year, poster, randomValue.type, randomValue.description, imdbRating],
  ];
  connection.query(sql, [movieValues], function (err) {
    if (err) console.log(err)
  })
}

function renderMoviePage(req, res) {
  var sql = "SELECT * FROM userMovies where userID = " + req.user.id + "";
=======
function createMovie(userID) {
  randomValue = values[parseInt(Math.random() * values.length)];
  imdb(`${randomValue.title}`, function (err, res, inf) {
    if (inf.meta == null || typeof inf.meta.image == 'undefined') {
      console.log("ERROR NULL")
    } else {
      var sql = "REPLACE INTO currentMovie (userID, movieID, movieTitle, releaseYear, posterIMG, filmType) VALUES ?";
      var values = [
        [userID, randomValue.show_id, randomValue.title, randomValue.release_year, inf.meta.image.src, randomValue.type],
      ];
      connection.query(sql, [values], function (err) {
        if (err) console.log(err)
      })
    }
  })
}

function renderMovies(res, userID) {
  var sql = "SELECT * FROM userMovies where userID= " + userID + "";
>>>>>>> parent of 10285ef... Async Fixes, Partner Creation, Compare User / Partner Movies
  connection.query(sql, function (err, results) {
    if (results < 1) {
      res.render("movies", {
        movies: results
      });
    } else {
      res.render("movies", {
        movies: results,
        movieID: results[0].movieID,
        req: req
      });
    }
    if (err) console.log(err)
  });
}

<<<<<<< HEAD
async function getPartnerEmail(req, res) {
  try {
    const sql = await `SELECT id FROM users WHERE email = "${req.user.partnerEmail}"`
    connection.query(sql, function (err, results) {
      if (results < 1) {
        res.render("ourMovies", {
          movies: results
        });
      } else {
        selectPartnerMovies(req, res, results[0].id)
      }
      if (err) console.log(err)
    });
  } catch (err) {
    console.error(err)
  }
}

async function selectPartnerMovies(req, res, partnerID) {
  try {
    const sql = await "SELECT movieID, title, year, poster, type FROM userMovies where userID in (" + req.user.id + ", " + partnerID + ") GROUP BY movieID, title, year, poster, type HAVING COUNT(movieID) > 1";
    connection.query(sql, function (err, results) {
      res.render("ourMovies", {
        movies: results,
        req: req
      });
      if (err) console.log(err)
    });
  } catch (err) {
    console.error(err)
  }
}


function displayDashboardPage(req, res) {
  let sql = "SELECT * FROM currentMovie where userID= " + req.user.id + "";
  connection.query(sql, function (err, results) {
    if (results == '') {
      fetchUserMovie(req, res)
      res.redirect('/');
    } else {
      res.render("dashboard", {
        movieIMG: results[0].posterIMG,
        movieTitle: results[0].movieTitle,
        movieID: results[0].movieID,
        req: req
      });
    }
  });
}

function displayAboutPage(req, res) {
  let sql = "SELECT * FROM currentMovie where userID= " + req.user.id + "";
  setTimeout(() => {
    connection.query(sql, function (err, results) {
      if (results == '') {
        fetchUserMovie(req, res)
=======
function displayDashboard(res, userID) {
  let sql = "SELECT * FROM currentMovie where userID= " + userID + "";
  setTimeout(() => {
    connection.query(sql, function (err, results) {
      if (results == '') {
        createMovie(userID);
        res.redirect('/');
      } else {
        res.render("dashboard", {
          movieIMG: results[0].posterIMG,
          movieTitle: results[0].movieTitle,
          movieID: results[0].movieID
        });
      }
    });
  }, 1000);
}

function displayAbout(res, userID) {
  let sql = "SELECT * FROM currentMovie where userID= " + userID + "";
  setTimeout(() => {
    connection.query(sql, function (err, results) {
      if (results == '') {
        createMovie(userID);
>>>>>>> parent of 10285ef... Async Fixes, Partner Creation, Compare User / Partner Movies
        res.redirect('/');
      } else {
        res.render("about", {
          movieIMG: results[0].posterIMG,
          movieTitle: results[0].movieTitle,
<<<<<<< HEAD
          movieID: results[0].movieID,
          movieDescription: results[0].movieDescription,
          req: req
=======
          movieID: results[0].movieID
>>>>>>> parent of 10285ef... Async Fixes, Partner Creation, Compare User / Partner Movies
        });
      }
    });
  }, 1000);
}

module.exports = {
  storeMovie,
  createMovie,
  displayDashboard,
  displayAbout,
  renderMovies
};

