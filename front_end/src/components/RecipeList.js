import React, { useState, useEffect } from "react";
import { Date } from "prismic-reactjs";
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

  return (
    <div className="App-body">
      <ul class="recipe-list">{li}</ul>
    </div>
  );
};

export default RecipeList;
