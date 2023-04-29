const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usersSchema = mongoose.Schema(
  {
    //Username
    name: { type: String, required: true },
    //Email
    email: { type: String, required: true, unique: true },
    //Password
    password: { type: String, required: true },
    //Picture
    pic: { type: String, required: true },
  },
  { timestamps: true }
);

usersSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

usersSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
