"use strict";

const Accounts = require("./app/controllers/accounts");
const pointerest = require("./app/controllers/pointerest");

module.exports = [
  { method: "GET", path: "/", config: Accounts.index },
  { method: "GET", path: "/signup", config: Accounts.showSignup },
  { method: "GET", path: "/login", config: Accounts.showLogin },
  { method: "GET", path: "/logout", config: Accounts.logout },
  { method: "POST", path: "/signup", config: Accounts.signup },
  { method: "POST", path: "/login", config: Accounts.login },
  { method: 'GET', path: '/settings', config: Accounts.showSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },
  { method: 'GET', path: '/deleteUser', config: Accounts.deleteUser },

  { method: "GET", path: "/home", config: pointerest.home },
  { method: "GET", path: "/report", config: pointerest.report },
  { method: 'GET', path: '/deletePoi', config: pointerest.deletePoi },

  { method: 'POST', path: '/newpoi', config: pointerest.newpoi },


  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public"
      }
    },
    options: { auth: false }
  }
];