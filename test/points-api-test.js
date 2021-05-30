"use strict";

const assert = require("chai").assert;
const PointerestService = require("./points-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("Points API tests", function () {
  let points = fixtures.Points;
  let newPoint = fixtures.newPoint;

  const pointerestService = new PointerestService(fixtures.pointerestService);
  let newUser = fixtures.newUser;

  suiteSetup(async function () {
    await pointerestService.deleteAllUsers();
    const returnedUser = await pointerestService.createUser(newUser);
    const response = await pointerestService.authenticate(newUser);
  });

  suiteTeardown(async function () {
    await pointerestService.deleteAllUsers();
    pointerestService.clearAuth();
  });

  setup(async function () {
    await pointerestService.deleteAllPoints();
  });

  teardown(async function () {
    await pointerestService.deleteAllPoints();
  });


  test("Create a Point", async function () {
    const returnedPoint = await pointerestService.createPoint(newPoint);
    assert(_.some([returnedPoint], newPoint), "returnedPoint must be a superset of newPoint");
    assert.isDefined(returnedPoint._id);
  });

  test("Get Point", async function () {
    const poi1 = await pointerestService.createPoint(newPoint);
    console.log(newPoint);
    const poi2 = await pointerestService.getPoint(poi1._id);
    assert.deepEqual(poi1, poi2);
  });

  test("Get invalid Point", async function () {
    const poi1 = await pointerestService.getPoint("1234");
    assert.isNull(poi1);
    const poi2 = await pointerestService.getPoint("012345678901234567890123");
    assert.isNull(poi2);
  });

  test("Delete a Point", async function () {
    let c = await pointerestService.createPoint(newPoint);
    assert(c._id != null);
    await pointerestService.deleteOnePoint(c._id);
    c = await pointerestService.getPoint(c._id);
    assert(c == null);
  });

  test("Delete User Points", async function () {
    const u1 = await pointerestService.createUser(newUser);
    const u2 = await pointerestService.getUser(u1._id);
    assert.deepEqual(u1, u2);
  });

  test("Get all Points", async function () {
    for (let poi of points) {
      await pointerestService.createPoint(poi);
    }
    const allPoints = await pointerestService.getPoints();
    assert.equal(allPoints.length, points.length);
  });

  test("Get Points detail", async function () {
    for (let poi of points) {
      await pointerestService.createPoint(poi);
    }
    const allPoints = await pointerestService.getPoints();
    for (var i = 0; i < points.length; i++) {
      assert(_.some([allPoints[i]], points[i]), "returnedPoint must be a superset of newPoint");
    }
  });

  test("Get all Points - empty", async function () {
    const allPoints = await pointerestService.getPoints();
    assert.equal(allPoints.length, 0);
  });
});