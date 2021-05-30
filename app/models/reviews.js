"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const reviewSchema = new Schema({
  reviewer: String,
  comment: String,
  date: String,
});

module.exports = Mongoose.model("Reviews", reviewSchema);