import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import '../App.css';
import ChangePassword from './ChangePassword';
import ChangeInfo from './ChangeInfo';
import API from '../API';

function Account() {
	const { currentUser } = useContext(AuthContext);
	const [ user, setUser ] = useState(undefined);
	useEffect(
		() => {
			async function fetchData() {
				try {
					let id = currentUser.uid;
					const { data: userInfo } = await API.get("users/"+id);
					setUser(userInfo);
				} catch (e) {
					console.log(e);
				}
			}
			fetchData();
		},
		[]
	);

	return (
		<div>
			<h2>Account Page</h2>
			<h3>Name: {user&&user.firstName} {user&&user.lastName}</h3>
			<h3>Email: {user&&user.email}</h3>
			<h3>Birthday: {user && user.birthday}</h3>
			<ChangeInfo />
			<ChangePassword />
			<SignOutButton />
		</div>
	);
}

export default Account;
