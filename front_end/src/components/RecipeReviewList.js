import React, { useState, useEffect } from "react";
import "../App.css";
import API from "../API";

const RecipeReviewList = (props) => {
    const [reviewData, setReviewData] = useState(undefined);
    let li = null;

    useEffect(() => {
      async function fetchData() {
        try {
          const { data } = await API.get(`/reviews/${props.match.params.id}/recipes`);
          setReviewData(data);
        }
        catch (e) {
          console.log(e);
        }
      }
      fetchData();
    }, props.match.params.id);

    li = reviewData && reviewData.map((review) => {
      <li>
        Rating: {review.rating} Comment: {review.comment}
      </li>
    });
  
    return (
      <div className="App-body">
        <h3 class="recipe-review-list-header">Reviews for this Recipe</h3>
        <ul class="recipe-review-list">{li}</ul>
      </div>
    );

  };
  
  export default RecipeReviewList;