"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;


const pointSchema = new Schema({
  poiname: String,
  category: String,
  description: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Mongoose.model("Points", pointSchema);