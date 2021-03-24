'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Handlebars = require('handlebars');
const Cookie = require("@hapi/cookie");
const Joi = require("@hapi/joi");
const env = require('dotenv');

const result = env.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

const server = Hapi.server({
  port: process.env.PORT || 3000,
});

//server.bind({
 // users: {},
 // points: [],
  // currentUser: {},
//});
require('./app/models/db');

async function init() {
  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);
  server.views({
    engines: {
      hbs: require('handlebars'),
    },
    relativeTo: __dirname,
    path: './app/views',
    layoutPath: './app/views/layouts',
    partialsPath: './app/views/partials',
    layout: true,
    isCached: false,
  });

  server.validator(require("@hapi/joi"));

  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false
    },
    redirectTo: '/',
  });

  server.auth.default('session');

  server.route(require('./routes'));
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();