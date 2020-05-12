import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../firebase/FirebaseFunctions";
import { AuthContext } from "../firebase/Auth";
import SocialSignIn from "./SocialSignIn";
import API from "../API";

function SignUp() {
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState("");
  const [userData, setUser] = useState(undefined);
  const handleSignUp = async (e) => {
    e.preventDefault();
    const {
      first,
      last,
      birthday,
      email,
      passwordOne,
      passwordTwo,
    } = e.target.elements;
    let user = {};
    user.firstName = first.value;
    user.lastName = last.value;
    user.birthday = birthday.value;
    user.email = email.value;
    setUser(user);
    if (passwordOne.value !== passwordTwo.value) {
      setPwMatch("Passwords do not match");
      return false;
    }
    let displayName = first.value + " " + last.value;
    try {
      await doCreateUserWithEmailAndPassword(
        email.value,
        passwordOne.value,
        displayName
      );
    } catch (error) {
      alert(error);
    }
  };
  const addUser = async (user) => {
    try {
      userData.id = currentUser.uid;
      await API.post("users/", userData);
    } catch (error) {
      alert("Error with post" + error);
    }
  };

  if (currentUser) {
    addUser();
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Sign up</h1>
      {pwMatch && <h4 className="error">{pwMatch}</h4>}
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>
            First Name:
            <input
              className="form-control"
              required
              name="first"
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
              required
              name="last"
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
              required
              name="birthday"
              type="date"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input
              className="form-control"
              required
              name="email"
              type="email"
              placeholder="Email"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input
              className="form-control"
              id="passwordOne"
              name="passwordOne"
              type="password"
              placeholder="Password"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Confirm Password:
            <input
              className="form-control"
              name="passwordTwo"
              type="password"
              placeholder="Confirm Password"
              required
            />
          </label>
        </div>
        <button id="submitButton" name="submitButton" type="submit">
          Sign Up
        </button>
      </form>
      <br />
      <SocialSignIn />
    </div>
  );
}

export default SignUp;
