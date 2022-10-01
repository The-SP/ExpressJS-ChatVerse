require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

// connect to MongoDB atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => app.listen(process.env.PORT))
  .catch((err) => console.error(err));

// View engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // middleware for post request
app.use(express.json()); // for auth
app.use(cookieParser()); // to store jwt

// All routes
const { checkUser } = require("./middleware/authMiddleware");
app.get("*", checkUser); // * means apply this middleware to every route
app.post("*", checkUser);
app.get("/", (req, res) => {
  res.redirect("/room");
});

// Routes
const roomRoutes = require("./routes/roomRoutes");
const chatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/room", roomRoutes);
app.use("/chat", chatRoutes);
app.use("/", authRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});