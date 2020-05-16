import React, { useContext } from "react";
import { Link } from "react-router-dom";
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
		<Navbar bg="dark" variant="dark" className="navbar">
			<Navbar.Brand href="/">Quarantine Kitchen</Navbar.Brand>
			<Nav>
				<Nav.Link as={Link} to="/">Home</Nav.Link>
				<Nav.Link as={Link} to="/account">Account</Nav.Link>
				<Nav.Link as={Link} to="/recipes">Recipes</Nav.Link>
				<Nav.Link as={Link} to="/addrecipe">Add Recipe</Nav.Link>
				<SignOutButton />
			</Nav>
		</Navbar>
	);
};

const NavigationNonAuth = () => {
	return (
		<Navbar bg="dark" variant="dark" className="navbar">
			<Navbar.Brand href="/">Quarantine Kitchen</Navbar.Brand>
			<Nav>
				<Nav.Item>
					<Nav.Link as={Link} to="/">Home</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link as={Link} to="/recipes">Recipes</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link as={Link} to="/signup">Sign-up</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link as={Link} to="/signin">Sign-In</Nav.Link>
				</Nav.Item>
			</Nav>
		</Navbar>
	);
};

export default Navigation;
