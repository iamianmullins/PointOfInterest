"use strict";

const point = require("../models/points");
const User = require("../models/user");

const pointerest = {
  home: {
    handler: function(request, h) {
      return h.view("home", { title: "Add a point of interest" });
    },
  },
  report: {
    handler: async function(request, h) {
      const points = await point.find().populate("user").lean();
      return h.view("report", {
        title: "Points added to Date",
        points: points,
      });
    },
  },
  newpoi: {
    handler: async function(request, h) {
      const id = request.auth.credentials.id;
      const user = await User.findById(id);
      const data = request.payload;
      const newPoint = new point({
        poiname: data.poiname,
        category: data.category,
        description: data.description,
        user: user._id
      });
      await newPoint.save();
      return h.redirect("/report");
    },
  }
};

module.exports = pointerest;