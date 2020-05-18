import React, { useContext, useState, useEffect } from "react";
import "../App.css";
import API from "../API";
import {Link} from "react-router-dom";

function ShowHistory() {
    const [recipes, setRecipes] = useState(undefined);
    const uniqueIds = {};

	useEffect(() => {
		async function fetchData() {
			try {
                console.log("Made it")
                const { data: recipeList } = await API.get("recipes/history");
                setRecipes(recipeList);

			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, []);

	const createRecipeLine = (recipe) => {
		return <li key={recipe._id}><Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link></li>;
      };
      
	const recipeli =
    recipes &&
    recipes.map((i) => {
        if (!uniqueIds[i._id]){
            uniqueIds[i._id] = i;
            return createRecipeLine(i);
        }
    });    

    return (
        <div className="show-hist">
            <h3>Recently Viewed Recipes</h3>
            <ul>{recipeli}</ul>
        </div>
    );	
}

export default ShowHistory;