const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  profile: {
    lastname: String,
    firstName: String,
    login: String,
    email: String
  },
  credentials: {
    password: {
      value: String
    }
  }
});
module.exports = mongoose.model("User", UserSchema);
