import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../firebase/Auth";
import "../App.css";
import API from "../API";
import {Link} from "react-router-dom";

function ShowHistory() {
    const { currentUser } = useContext(AuthContext);
    const [recipes, setRecipes] = useState(undefined);
    const uniqueIds = {};

	useEffect(() => {
		async function fetchData() {
			try {
                console.log("Made it")
                if (currentUser) {
                    const { data: recipeList } = await API.get("recipes/history");
                    setRecipes(recipeList);
                }
                else {
                    console.log("clear the cache")
                    await API.get("recipes/clearAll");
                    setRecipes([]);
                }
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
        if (Object.keys(uniqueIds).length < 5 && !uniqueIds[i._id]){
            uniqueIds[i._id] = i;
            return createRecipeLine(i);
        }
    });
    
    if (!currentUser) {
        return (<div className="show-hist"></div>);
    }

    return (
        <div className="show-hist">
            <h3>Recently Viewed</h3>
            <ul>{recipeli}</ul>
        </div>
    );	
}

export default ShowHistory;