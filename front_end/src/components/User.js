import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import "../App.css";
import API from "../API";

const User = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUser] = useState(undefined);
  const [reviews, setReviews] = useState(undefined);
  const [recipeData, setRecipe] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
        try {
            if(!props.match){
                const { data } = await API.get("/users/"+currentUser.uid);
                setUser(data);
            } else {
                const { data } = await API.get("/users/"+props.match.params.id);
                setUser(data);
            }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  },
  []);

  return(
    <div className="userPage">
        <h3>{userData && userData.firstName} {userData && userData.lastName}</h3>
		<p>Birthday: {userData && userData.birthday}</p>
        <h3>Recipes</h3>
        <ul>
            <li>Recipe Placeholder</li>
        </ul>
        <h3>Reviews</h3>
        <ul>
            <li>Review Placeholder</li>
        </ul>
    </div>
  );
}

export default User;