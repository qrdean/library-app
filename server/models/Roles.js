const mongoose = require("mongoose");
const RoleSchema = new mongoose.Schema({
  userId: String,
  role: String
});
module.exports = mongoose.model("Role", RoleSchema);
