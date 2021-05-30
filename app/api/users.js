"use strict";

const User = require("../models/user");
const Boom = require("@hapi/boom");
const utils = require('./utils.js');
const Joi = require('@hapi/joi');
const bcrypt = require("bcrypt");
const saltRounds = 10;
var sanitizeHtml = require('sanitize-html');


const Users = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const users = await User.find();
      return users;
    },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = await User.findOne({ _id: request.params.id });
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.notFound("No User with this id");
      }
    },
  },


  create: {
    auth: false,
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function(request, h, error) {
        return Boom.badImplementation("error creating user");
      },
    },
    handler: async function (request, h) {
      const payload = request.payload;
      const hash = await bcrypt.hash(payload.password, saltRounds);
      const newUser = new User({
        firstName: sanitizeHtml(payload.firstName),
        lastName: sanitizeHtml(payload.lastName),
        email: payload.email,
        password: hash,
      });
      const user = await newUser.save();
      if (user) {
        return h.response(user).code(201);
      }
      return Boom.badImplementation("error creating user");
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await User.deleteMany({});
      return { success: true };
    },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const user = await User.deleteOne({ _id: request.params.id });
      if (user) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },

  authenticate: {
    auth: false,
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("login", {
            title: "Sign in error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const user = await User.findOne({ email: request.payload.email });
        const isMatch = await user.comparePassword(request.payload.password);
        if (!user) {
          return Boom.unauthorized("User not found");
        } else if (!isMatch) {
          return Boom.unauthorized("Invalid password");
        } else {
          const token = utils.createToken(user);
          return h.response({ success: true, token: token, id:user.id }).code(201);
        }
      } catch (err) {
        return Boom.notFound("internal db failure");
      }
    },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function(request, h, error) {
        return Boom.badImplementation("error creating user");
      },
    },
    handler: async function (request, h) {
      const payload = request.payload;
      const hash = await bcrypt.hash(payload.password, saltRounds);
      const userEdit = request.payload;
      const user = await User.findById(userEdit.id);
      user.firstName = sanitizeHtml(userEdit.firstName);
      user.lastName = sanitizeHtml(userEdit.lastName);
      user.email = userEdit.email;
      user.password = hash;
      await user.save();
      if (user) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },
};

module.exports = Users;