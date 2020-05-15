import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import API from "../API";

const RecipeList = (props) => {
  const [recipeData, setRecipeData] = useState(undefined);
  let li = null;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await API.get("/recipes");
        setRecipeData(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  });

  const buildListItem = (recipe) => {
    return (
      <li>
        <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
      </li>
    );
  };

  li =
    recipeData &&
    recipeData.map((recipe) => {
      return buildListItem(recipe);
    });

  const sort = (event) => {
    let temp = recipeData;
    if (event.target.value == "alpha") {
      temp.sort((a, b) => {
        const ra = a.title.toUpperCase();
        const rb = b.title.toUpperCase();

        if (ra > rb) return 1;
        if (rb > ra) return -1;
        return 0;
      });
    } else if (event.target.value == "date") {
      temp.sort((a, b) => {
        const da = a.datePosted;
        const db = b.datePosted;

        if (da > db) return 1;
        if (db > da) return -1;
        return 0;
      });
    }
    setRecipeData(temp);
    console.log(recipeData);
  };

  return (
    <div className="recipe-index">
      <h2 class="recipe-list-header">Recipe Index</h2>
      <label>Sort By: &nbsp;</label>
      <select onChange={sort} defaultValue="date">
        <option value="alpha">Title</option>
        <option value="date">Date Posted</option>
      </select>
      <ul class="recipe-list">{li}</ul>
    </div>
  );
};

export default RecipeList;
