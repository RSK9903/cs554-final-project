import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Account from "./Account";
import Home from "./Home";
import Navigation from "./Navigation";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SingleRecipe from "./SingleRecipe";
import EditRecipe from "./EditRecipe";
import RecipeList from "./RecipeList";
import AddRecipe from "./AddRecipe";
import { AuthProvider } from "../firebase/Auth";
import PrivateRoute from "./PrivateRoute";
import User from "./SingleUser";
import Footer from './Footer';



function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="">
            {/* <header className='App-header'> */}
            <Navigation />
          </header>
        </div>
        <Route exact path="/" component={Home} />
        {/* <PrivateRoute path='/home' component={Home} /> */}
        <PrivateRoute path="/account" component={Account} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/addrecipe" component={AddRecipe} />
        <PrivateRoute path="/edit/recipes/:id" component={EditRecipe} />
        <Route path="/recipes/:id" exact component={SingleRecipe}></Route>
        <Route path="/recipes" exact component={RecipeList}></Route>
        <Route path="/users/:id" exact component={User}></Route>
        {/* <Route path="*" exact component={Error} status={404}/> */}
      </Router>
      <div>
        <footer>
          <Footer />
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
