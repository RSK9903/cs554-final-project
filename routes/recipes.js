const express = require("express");
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;

router.get("/", async (req, res) => {
  try {
    const recipeList = recipeData.getAllRecipes();
    res.json(recipeList);
  } catch (e) {
    res.status(404).json({ error: `Recipes not found` + e });
  }
});
