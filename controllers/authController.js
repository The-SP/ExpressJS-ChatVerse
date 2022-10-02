const User = require("../models/user");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup_get = (req, res) => {
  res.render("auth/signup");
};

const signup_post = async (req, res) => {
  // console.log("SignUp form:", req.body);
  const { username, password, password2 } = req.body;
  // Check confirm password
  if (password !== password2) {
    const error = "Passwords do not match.";
    res.render("auth/signup", { error });
  } else if (password.length < 6) {
    const error = "Minimum password length is 6 characters.";
    res.render("auth/signup", { error });
  } else {
    try {
      const user = await User.create({ username, password });
      // login and redirect
      login_user(res, user._id);
    } catch (err) {
      const error = handleErrors(err);
      res.render("auth/signup", { error });
    }
  }
};

const handleErrors = (err) => {
  console.log("Handle Error:", err.message, err.code);
  let error;
  // duplicate error code
  if (err.code == 11000) error = "That username is already taken.";
  else error = "Username or password is invalid. Try Again!";
  return error;
};

const login_get = (req, res) => {
  res.render("auth/login");
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};
const login_user = (res, userID) => {
  const token = createToken(userID);
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: maxAge * 1000,
  });
  // now everytime request is made, jwt cookie is sent to server so that server can verify if user is logged in
  res.redirect("/");
};
const login_post = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    // login and redirect
    login_user(res, user._id);
  } catch (err) {
    const error = err.message; // incorrect email or password
    res.render("auth/login", { error });
  }
};

const logout_get = (req, res) => {
  // replace jwt cookie with useless value that expires immediately
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/login");
};

// Anonymous is a user already created and anonymous login logs any user through this account
const anonymous_login = async (req, res) => {
  try {
    const user = await User.login("Anonymous", "testing");
    // login and redirect
    login_user(res, user._id);
  } catch (err) {
    const error = "Anonymous login failed.";
    res.render("auth/login", { error });
  }
};

module.exports = {
  login_get,
  login_post,
  signup_get,
  signup_post,
  logout_get,
  anonymous_login,
};
