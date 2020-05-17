import React, { useState, useEffect } from "react";
import "../App.css";
import API from "../API";
import { Date } from "prismic-reactjs";
import {Link} from "react-router-dom";

const RecipeReviewList = (props) => {
  const [reviewData, setReviewData] = useState(undefined);
	const [setAuthor, setGetAuthor] = useState(false);
  let li = null;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await API.get(`/reviews/${props.id}/recipes`);
        setReviewData(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);
  
  const getAuthor = async () => {
    let index;
    for(index in reviewData){
      let review = reviewData[index];
      const {data:user} = await API.get("users/"+review.author_id);
      review.author_name = user.displayName;
    }
    setGetAuthor(true);
  };

  li =
    reviewData &&
    reviewData.map((review) => {
      const day = reviewData && Date(review.postDate).getDate();
      const month = reviewData && Date(review.postDate).getMonth() + 1;
      const year = reviewData && Date(review.postDate).getFullYear();
      const date = month + "/" + day + "/" + year;
      return (
        <li>
          Rating: {review.rating} <br/> Comment: {review.comment} <br/> Date Posted: {date}
        </li>
      );
    });
  if (reviewData && !setAuthor) {
    getAuthor();
  }

  li = reviewData && setAuthor && reviewData.map((review) => {
    return(
      <div>
      <h4><Link to={`/users/${review.author_id}`}>{review.author_name}</Link></h4>
          <p>Rating: {review.rating}</p>
          <p>Comment: {review.comment}</p>
      </div>
    )
  });

  return (
    <div className="App-body">
      <h3 class="recipe-review-list-header">Reviews for this Recipe</h3>
      <div class="recipe-review-list">{li}</div>
    </div>
  );
};

export default RecipeReviewList;
