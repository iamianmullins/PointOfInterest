'use strict';
const Boom = require("@hapi/boom");
const points = require('../models/points');
const User = require("../models/user");
const utils = require("./utils.js");

const Points = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
        const pointslist = await points.find();
        return pointslist;
    },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      try {
        const onepoint = await points.findOne({ _id: request.params.id });
        if (!onepoint) {
          return Boom.notFound("No Point of interest with this id");
        }
        return onepoint;
      } catch (err) {
        return Boom.notFound("No Point of interest with this id");
      }
    }
  },


  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const userPoints = await points.find().populate("user");
      return userPoints;
    },
  },

  findByUser: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const userPoints = await points.find({ user: request.params.id });
        if (!userPoints) {
          return Boom.notFound("No Points of interest found for this user");
        }
        return userPoints;
      } catch (err) {
        return Boom.notFound("No Points of interest found for this user");
      }
    }
    },


//****************************
  deleteByUser: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = await User.findOne({ _id: request.params.id });
        const userPoints = await points.find({ user: request.params.id });
        await userPoints.remove({});
        if (!userPoints) {
          return Boom.notFound("No Points of interest found for this user");
        }
        return userPoints;
      } catch (err) {
        return Boom.notFound("No Points of interest found for this user");
      }
    }
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const newPoint = new points(request.payload);
      const apoint = await newPoint.save();
      if (apoint) {
        return h.response(apoint).code(201);
      }
      return Boom.badImplementation("error creating point");
    },
  },

  createPoint: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const userId = utils.getUserIdFromRequest(request);
      let point = new points(request.payload);
      const user = await User.findOne({ _id: request.params.id });
      if (!user) {
        return Boom.notFound("No User with this id");
      }
      point.user = userId;
      point = await point.save();
      return point;
    },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const response  = await points.remove({ _id: request.params.id });
      if (response.deletedCount == 1) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await points.remove({});
      return { success: true };
    },
  },
};

module.exports = Points;