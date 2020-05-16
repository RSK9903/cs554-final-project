import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import API from "../API";
import {Link} from "react-router-dom";

const UserReviewList = (props) => {
    const [reviewData, setReviewData] = useState(undefined);
	  const [setTitle, setGetTitle] = useState(false);
    let li = null;
    useEffect(() => {
      async function fetchData() {
        try {
          const { data } = await API.get("/reviews/"+props.id+"/users");
          setReviewData(data);
        }
        catch (e) {
          console.log(e);
        }
      }
      fetchData();
    }, []);

    const getTitle = async () => {
      let index;
      for(index in reviewData){
        let review = reviewData[index];
        const {data:recipe} = await API.get("recipes/"+review.recipe_id);
        review.recipe_name = recipe.title;
      }
      setGetTitle(true);
    };
  
    if (reviewData && !setTitle) {
      getTitle();

      console.log(reviewData)
    }
    
    const day = reviewData && Date(reviewData.postDate).getDate();
    const month = reviewData && Date(reviewData.postDate).getMonth() + 1;
    const year = reviewData && Date(reviewData.postDate).getFullYear();
    const date = month + "/" + day + "/" + year;  

    li = reviewData && setTitle && reviewData.map((review) => {
      return(
        <li><Link to={`/recipes/${review.recipe_id}`}>{review.recipe_name}</Link>
          <ul>
            <li>Rating: {review.rating}</li>
            <li>Comment: {review.comment}</li>
            <li>Date Posted: {date}</li>
          </ul>
        </li>
      )
    });
  
    return (
      <div className="userPage">
        <h3 className="recipe-review-list-header">Reviews</h3>
        <ul className="recipe-review-list">
          {li}
        </ul>
      </div>
    );

  };
  
  export default UserReviewList;