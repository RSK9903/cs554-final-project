import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import API from "../API";
import "../App.css";

function AddReview(props) {
  const [postData, setPostData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const formSubmit = async (event) => {
    event.preventDefault();

    let comment = document.getElementById("comment").value;
    let rating = document.getElementById("rating").value;
    let postDate = Date.now();
    let userId = currentUser.uid;
    console.log("UserID: " + userId)
    let recipeId = props.id;
    console.log("Recipe ID: " + recipeId)

    let newReview = {
      comment: comment,
      rating: parseInt(rating),
      postDate: postDate,
      author_id: userId,
      recipe_id: recipeId,
    };

    const { data } = await API.post("/reviews", newReview);
    setPostData(data);
    setSubmitted(true);
  };

  if (submitted) {
    if (postData && postData._id) {
      return <Redirect to={`/recipes/${props.id}`} />;
    } else {
      alert("Could not submit review");
    }
  }

  return (
    <div>
      <h5>Add a Review: </h5>
      <form id="new-review" onSubmit={formSubmit}>
        <label>
          Rating (Out of 5):
          <input id="rating" name="rating" type="number" />
        </label>
        <label>
          Comment:
          <input id="comment" name="comment" type="text" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddReview;
