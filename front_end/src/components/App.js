import React from "react";
import "../App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Account from "./Account";
import Home from "./Home";
import Landing from "./Landing";
import Navigation from "./Navigation";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { AuthProvider } from "../firebase/Auth";
import PrivateRoute from "./PrivateRoute";
import SingleRecipe from "./SingleRecipe";
import RecipeList from "./RecipeList";
import AddRecipe from "./AddRecipe";
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 class="page-header">Quarantine Kitchen</h1>
            <Navigation />
          </header>
        </div>
        <Route exact path="/" component={Landing} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/account" component={Account} />
        <PrivateRoute path="/addrecipe" component={AddRecipe} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/recipes/:id" exact component={SingleRecipe}></Route>
        <Route path="/recipes" exact component={RecipeList}></Route>
      </Router>
    </AuthProvider>
  );
}

export default App;
