"use strict";

const assert = require("chai").assert;
const PointerestService = require("./points-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("User API tests", function() {
  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const pointerestService = new PointerestService(fixtures.pointerestService);

  suiteSetup(async function() {
    await pointerestService.deleteAllUsers();
    const returnedUser = await pointerestService.createUser(newUser);
    const response = await pointerestService.authenticate(newUser);
  });

  suiteTeardown(async function() {
    await pointerestService.deleteAllUsers();
    pointerestService.clearAuth();
  });


  test("Create a User", async function () {
    const returnedUser = await pointerestService.createUser(newUser);
    assert(_.some([returnedUser], newUser), "returnedUser must be a superset of newUser");
    assert.isDefined(returnedUser._id);
  });

  test("Get User", async function () {
    const u1 = await pointerestService.createUser(newUser);
    const u2 = await pointerestService.getUser(u1._id);
    assert.deepEqual(u1, u2);
  });

  test("Get invalid User", async function () {
    const u1 = await pointerestService.getUser("1234");
    assert.isNull(u1);
    const u2 = await pointerestService.getUser("012345678901234567890123");
    assert.isNull(u2);
  });

  test("Delete a User", async function () {
    let u = await pointerestService.createUser(newUser);
    assert(u._id != null);
    await pointerestService.deleteOneUser(u._id);
    u = await pointerestService.getUser(u._id);
    assert(u == null);
  });

  test("Get all Users", async function() {
    await pointerestService.deleteAllUsers();
    await pointerestService.createUser(newUser);
    await pointerestService.authenticate(newUser);
    for (let u of users) {
      await pointerestService.createUser(u);
    }
    const allUsers = await pointerestService.getUsers();
    assert.equal(allUsers.length, users.length + 1);
  });

  test("Get Users Detail", async function() {
    await pointerestService.deleteAllUsers();
    const user = await pointerestService.createUser(newUser);
    await pointerestService.authenticate(newUser);
    for (let u of users) {
      await pointerestService.createUser(u);
    }
    const testUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    };
    users.unshift(testUser);
    const allUsers = await pointerestService.getUsers();
    for (var i = 0; i < users.length; i++) {
      assert(_.some([allUsers[i]], users[i]), "returnedUser must be a superset of newUser");
    }
  });

  test("Get all users empty", async function () {
    await pointerestService.deleteAllUsers();
    const user = await pointerestService.createUser(newUser);
    await pointerestService.authenticate(newUser);
    const allUsers = await pointerestService.getUsers();
    assert.equal(allUsers.length, 1);
  });

});