var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create schema for the User collection
var userSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
  },
  { collection: "users" }
);

// Create Mongoose Model for Users
var userModel = mongoose.model("userModel", userSchema);

// Export the User Model
module.exports = userModel;
 