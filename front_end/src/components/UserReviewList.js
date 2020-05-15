import React, { useState, useEffect } from "react";
import "../App.css";
import API from "../API";

const UserReviewList = (props) => {
    const [reviewData, setReviewData] = useState(undefined);
    const { currentUser } = useContext(AuthContext);
    let li = null;

    useEffect(() => {
      async function fetchData() {
        try {
            let id = currentUser.uid;
            const { data } = await API.get("/reviews/" + currentUser.uid + "/users");
            setReviewData(data);
        }
        catch (e) {
          console.log(e);
        }
      }
      fetchData();
    }, []);

    li = reviewData && reviewData.map((review) => {
      <li>
        Rating: {review.rating} Comment: {review.comment}
      </li>
    });
  
    return (
      <div className="App-body">
        <h3 class="recipe-review-list-header">Your Reviews</h3>
        <ul class="recipe-review-list">{li}</ul>
      </div>
    );

  };
  
  export default RecipeReviewList;