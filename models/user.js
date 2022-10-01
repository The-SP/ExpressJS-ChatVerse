const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

const bcrypt = require("bcrypt");
userSchema.pre("save", async function (next) {
//   console.log("user about to be created and saved", this);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// userSchema.post("save", function (doc, next) {
//   console.log("new user was created and saved", doc);
//   next();
// });

// static method to login user
userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    // compare entered password with hashed password
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
    throw Error("Incorrect password");
  }
  throw Error("Incorrect username");
};

const User = mongoose.model("User", userSchema);
module.exports = User;
