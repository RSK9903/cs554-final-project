import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import API from "../API";
import { Date } from "prismic-reactjs";
import {Link} from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import DeleteElement from "./DeleteElement";

const RecipeReviewList = (props) => {
  const { currentUser } = useContext(AuthContext);
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

  if (reviewData && !setAuthor) {
    getAuthor();
  }

  li = reviewData && setAuthor && reviewData.map((review) => {
    const day = reviewData && Date(review.postDate).getDate();
    const month = reviewData && Date(review.postDate).getMonth() + 1;
    const year = reviewData && Date(review.postDate).getFullYear();
    const date = month + "/" + day + "/" + year;
    const isOwner = currentUser.uid === review.author_id;
    return(
      <div>
      <h4><Link to={`/users/${review.author_id}`}>{review.author_name}</Link></h4>
        <p>Date Posted: {date}</p>
        <p>Rating: {review.rating}</p>
        <p>Comment: {review.comment}</p>
        {isOwner && <DeleteElement elementType="review" elementId={review._id}/>}
      </div>
    )
  });

  let list = null;

  if(reviewData && reviewData.length>0){
    list = <div class="recipe-review-list">{li}</div>
  } else {
    list = <p>No Reviews :(</p>
  }

  return (
    <div className="App-body">
      <h3 class="recipe-review-list-header">Reviews for this Recipe</h3>
      {list}
    </div>
  );
};

export default RecipeReviewList;
