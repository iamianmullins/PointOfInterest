"use strict";

const assert = require("chai").assert;
const PointerestService = require("./points-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("User API tests", function () {
  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const pointerestService = new PointerestService(fixtures.pointerestService);

  setup(async function () {
    await pointerestService.deleteAllUsers();
  });

  teardown(async function () {
    await pointerestService.deleteAllUsers();
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

  test("Get all Users", async function () {
    for (let u of users) {
      await pointerestService.createUser(u);
    }

    const allUsers = await pointerestService.getUsers();
    assert.equal(allUsers.length, users.length);
  });

  test("Get Users detail", async function () {
    for (let u of users) {
      await pointerestService.createUser(u);
    }
    const allUsers = await pointerestService.getUsers();
    for (var i = 0; i < users.length; i++) {
      assert(_.some([allUsers[i]], users[i]), "returnedUser must be a superset of newUser");
    }
  });

  test("get all users empty", async function () {
    const allUsers = await pointerestService.getUsers();
    assert.equal(allUsers.length, 0);
  });
});