const Points = require('./app/api/points');
const Users = require("./app/api/users");

module.exports = [
  //POI ROUTES
  { method: 'GET', path: '/api/points', config: Points.find },
  { method: 'GET', path: '/api/points/{id}', config: Points.findOne },
  { method: 'POST', path: '/api/points', config: Points.create },
  { method: 'DELETE', path: '/api/points/{id}', config: Points.deleteOne },
  { method: 'DELETE', path: '/api/points', config: Points.deleteAll },
  { method: "GET", path: "/api/users/{id}/points", config: Points.findByUser },
  { method: "POST", path: "/api/points/{id}", config: Points.createPoint },

  //USER ROUTES
  { method: "GET", path: "/api/users", config: Users.find },
  { method: "GET", path: "/api/users/{id}", config: Users.findOne },
  { method: "POST", path: "/api/users", config: Users.create },
  { method: "DELETE", path: "/api/users/{id}", config: Users.deleteOne },
  { method: "DELETE", path: "/api/users", config: Users.deleteAll },

];