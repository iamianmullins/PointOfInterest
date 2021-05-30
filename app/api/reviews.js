'use strict';
const Boom = require("@hapi/boom");
const reviews = require('../models/reviews');

const Reviews = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      const reviewList = await reviews.find();
      return reviewList;
    },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const newReview = new reviews(request.payload);
      const aReview = await newReview.save();
      if (aReview) {
        return h.response(aReview).code(201);
      }
      return Boom.badImplementation("error creating review");
    },
  },
};

module.exports = Reviews;