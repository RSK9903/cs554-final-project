import React, { useState, useEffect, useContext } from "react";
import { Date } from "prismic-reactjs";
import jsPDF from "jspdf";
import "../App.css";
import API from "../API";
import RecipeReviewList from "./RecipeReviewList";
import AddReview from "./AddReview";
import { AuthContext } from "../firebase/Auth";
import {Link} from "react-router-dom";

// Helper function to render recipe div to a PDF
function printDocument() {
  let pdf = new jsPDF();
  // Set page size to a standard 8.5" x 11" sheet
  pdf.canvas.height = 72 * 11;
  pdf.canvas.width = 72 * 8.5;
  pdf.fromHTML(document.getElementById("recipe-div"));
  // Sleep for 2 seconds, which is necessary to utilize jsPDF with React
  setTimeout(function () {
    // Open the PDF in a new tab
    pdf.output("dataurlnewwindow");
    // Download the document
    pdf.save("recipe.pdf");
  }, 2000);
}

const SingleRecipe = (props) => {
	const { currentUser } = useContext(AuthContext);
  const [recipeData, setRecipeData] = useState(undefined);
  const [reviewData, setReviews] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: recipe } = await API.get(
          `/recipes/${props.match.params.id}`
        );
        setRecipeData(recipe);
        const { data:reviews } = await API.get(`/reviews/${props.match.params.id}/recipes`);
        setReviews(reviews);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, props.match.params.id);

  const buildIngredientListItem = (m, u, n) => {
    return <li>{m + " " + u + " " + n}</li>;
  };

  const ingli =
    recipeData &&
    recipeData.ingredients.map((i) => {
      return buildIngredientListItem(i.measurement, i.unit, i.name);
    });

  const buildStepsListItem = (s, num) => {
    return <li>{s}</li>;
  };

  const day = recipeData && Date(recipeData.datePosted).getDate();
  const month = (recipeData && Date(recipeData.datePosted).getMonth()) + 1;
  const year = recipeData && Date(recipeData.datePosted).getFullYear();

  const date = month + "/" + day + "/" + year;

  const stepsli =
    recipeData &&
    recipeData.steps.map((s, ind) => {
      return buildStepsListItem(s, ind + 1);
    });

  const imagePath = `http://localhost:5000/img/${props.match.params.id}`;

  const isOwner = recipeData && currentUser && (currentUser.uid === recipeData.author);

  let review = <AddReview id={recipeData && recipeData._id} />;
  let authorlink = recipeData && <Link to={`/users/${recipeData.author}`}>{recipeData && recipeData.displayName}</Link>;
  let reviewList = <RecipeReviewList id={recipeData && recipeData._id} />;

  const alreadyReviewed = recipeData && reviewData && currentUser && reviewData.some((review)=>review.author_id==currentUser.uid);

  return (
    <div class="recipe-page">
      <div id="recipe-div" class="recipe-div">
        <h1 class="recipe-title">{recipeData && recipeData.title}</h1>
        <h2 class="recipe-header">
          Author: {authorlink}
        </h2>
        <h2 class="recipe-header">Date Posted: {date}</h2>
        <img
          class="recipe-image"
          alt={recipeData && recipeData.title}
          src={imagePath}
          onError={(e)=>{e.target.onerror = null; e.target.hidden="true"}}
        />
        <h2 class="recipe-header">
          Total Time: {recipeData && recipeData.completionTime} minutes
        </h2>
        <p class="recipe-subheader">Ingredients:</p>
        <ul class="ingredient-list">{ingli}</ul>
        <br />
        <p class="recipe-subheader">Steps:</p>
        <ol class="steps-list">{stepsli}</ol>
        <p>
          Yield: {recipeData && recipeData.recipe_yield} {"serving(s)"}
        </p>
      </div>
      <div className="printButton">
        <button onClick={printDocument}>Print</button>
      </div>
      {recipeData && reviewList}
      {!alreadyReviewed && !isOwner && currentUser && review}
    </div>
  );
};

export default SingleRecipe;
