const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  profile: {
    lastName: String,
    firstName: String,
    login: String,
    email: String
  },
  credentials: {
    password: {
      value: String
    },
    passwordSalt: String
  }
});
module.exports = mongoose.model("User", UserSchema);
