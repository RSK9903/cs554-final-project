import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import SignOutButton from "./SignOut";
import { Navbar, Nav } from "react-bootstrap";
import "../App.css";

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      style={{ justifyContent: "space-between" }}
    >
      <Navbar.Brand href="/">Quarantine Kitchen</Navbar.Brand>
      <Nav>
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/account">Account</Nav.Link>
        <Nav.Link href="/recipes">Recipes</Nav.Link>
        <SignOutButton />
      </Nav>
    </Navbar>
  );
};

const NavigationNonAuth = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      style={{ justifyContent: "space-between" }}
    >
      <Navbar.Brand href="/">Quarantine Kitchen</Navbar.Brand>
      <Nav>
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/signup">Sign-up</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/signin">Sign-In</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
