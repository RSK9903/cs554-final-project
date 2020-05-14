import React, { useState, useEffect } from "react";
import { Date } from "prismic-reactjs";
import jsPDF from 'jspdf';
import "../App.css";
import API from "../API";

// Helper function to render recipe div to a PDF
function printDocument() {
  let pdf = new jsPDF();
  // Set page size to a standard 8.5" x 11" sheet
  pdf.canvas.height = 72 * 11;
  pdf.canvas.width = 72 * 8.5;
  pdf.fromHTML(document.getElementById("recipe-div"));
  // Sleep for 2 seconds, which is necessary to utilize jsPDF with React
  setTimeout(function(){
      // Open the PDF in a new tab
      pdf.output('dataurlnewwindow');
      // Download the document
      pdf.save("recipe.pdf")
  },2000);
}

const SingleRecipe = (props) => {
  const [recipeData, setRecipeData] = useState(undefined);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data: recipe } = await API.get(
          `/recipes/${props.match.params.id}`
        );
        setRecipeData(recipe);
        console.log(recipe);
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

  return (
    <div class="recipe-page">
      <div id="recipe-div" class="recipe-div">
        <h1 class="recipe-title">{recipeData && recipeData.title}</h1>
        <h2 class="recipe-header">Author: {recipeData && recipeData.author}</h2>
        <h2 class="recipe-header">Date Posted: {date}</h2>
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
    </div>
  );
};

export default SingleRecipe;
