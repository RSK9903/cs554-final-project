import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import API from "../API";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
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

<<<<<<< Updated upstream
  const handleImageUpload = (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append("file", event.target.files[0]);
    setImage(data);
  };

=======
>>>>>>> Stashed changes
  const formSubmit = async (event) => {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let completionTime = document.getElementById("completion-time").value;
    let recipe_yield = document.getElementById("recipe-yield").value;

    let datePosted = Date.now();
    let newRecipe = {
      title: title,
      author: currentUser && currentUser.uid,
      displayName: currentUser && currentUser.displayName,
      datePosted: datePosted,
      completionTime: parseInt(completionTime),
      ingredients: ingredientData,
      steps: stepsData,
      recipe_yield: parseInt(recipe_yield),
    };

    const { data } = await API.post("/recipes", newRecipe);
<<<<<<< Updated upstream
    let recipeId = data._id;
    const { imageResult } = await API.post("/images/" + recipeId, image, {
      headers: {
        "Content-Type": "multipart/form-data, boundary=${form._boundary}",
      },
    });
=======
>>>>>>> Stashed changes
    setPostData(data);
    setSubmitted(true);
  };

  if (submitted) {
    if (postData && postData._id)
      return <Redirect to={"/recipes/" + postData._id} />;
    else alert("Could not add recipe, please try again");
  }
  return (
<<<<<<< Updated upstream
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
        <label>
          Recipe Image:&nbsp;
          <input
            type="file"
            formEncType="multipart/form-data"
            id="recipe-image"
            name="recipe-image"
            onChange={handleImageUpload}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
=======
    <Container>
      <Row>
        <Col>
          <div className="new-recipe">
            <h1>Add a New Recipe</h1>
            <p>
              To add a new recipe, fill in all of the fields below. Please do not
              leave any blank fields, as you will be unable to submit your recipe.
            </p>
          </div>
        </Col>
      </Row>
      <br />
      <Row style={{ marginBottom: '5%' }}>
        <Col>
          <Form onSubmit={formSubmit}>
            <Row>
              <Col>
                <div>
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      id="title"
                      name="title"
                      type="text"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Completion Time (minutes)</Form.Label>
                    <Form.Control
                      id="completion-time"
                      name="completion-time"
                      type="number"
                      required
                    />
                  </Form.Group>
                </div>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col>
                <div>
                  <h2>Ingredients</h2>
                </div>
                <br />
                {ingredientData.map((val, ind) => {
                  return (
                    <div >
                      <div>
                        <Form.Group controlId="formBasicName">
                          <Form.Label>Measurement </Form.Label>
                          <Form.Control
                            type="text"
                            name="measurement"
                            data-id={ind}
                            onChange={handleIngChange}
                            placeholder=" ex. 1, 1.5, 1 1/2"
                            required
                          />
                        </Form.Group>
                      </div>
                      <div>
                        <Form.Group controlId="formBasicName">
                          <Form.Label>Units</Form.Label>
                          <Form.Control
                            type="text"
                            name="unit"
                            data-id={ind}
                            onChange={handleIngChange}
                            placeholder=" ex. cups, tbsp, tsp"
                            required
                          />
                        </Form.Group>
                      </div>
                      <div>
                        <Form.Group controlId="formBasicName">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            data-id={ind}
                            onChange={handleIngChange}
                            placeholder=" ex. flour, sugar, oil"
                            required
                          />
                        </Form.Group>
                      </div>
                    </div>
                  );
                })}
                <Button variant="dark" type="button" onClick={addIng} >Add a New Ingredient</Button>
                <br />
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col>
                <div>
                  <h2>Steps</h2>
                </div>
                <br />
                {stepsData.map((val, ind) => {
                  return (
                    <div>
                      <Form.Group controlId="formBasicName">
                        <Form.Label>{"Step " + (ind + 1)} </Form.Label>
                        <Form.Control
                          type="text"
                          name="step"
                          data-id={ind}
                          onChange={handleStepChange}
                          placeholder=" ex. Stir together the flour and butter"
                          required
                        />
                      </Form.Group>
                    </div>
                  );
                })}
                <Button variant="dark" type="button" onClick={addStep} >Add a New Step</Button>
                <br />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Recipe Yield (servings)</Form.Label>
                  <Form.Control
                    id="recipe-yield"
                    name="recipe-yield"
                    type="number"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container >
    // <div className="new-recipe">
    //   <h1>Add a New Recipe</h1>
    //   <p>
    //     To add a new recipe, fill in all of the fields below. Please do not
    //     leave any blank fields, as you will be unable to submit your recipe.
    //   </p>
    //   <form id="new-recipe" onSubmit={formSubmit}>
    //     <label>
    //       Title:
    //       <input id="title" name="title" type="text" required />
    //     </label>
    //     <br />
    //     <label>
    //       Completion Time (in minutes):
    //       <input
    //         className="completion-time"
    //         id="completion-time"
    //         name="completion-time"
    //         type="number"
    //         required
    //       />
    //       &nbsp; min
    //     </label>
    //     <br />
    //     <label className="ing-header">Ingredients:</label>
    //     <br />
    //     {ingredientData.map((val, ind) => {
    //       return (
    //         <div className="add-ings">
    //           <div>
    //             <label>Measurement:</label>
    //             <input
    //               type="text"
    //               name="measurement"
    //               data-id={ind}
    //               onChange={handleIngChange}
    //               placeholder=" ex. 1, 1.5, 1 1/2"
    //               required
    //             ></input>
    //           </div>
    //           <div>
    //             <label>Units:</label>
    //             <input
    //               type="text"
    //               name="unit"
    //               data-id={ind}
    //               onChange={handleIngChange}
    //               placeholder=" ex. cups, tbsp, tsp"
    //               required
    //             ></input>
    //           </div>
    //           <div>
    //             <label>Name:</label>
    //             <input
    //               type="text"
    //               name="name"
    //               data-id={ind}
    //               onChange={handleIngChange}
    //               placeholder=" ex. flour, sugar, oil"
    //               required
    //             ></input>
    //           </div>
    //         </div>
    //       );
    //     })}
    //     <br />
    //     <input type="button" value="Add a New Ingredient" onClick={addIng} />
    //     <br />
    //     <label className="steps-header">Steps:</label>
    //     <br />
    //     {stepsData.map((val, ind) => {
    //       return (
    //         <div>
    //           <label>{"Step " + (ind + 1)}:</label>
    //           <input
    //             type="text"
    //             name="step"
    //             data-id={ind}
    //             onChange={handleStepChange}
    //             placeholder=" ex. Stir together the flour and butter"
    //             required
    //           ></input>
    //         </div>
    //       );
    //     })}
    //     <br />
    //     <input type="button" value="Add a New Step" onClick={addStep} />
    //     <br />
    //     <label>
    //       Recipe Yield:&nbsp;
    //       <input
    //         className="recipe_yield"
    //         id="recipe-yield"
    //         name="recipe-yield"
    //         type="number"
    //         required
    //       />
    //       &nbsp; servings
    //     </label>
    //     <br />
    //     <input type="submit" value="Submit" />
    //   </form>
    // </div>
>>>>>>> Stashed changes
  );
}

export default AddRecipe;
