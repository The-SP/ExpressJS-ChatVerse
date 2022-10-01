require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    // verify token : // compare with SECRET_KEY
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log("JWT verify error:", err.message);
        res.redirect("/login");
      } else {
        // console.log("Decoded token:", decodedToken);
        next();
      }
    });
  } else res.redirect("/login");
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log("jwt verify error:", err.message);
        res.locals.user = null; // if user doesn't exist, set it to null
        next();
      } else {
        // if no error, there must be a valid user logged in
        // console.log("Decoded token:", decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user; // now we can access user inside views
        next();
      }
    });
  } else {
    // if no token
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
