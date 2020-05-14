import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import API from "../API";
import "../App.css";

function AddRecipe() {
  const [postData, setPostData] = useState({});
  const [ingredientData, setIngredientData] = useState([
    { measurement: "", unit: "", name: "" },
  ]);
  const newIng = { measurement: "", unit: "", name: "" };
  const [submitted, setSubmitted] = useState(false);
  const addIng = () => {
    setIngredientData([...ingredientData, { ...newIng }]);
  };
  const handleIngChange = (event) => {
    const tempIng = [...ingredientData];
    tempIng[event.target.dataset.id][event.target.name] = event.target.value;
    setIngredientData(tempIng);
  };
  const formSubmit = async (event) => {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let completionTime = document.getElementById("completion-time").value;
    //let steps = document.getElementById("steps").value;
    let recipe_yield = document.getElementById("recipe-yield").value;

    let datePosted = Date.now();
    let steps = ["steps here"];
    let newRecipe = {
      title: title,
      author: author,
      datePosted: datePosted,
      completionTime: parseInt(completionTime),
      ingredients: ingredientData,
      steps: steps,
      recipe_yield: parseInt(recipe_yield),
    };

    const { data } = await API.post("/recipes", newRecipe);
    setPostData(data);
    setSubmitted(true);
  };

  if (submitted) {
    if (postData && postData._id)
      return <Redirect to={"/recipes/" + postData._id} />;
    else alert("Could not add recipe, please try again");
  }
  return (
    <div>
      <form id="new-recipe" onSubmit={formSubmit}>
        <label>
          Title:
          <input id="title" name="title" type="text" />
        </label>
        <label>
          Author:
          <input id="author" name="author" type="text" />
        </label>
        <label>
          Completion Time (in minutes):
          <input id="completion-time" name="completion-time" type="number" />
        </label>
        <label>Ingredients:</label>
        <input type="button" value="Add an ingredient" onClick={addIng} />
        {ingredientData.map((val, ind) => {
          return (
            <div>
              <label>Measurement:</label>
              <input
                type="text"
                name="measurement"
                data-id={ind}
                onChange={handleIngChange}
              ></input>
              <label>Units:</label>
              <input
                type="text"
                name="unit"
                data-id={ind}
                onChange={handleIngChange}
              ></input>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                data-id={ind}
                onChange={handleIngChange}
              ></input>
            </div>
          );
        })}
        {/* <label>
          Steps:
          <input id="steps" name="steps" type="text" />
        </label> */}
        <label>
          Recipe Yield:
          <input id="recipe-yield" name="recipe-yield" type="number" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddRecipe;
