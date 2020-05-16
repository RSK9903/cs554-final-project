import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import "../App.css";
import API from "../API";

const UserReviewList = (props) => {
    const [reviewData, setReviewData] = useState(undefined);
    const { currentUser } = useContext(AuthContext);
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

    li = reviewData && reviewData.map((review) => {
      return(
      <li>
        Rating: {review.rating} Comment: {review.comment}
      </li>
      )
    });
  
    return (
      <div className="userPage">
        <h3 className="recipe-review-list-header">Reviews</h3>
        <ul className="recipe-review-list">{li}</ul>
      </div>
    );

  };
  
  export default UserReviewList;