import React, { useContext, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import "../App.css";
import API from "../API";

function ChangeInfo() {
  const { currentUser } = useContext(AuthContext);

  const submitForm = async (event) => {
    event.preventDefault();
    const { newFirst, newLast, newBirthday } = event.target.elements;

    let newInfo = {};
    if (newFirst.value) {
      newInfo.firstName = newFirst.value;
    }
    if (newLast.value) {
      newInfo.lastName = newLast.value;
    }
    if (newBirthday.value) {
      newInfo.birthday = newBirthday.value;
    }
    try {
      await API.patch("users/" + currentUser.uid, newInfo);
      if (!alert("Your information has been changed.")) {
        window.location.reload();
      }
    } catch (error) {
      alert("An error occurred. Changes could not be applied.");
    }
  };
  return (
    <div>
      <h2>Change User Information</h2>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>
            First Name:
            <input
              className="form-control"
              name="newFirst"
              id="newFirst"
              type="text"
              placeholder="First Name"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Last Name:
            <input
              className="form-control"
              name="newLast"
              id="newLast"
              type="text"
              placeholder="Last Name"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Birthday:
            <input
              className="form-control"
              name="newBirthday"
              id="newBirthday"
              type="date"
            />
          </label>
        </div>

        <button type="submit">Change User Information</button>
      </form>
      <br />
    </div>
  );
}

export default ChangeInfo;
