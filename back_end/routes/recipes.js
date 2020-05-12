const express = require("express");
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;

router.get("/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: "Must include an id" });
  }
  try {
    const recipe = await recipeData.getRecipeById(req.params.id);
    res.json(recipe);
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
