"use strict";

const pointerest = {
  home: {
    handler: function (request, h) {
      return h.view("home", { title: "Add a point of interest" });
    },
  },
  report: {
    handler: function (request, h) {
      return h.view("report", {
        title: "Points added to Date",
        points: this.points,
      });
    },
  },
  newpoi: {
    handler: function (request, h) {
      const data = request.payload;
      this.points.push(data);
      return h.redirect("/report");
    },
  },
};

module.exports = pointerest;