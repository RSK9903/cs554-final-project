import React, { useState, useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import API from "../API";
import "../App.css";

function AddReview(props) {
  const { currentUser } = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);

  const formSubmit = async (event) => {
    event.preventDefault();

    let comment = document.getElementById("comment").value;
    let rating = document.getElementById("rating").value;
    let postDate = Date.now();
    let userId = currentUser.uid;
    let recipeId = props.id;

    let newReview = {
      comment: comment,
      rating: parseInt(rating),
      postDate: postDate,
      author_id: userId,
      recipe_id: recipeId,
    };
    try{
      const { data } = await API.post("/reviews", newReview);
      setSubmitted(true)
    } catch (e){
      alert(e);
    }
  };
  if(submitted){
    if (!alert("Your review has been posted.")) {
      window.location.reload();
    }
    setSubmitted(false)
  }
  return (
    <div>
      <h5>Add a Review: </h5>
      <form id="new-review" onSubmit={formSubmit}>
        <label>
          Rating (Out of 5):
          <input id="rating" name="rating" type="number" required/>
        </label>
        <label>
          Comment:
          <input id="comment" name="comment" type="text" required/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddReview;
