import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import API from "../API";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../App.css";

function EditRecipe(props) {
  const { currentUser } = useContext(AuthContext);
  const [oldRecipe, setOld] = useState(undefined);
  const [ingredientData, setIngredientData] = useState(undefined);
  const [stepsData, setStepsData] = useState(undefined);
  const [allSubmitted, setSubmitted] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data: recipe } = await API.get(
          `/recipes/${props.match.params.id}`
        );
        setOld(recipe);
        setIngredientData(recipe.ingredients);
        setStepsData(recipe.steps);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, props.match.params.id);

  console.log(currentUser);

  const newIng = { measurement: "", unit: "", name: "" };

  const [image, setImage] = useState("empty");

  const addIng = () => {
    setIngredientData([...ingredientData, { ...newIng }]);
  };
  const delIng = (ind) => {
    const tempIng = [...ingredientData];
    tempIng.splice(ind,1);
    if(tempIng.length==0){
        setIngredientData([newIng]);
    } else {
        setIngredientData(tempIng);
    }
  };

  const handleIngChange = (event) => {
    const tempIng = [...ingredientData];
    tempIng[event.target.dataset.id][event.target.name] = event.target.value;
    console.log(tempIng);
    setIngredientData(tempIng);
  };

  const addStep = () => {
    setStepsData([...stepsData, ""]);
  };
  const delStep = (ind) => {
    const tempIng = [...stepsData];
    tempIng.splice(ind,1);
    if(tempIng.length==0){
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

    let newRecipe = {
      title: title,
      author: currentUser && currentUser.uid,
      datePosted: oldRecipe.datePosted,
      completionTime: parseInt(completionTime),
      ingredients: ingredientData,
      steps: stepsData,
      recipe_yield: parseInt(recipe_yield),
    };

    delete oldRecipe._id;
    let same = true;
    let i ="";
    for (i in oldRecipe) {
        console.log(i)
        console.log(oldRecipe[i]);
        console.log(newRecipe[i]);
        if (oldRecipe[i] !== newRecipe[i]) {
            same = false;
        }
    }
    let submitted = false;
    if(same){
        alert("You did not change anything!")
    } else {
        try{
            const { data } = await API.put("/recipes/"+props.match.params.id, newRecipe);
            submitted=true;
            setSubmitted(true);
        } catch(e){
            console.log(e);
            alert("An error has occurred: "+e);
        }
        if(submitted){
            console.log("Submitted!")
            try{
                if (image !== "empty") {
                    console.log("IMAGE DETECTED");
                    const { imageResult } = await API.post("/images/" + props.match.params.id, image, {
                      headers: {
                        "Content-Type": "multipart/form-data, boundary=${form._boundary}",
                      },
                    });
                  } else {
                    console.log("NO IMAGE DETECTED");
                  }
            } catch(e){
                alert("Error with image submission but your recipe has been submitted");
            }
        }    
    }  
  };
  
  if(allSubmitted){
    if (!alert("Your recipe has been changed.")) {
        return <Redirect to={"/recipes/" + props.match.params.id} />;
    }
  }
  
  if(currentUser && oldRecipe && oldRecipe.author!=currentUser.uid){
    if (!alert("You do not have access to this page!")) {
        return <Redirect to={"/recipes/" + props.match.params.id} />;
        }
  } else {
  return (
    <Container>
      <Row>
        <Col>
          <div className="new-recipe">
            <h1>Edit Recipe</h1>
            <p>
              To edit your recipe, fill in all of the fields below. Please do
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
                      defaultValue={oldRecipe && oldRecipe.title}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Completion Time (minutes)</Form.Label>
                    <Form.Control
                      id="completion-time"
                      name="completion-time"
                      type="number"
                      defaultValue={oldRecipe && oldRecipe.completionTime}
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
                {ingredientData && ingredientData.map((val, ind) => {
                    let showButton = "";
                    if (ingredientData.length>1){
                        showButton = <Button variant="dark" type="button" onClick={(e)=>delIng(ind,e)}>Delete Ingredient</Button>
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
                {stepsData && stepsData.map((val, ind) => {
                    let stepButton = "";
                    if (stepsData.length>1){
                        stepButton = <Button variant="dark" type="button" onClick={(e)=>delStep(ind,e)}>Delete Step</Button>
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
                    defaultValue={oldRecipe && oldRecipe.recipe_yield}
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
}

export default EditRecipe;
