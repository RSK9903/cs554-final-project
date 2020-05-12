import React, { useContext, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import '../App.css';
import ChangePassword from './ChangePassword';

function Account() {
	const { currentUser } = useContext(AuthContext);
	console.log(currentUser);

	return (
		<div>
			<h2>Account Page</h2>
			<ChangePassword />
			<SignOutButton />
		</div>
	);
}

export default Account;
