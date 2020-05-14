const recipeRoutes = require("./recipes");
const userRoutes = require("./users");
const reviewRoutes = require("./reviews");

const constructorMethod = (app) => {
  app.use("/recipes", recipeRoutes);
  app.use("/users", userRoutes);
  app.use("/reviews", reviewRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
