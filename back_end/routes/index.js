const express = require("express");
const recipeRoutes = require("./recipes");
const userRoutes = require("./users");
const reviewRoutes = require("./reviews");
const imageRoutes = require('./images');

const constructorMethod = (app) => {
  app.use("/recipes", recipeRoutes);
  app.use("/users", userRoutes);
  app.use("/reviews", reviewRoutes);
  app.use("/images", imageRoutes);

  app.use("/img", express.static(__dirname + "/../img"));

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
