import React from "react";
import { doSignOut } from "../firebase/FirebaseFunctions";
import { Button } from "react-bootstrap";

const SignOutButton = () => {
	return (
		<button variant="dark" type="button" onClick={doSignOut}>
			Sign Out
		</button>
	);
};

export default SignOutButton;
