import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import API from "../API";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../App.css";

function AddRecipe() {
  const [postData, setPostData] = useState({});
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const [ingredientData, setIngredientData] = useState([
    { measurement: "", unit: "", name: "" },
  ]);
  const newIng = { measurement: "", unit: "", name: "" };

  const [image, setImage] = useState("empty");

  const [stepsData, setStepsData] = useState([""]);
  const [submitted, setSubmitted] = useState(false);

  const addIng = () => {
    setIngredientData([...ingredientData, { ...newIng }]);
  };
  const delIng = (ind) => {
    const tempIng = [...ingredientData];
    console.log(tempIng);
    console.log(ind);
    tempIng.splice(ind, 1);
    if (tempIng.length == 0) {
      setIngredientData([newIng]);
    } else {
      setIngredientData(tempIng);
    }
  };
  const handleIngChange = (event) => {
    const tempIng = [...ingredientData];
    tempIng[event.target.dataset.id][event.target.name] = event.target.value;
    setIngredientData(tempIng);
  };

  const addStep = () => {
    setStepsData([...stepsData, ""]);
  };
  const delStep = (ind) => {
    const tempIng = [...stepsData];
    tempIng.splice(ind, 1);
    if (tempIng.length == 0) {
      setStepsData("");
    } else {
      setStepsData(tempIng);
    }
  };
  const handleStepChange = (event) => {
    const tempSteps = [...stepsData];
    tempSteps[event.target.dataset.id] = event.target.value;
    setStepsData(tempSteps);
  };

  const handleImageUpload = (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append("file", event.target.files[0]);
    setImage(data);
  };

  const formSubmit = async (event) => {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let completionTime = document.getElementById("completion-time").value;
    let recipe_yield = document.getElementById("recipe-yield").value;

    let datePosted = Date.now();
    let newRecipe = {
      title: title,
      author: currentUser && currentUser.uid,
      datePosted: datePosted,
      completionTime: parseInt(completionTime),
      ingredients: ingredientData,
      steps: stepsData,
      recipe_yield: parseInt(recipe_yield),
    };
    console.log(newRecipe);
    const { data } = await API.post("/recipes", newRecipe);
    // let recipeId = data._id;
    if (image !== "empty") {
      console.log("IMAGE DETECTED");
      const { imageResult } = await API.post("/images/" + data._id, image, {
        headers: {
          "Content-Type": "multipart/form-data, boundary=${form._boundary}",
        },
      });
    } else {
      console.log("NO IMAGE DETECTED");
    }
    setPostData(data);
    setSubmitted(true);
  };

  if (submitted) {
    console.log("Submitted recipe");
    console.log(postData);
    if (postData && postData._id)
      if (!alert("Your recipe has been added.")) {
        return <Redirect to={"/recipes/" + postData._id} />;
      }
    else alert("Could not add recipe, please try again");
  }
  return (
    <Container>
      <Row>
        <Col>
          <div className="new-recipe">
            <h1>Add a New Recipe</h1>
            <p>
              To add a new recipe, fill in all of the fields below. Please do
              not leave any blank fields, as you will be unable to submit your
              recipe.
            </p>
          </div>
        </Col>
      </Row>
      <br />
      <Row style={{ marginBottom: "5%" }}>
        <Col>
          <Form onSubmit={formSubmit}>
            <Row>
              <Col>
                <div>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      id="title"
                      name="title"
                      type="text"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
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
                  let showButton = "";
                  if (ingredientData.length > 1) {
                    showButton = <Button variant="dark" type="button" onClick={(e) => delIng(ind, e)}>Delete Ingredient</Button>
                  }
                  return (
                    <div id={val + ind}>
                      <div>
                        <Form.Group>
                          <Form.Label>Measurement </Form.Label>
                          <Form.Control
                            type="text"
                            name="measurement"
                            data-id={ind}
                            onChange={handleIngChange}
                            value={val.measurement}
                            placeholder=" ex. 1, 1.5, 1 1/2"
                            required
                          />
                        </Form.Group>
                      </div>
                      <div>
                        <Form.Group>
                          <Form.Label>Units</Form.Label>
                          <Form.Control
                            type="text"
                            name="unit"
                            data-id={ind}
                            onChange={handleIngChange}
                            value={val.unit}
                            placeholder=" ex. cups, tbsp, tsp"
                            required
                          />
                        </Form.Group>
                      </div>
                      <div>
                        <Form.Group>
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            data-id={ind}
                            onChange={handleIngChange}
                            value={val.name}
                            placeholder=" ex. flour, sugar, oil"
                            required
                          />
                        </Form.Group>
                      </div>
                      {showButton}
                    </div>
                  );
                })}
                <Button variant="dark" type="button" onClick={addIng}>
                  Add a New Ingredient
                </Button>
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
                  let stepButton = "";
                  if (stepsData.length > 1) {
                    stepButton = <Button variant="dark" type="button" onClick={(e) => delStep(ind, e)}>Delete Step</Button>
                  }
                  return (
                    <div id={val + ind}>
                      <Form.Group>
                        <Form.Label>{"Step " + (ind + 1)} </Form.Label>
                        <Form.Control
                          type="text"
                          name="step"
                          data-id={ind}
                          onChange={handleStepChange}
                          value={val}
                          placeholder=" ex. Stir together the flour and butter"
                          required
                        />
                      </Form.Group>
                      {stepButton}
                    </div>
                  );
                })}
                <Button variant="dark" type="button" onClick={addStep}>
                  Add a New Step
                </Button>
                <br />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Form.Group>
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
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Recipe Image</Form.Label>
                  <Form.Control
                    type="file"
                    formEncType="multipart/form-data"
                    id="recipe-image"
                    name="recipe-image"
                    onChange={handleImageUpload}
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
    </Container>
  );
}

export default AddRecipe;
