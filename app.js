require("dotenv").config();
const express = require("express");
const app = express();

// Mongoose
const mongoose = require("mongoose");
// connect to MongoDB atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => app.listen(process.env.PORT))
  .catch((err) => console.error(err));

// Views, static, post request configuration
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true})); // middleware for post request

app.get("/", (req, res) => {
    res.redirect("/room")
})

// Room Routes
const roomRoutes = require("./routes/roomRoutes")
const chatRoutes = require("./routes/chatRoutes")
app.use("/room", roomRoutes);
app.use("/chat", chatRoutes);

app.use((req, res) => {
    res.status(404).render("404");
})