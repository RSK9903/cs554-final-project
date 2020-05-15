import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import API from "../API";
import "../App.css";

function AddRecipe() {
  const [postData, setPostData] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [ingredientData, setIngredientData] = useState([
    { measurement: "", unit: "", name: "" },
  ]);
  const newIng = { measurement: "", unit: "", name: "" };

  const [stepsData, setStepsData] = useState([""]);
  const [submitted, setSubmitted] = useState(false);

  const addIng = () => {
    setIngredientData([...ingredientData, { ...newIng }]);
  };
  const handleIngChange = (event) => {
    const tempIng = [...ingredientData];
    tempIng[event.target.dataset.id][event.target.name] = event.target.value;
    setIngredientData(tempIng);
  };

  const addStep = () => {
    setStepsData([...stepsData, ""]);
  };
  const handleStepChange = (event) => {
    const tempSteps = [...stepsData];
    tempSteps[event.target.dataset.id] = event.target.value;
    setStepsData(tempSteps);
  };

  const formSubmit = async (event) => {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let completionTime = document.getElementById("completion-time").value;
    let recipe_yield = document.getElementById("recipe-yield").value;

    let datePosted = Date.now();
    let newRecipe = {
      title: title,
      author: currentUser && currentUser.displayName,
      datePosted: datePosted,
      completionTime: parseInt(completionTime),
      ingredients: ingredientData,
      steps: stepsData,
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
    <div className="new-recipe">
      <h1>Add a New Recipe</h1>
      <p>
        To add a new recipe, fill in all of the fields below. Please do not
        leave any blank fields, as you will be unable to submit your recipe.
      </p>
      <form id="new-recipe" onSubmit={formSubmit}>
        <label>
          Title:
          <input id="title" name="title" type="text" required />
        </label>
        <br />
        <label>
          Completion Time (in minutes):
          <input
            className="completion-time"
            id="completion-time"
            name="completion-time"
            type="number"
            required
          />
          &nbsp; min
        </label>
        <br />
        <label className="ing-header">Ingredients:</label>
        <br />
        {ingredientData.map((val, ind) => {
          return (
            <div className="add-ings">
              <div>
                <label>Measurement:</label>
                <input
                  type="text"
                  name="measurement"
                  data-id={ind}
                  onChange={handleIngChange}
                  placeholder=" ex. 1, 1.5, 1 1/2"
                  required
                ></input>
              </div>
              <div>
                <label>Units:</label>
                <input
                  type="text"
                  name="unit"
                  data-id={ind}
                  onChange={handleIngChange}
                  placeholder=" ex. cups, tbsp, tsp"
                  required
                ></input>
              </div>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  data-id={ind}
                  onChange={handleIngChange}
                  placeholder=" ex. flour, sugar, oil"
                  required
                ></input>
              </div>
            </div>
          );
        })}
        <br />
        <input type="button" value="Add a New Ingredient" onClick={addIng} />
        <br />
        <label className="steps-header">Steps:</label>
        <br />
        {stepsData.map((val, ind) => {
          return (
            <div>
              <label>{"Step " + (ind + 1)}:</label>
              <input
                type="text"
                name="step"
                data-id={ind}
                onChange={handleStepChange}
                placeholder=" ex. Stir together the flour and butter"
                required
              ></input>
            </div>
          );
        })}
        <br />
        <input type="button" value="Add a New Step" onClick={addStep} />
        <br />
        <label>
          Recipe Yield:&nbsp;
          <input
            className="recipe_yield"
            id="recipe-yield"
            name="recipe-yield"
            type="number"
            required
          />
          &nbsp; servings
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddRecipe;
