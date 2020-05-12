import React, { useContext, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import '../App.css';
import ChangePassword from './ChangePassword';
import ChangeInfo from './ChangeInfo';

function Account() {
	const { currentUser } = useContext(AuthContext);

	return (
		<div>
			<h2>Account Page</h2>
			<ChangeInfo />
			<ChangePassword />
			<SignOutButton />
		</div>
	);
}

export default Account;
