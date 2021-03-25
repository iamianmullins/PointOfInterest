"use strict";

const point = require("../models/points");
const User = require("../models/user");
const _ = require('lodash/core');

const pointerest = {
  home: {
    handler: async function(request, h) {
      const se = "South East";
      const sw = "South West";
      const ne = "North East";
      const nw = "North West";
      const points = await point.find().populate("user").lean();
      const user = await User.find().populate("user").lean();
      const filtersw = _.filter(points, {category: se,});
      const filterse = _.filter(points, {category: sw,});
      const filternw = _.filter(points, {category: ne,});
      const filterne = _.filter(points, {category: nw,});
      return h.view("home", {
        title: "Add a point of interest",
        lensw: filtersw.length,
        lense: filterse.length,
        lennw: filternw.length,
        lenne: filterne.length,
        lenuser: user.length
      });
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

  reportfiltered: {
    handler: async function(request, h) {
      const data = request.payload;
      const points = await point.find().populate("user").lean();
      const filter = _.filter(points, {category: data.category,});
      console.log(filter);
      return h.view("report", {
        title: "Showing points for : "+ data.category,
        points: filter,
      });
    },
  },


  newpoi: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;
        const newPoint = new point({
          poiname: data.poiname,
          category: data.category,
          description: data.description,
          latitude: data.description,
          longitude: data.description,
          user: user._id
        });
        await newPoint.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    }
  },
  deletePoi: {
    handler: async function(request, h) {
      try {
        const poi = point.findById(request.params._id);
        console.log("Deleting Poi: " + poi);
        await point.deleteOne(point.poi);
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    }
  }
  };

module.exports = pointerest;