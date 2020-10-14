var exports = (module.exports = {});

exports.signup = function (req, res) {
  res.render("register", {
    req: req,
  });
};

exports.signin = function (req, res) {
  res.render("login", {
    req: req,
  });
};

exports.yes = function (req, res) {
  res.render("dashboard", {
    req: req,
  });
};

exports.dashboard = function (req, res) {
  rres.render("dashboard", {
    req: req,
  });
};

exports.logout = function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
};
