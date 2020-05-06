const recipeRoutes = require("./recipes");
const userRoutes = require("./users");

const constructorMethod = (app) => {
  app.use("/recipes", recipeRoutes);
  app.use("/user", userRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
