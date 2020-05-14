import React from 'react';
import { doSignOut } from '../firebase/FirebaseFunctions';
import { Button } from 'react-bootstrap';

const SignOutButton = () => {
	return (
		<Button variant="dark" type='button' onClick={doSignOut}>
			Sign Out
		</Button>
	);
};

export default SignOutButton;
