"use strict";

const axios = require("axios");
const baseUrl = "http://localhost:4000";

class PointerestService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async createUser(newUser) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users", newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + "/api/users");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneUser(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createPoint(point) {
    const response = await axios.post(this.baseUrl + "/api/points", point);
    return response.data;
  }

  async getPoints() {
    try {
    const response = await axios.get(this.baseUrl + "/api/points");
    return response.data;
    } catch (e) {
      return null;
    }
  }

  async getPoint(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/points/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllPoints() {
    try {
    const response = await axios.delete(this.baseUrl + "/api/points");
    return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOnePoint(id) {
    try {
    const response = await axios.delete(this.baseUrl + "/api/points/" + id);
    return response.data;
  } catch (e) {
    return null;
  }
  }

  async authenticate(user) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users/authenticate", user);
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async clearAuth(user) {
    axios.defaults.headers.common["Authorization"] = "";
  }
}

module.exports = PointerestService;