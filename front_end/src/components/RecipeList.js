import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Date } from "prismic-reactjs";
import "../App.css";
import API from "../API";

const RecipeList = () => {
  const [recipeData, setRecipeData] = useState([]);
  //const [byTitle, sortedByTitle] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await API.get("/recipes");
        data.reverse();
        setRecipeData(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const sortByTitle = () => {
    const temp = [...recipeData];
    setRecipeData(
      temp.sort((a, b) => {
        const ra = a.title.toUpperCase();
        const rb = b.title.toUpperCase();

        if (ra > rb) return 1;
        if (rb > ra) return -1;
        return 0;
      })
    );
    console.log(recipeData);
  };

  const sortByDate = () => {
    const temp = [...recipeData];
    setRecipeData(
      temp.sort((a, b) => {
        const da = a.datePosted;
        const db = b.datePosted;

        if (da > db) return -1;
        if (db > da) return 1;
        return 0;
      })
    );
    console.log(recipeData);
  };

  return (
    <div className="recipe-index">
      <h2 className="recipe-list-header">Recipe Index</h2>
      <label>Sort By: &nbsp;</label>
      <button onClick={() => sortByTitle()}>Title</button>
      <button onClick={() => sortByDate()}>Date Posted</button>
      <table>
        <tr>
          <th>Recipe Title</th>
          <th>Date Posted</th>
        </tr>
        {recipeData &&
          recipeData.map((recipe) => (
            <tr>
              <th>
                <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
              </th>
              <th>
                {Date(recipe.datePosted).getMonth() + 1}/
                {Date(recipe.datePosted).getDate()}/
                {Date(recipe.datePosted).getFullYear()}
              </th>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default RecipeList;
