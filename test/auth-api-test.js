"use strict";

const assert = require("chai").assert;
const PointerestService = require("./points-service");
const fixtures = require("./fixtures.json");
const utils = require("../app/api/utils.js");

suite("Authentication API tests", function () {
  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const pointerestService = new PointerestService(fixtures.pointerestService);

  setup(async function () {
    await pointerestService.deleteAllUsers();
  });

  test("Authenticate", async function () {
    const returnedUser = await pointerestService.createUser(newUser);
    const response = await pointerestService.authenticate(newUser);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("Verify Token", async function () {
    const returnedUser = await pointerestService.createUser(newUser);
    const response = await pointerestService.authenticate(newUser);

    const userInfo = utils.decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });
});