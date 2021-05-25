'use strict';
const Boom = require("@hapi/boom");
const points = require('../models/points');
const User = require("../models/user");

const Points = {
  find: {
    auth: false,
    handler: async function(request, h) {
        const pointslist = await points.find();
        return pointslist;
    },
  },

  findOne: {
    auth: false,
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

  findByUser: {
    auth: false,
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
    auth: false,
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
    auth: false,
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
    auth: false,
    handler: async function (request, h) {
      let point = new points(request.payload);
      const user = await User.findOne({ _id: request.params.id });
      if (!user) {
        return Boom.notFound("No User with this id");
      }
      point.candidate = user._id;
      point = await point.save();
      return point;
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      const response  = await points.remove({ _id: request.params.id });
      if (response.deletedCount == 1) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await points.remove({});
      return { success: true };
    },
  },
};

module.exports = Points;