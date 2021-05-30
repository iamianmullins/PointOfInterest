const Points = require('./app/api/points');
const Users = require("./app/api/users");
const Reviews = require("./app/api/reviews");

module.exports = [
  //POI ROUTES
  { method: 'GET', path: '/api/points', config: Points.find },
  { method: 'GET', path: '/api/points/{id}', config: Points.findOne },
  { method: 'POST', path: '/api/points', config: Points.create },
  { method: 'DELETE', path: '/api/points/{id}', config: Points.deleteOne },
  { method: 'DELETE', path: '/api/points', config: Points.deleteAll },
  { method: "GET", path: "/api/users/{id}/points", config: Points.findByUser },
  { method: "POST", path: "/api/points/new", config: Points.createPoint },

  //Review ROUTES
  { method: 'GET', path: '/api/reviews', config: Reviews.find },
  { method: 'POST', path: '/api/reviews', config: Reviews.create },

  //USER ROUTES
  { method: "GET", path: "/api/users", config: Users.find },
  { method: "GET", path: "/api/users/{id}", config: Users.findOne },
  { method: "POST", path: "/api/users", config: Users.create },
  { method: "DELETE", path: "/api/users/{id}", config: Users.deleteOne },
  { method: "DELETE", path: "/api/users", config: Users.deleteAll },
  { method: "POST", path: "/api/users/authenticate", config: Users.authenticate },
  { method: "PUT", path: "/api/users/{id}", config: Users.update },

];