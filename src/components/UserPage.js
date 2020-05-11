import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = (props) => {
	const [ userData, setUserData ] = useState(undefined);
	const [ loading, setLoading] = useState(true);
	const [found, setFound] = useState(false);

	useEffect(
		() => {
			async function fetchData() {
				try {
					const { data: user } = await axios.get(`https://localhost:5000/user/${props.match.params.id}`);
					setUserData(user);
					setLoading(false);
					setFound(true);
				} catch (e) {
					setLoading(false);
					console.log(e);
				}
			}
			fetchData();
		},
		[ props.match.params.id ]
	);
	if (loading) {
		return <div>Loading...</div>;
	} else if(!found) {
		return (
			<div className="show-body">
				<Error/>
			</div>
		);
	} else {
	return (
		<div className='show-body'>
			<h1 className='cap-first-letter'>User {userData && userData._id}</h1>
		</div>
	);
	}
};

export default User;