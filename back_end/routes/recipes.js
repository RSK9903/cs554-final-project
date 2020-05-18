const express = require("express");
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;
const redis = require("redis");
const client = redis.createClient();
const bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get("/history", async (req, res) => {
  try {
    res.json(await client.lrangeAsync("recipeHistory", 0, 4).map(JSON.parse));
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
});

router.get("/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: "Must include an id" });
  }
  try {
    const recipe = await recipeData.getRecipeById(req.params.id);
    res.json(recipe);
    await client.lpushAsync("recipeHistory", JSON.stringify(recipe));
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "Recipe not found" });
  }
});

router.get("/search/:searchTerm", async (req, res) => {
  if (!req.params.searchTerm) {
    res.status(400).json({ error: "Must include a search term" });
  }
  try {
    const recipe = await recipeData.searchRecipe(req.params.searchTerm);
    res.json(recipe);
    await client.lpushAsync("recipeHistory", req.params.searchTerm);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "Recipe not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const recipeList = await recipeData.getAllRecipes();
    res.json(recipeList);
  } catch (e) {
    res.status(404).json({ error: `Recipes not found` + e });
  }
});

router.get("/users/:authorid", async (req, res) => {
  if (!req.params.authorid) {
    res.status(400).json({ error: "Must include an author id" });
  }
  try {
    const userRecipes = await recipeData.getRecipesByUser(req.params.authorid);
    res.json(userRecipes);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "No recipes found for this user" });
  }
});

router.post("/", async (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const datePosted = req.body.datePosted;
  const completionTime = req.body.completionTime;
  const ingredients = req.body.ingredients;
  const steps = req.body.steps;
  const recipe_yield = req.body.recipe_yield;
  if (
    !title ||
    !author ||
    !datePosted ||
    !completionTime ||
    !ingredients ||
    !steps ||
    !recipe_yield
  ) {
    res.status(400).json({
      error:
        "You must include a title, author, date posted, completion time, ingredients, steps, and recipe yield.",
    });
  }
  try {
    res.json(
      await recipeData.addRecipe(
        title,
        author,
        datePosted,
        completionTime,
        ingredients,
        steps,
        recipe_yield
      )
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: `Recipe unable to be added: ` + e });
  }
});

router.put("/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: "Must include a recipe ID" });
  }
  //console.log("here");
  const id = req.params.id;
  if (!recipeData.getRecipeById(id)) {
    res.status(404).json({ error: `Recipe not found` });
  }
  //console.log("here");
  const title = req.body.title;
  const author = req.body.author;
  const datePosted = req.body.datePosted;
  const completionTime = req.body.completionTime;
  const ingredients = req.body.ingredients;
  const steps = req.body.steps;
  const recipe_yield = req.body.recipe_yield;
  if (
    !title ||
    !author ||
    !datePosted ||
    !completionTime ||
    !ingredients ||
    !steps ||
    !recipe_yield
  ) {
    res.status(400).json({
      error:
        "You must include a title, author, date posted, completion time, ingredients, steps, and recipe yield.",
    });
  }
  try {
    res.json(
      await recipeData.updateRecipe(
        id,
        title,
        author,
        datePosted,
        completionTime,
        ingredients,
        steps,
        recipe_yield
      )
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: `Recipe unable to be updated: ` + e });
  }
});

router.patch("/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: "Must include a recipe ID" });
  }

  const id = req.params.id;
  if (!recipeData.getRecipeById(id)) {
    res.status(404).json({ error: `Recipe not found` });
  }

  const title = req.body.title;
  const author = req.body.author;
  const datePosted = req.body.datePosted;
  const completionTime = req.body.completionTime;
  const ingredients = req.body.ingredients;
  const steps = req.body.steps;
  const recipe_yield = req.body.recipe_yield;
  if (
    !title &&
    !author &&
    !datePosted &&
    !completionTime &&
    !ingredients &&
    !steps &&
    !recipe_yield
  ) {
    res.status(400).json({
      error:
        "You must include a title, author, date posted, completion time, ingredients, steps, or recipe yield.",
    });
  }
  try {
    res.json(
      await recipeData.updateRecipe(
        id,
        title,
        author,
        datePosted,
        completionTime,
        ingredients,
        steps,
        recipe_yield
      )
    );
  } catch (e) {
    res.status(500).json({ error: `Recipe unable to be updated: ` + e });
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({
      error: "You must include a recipe id",
    });
    return;
  }
  if (!recipeData.getRecipeById(req.params.id)) {
    res.status(404).json({ error: `Recipe not found` });
  }
  try {
    res.json(await recipeData.removeRecipe(req.params.id));
  } catch (e) {
    res.status(500).json({ error: `Unable to remove recipe` });
  }
});

module.exports = router;
