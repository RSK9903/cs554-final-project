import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import API from "../API";
import {Link} from "react-router-dom";

const UserReviewList = (props) => {
    const [reviewData, setReviewData] = useState(undefined);
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

    let setTitle = false;

    const getTitle = async () => {
      let index;
      for(index in reviewData){
        let review = reviewData[index];
        const {data:recipe} = await API.get("recipes/"+review.recipe_id);
        review.recipe_name = recipe.title;
      }
      setTitle=true;
    };
  
    if (reviewData && !setTitle) {
      getTitle();
      console.log(reviewData)
    }    

    li = reviewData && reviewData.map((review) => {
      return(
        <li><Link to={`/recipes/${review.recipe_id}`}>{review.recipe_name}</Link>
          <ul>
            <li>Rating: {review.rating}</li>
            <li>Comment: {review.comment}</li>
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