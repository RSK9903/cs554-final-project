import React, { useContext, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import '../App.css';
import API from '../API';

function ChangePassword() {
	const { currentUser } = useContext(AuthContext);
	const [ pwMatch, setPwMatch ] = useState('');

	const submitForm = async (event) => {
		event.preventDefault();
        const { newFirst, newLast, newBirthday } = event.target.elements;

        let newInfo = {};
        if(newFirst.value){
            newInfo.firstName = newFirst.value;
        }
        if(newLast.value){
            newInfo.lastName = newLast.value;
        }
        if(newBirthday.value){
            newInfo.birthday = newBirthday.value;
        }
		try {
            await API.patch("users/"+currentUser.uid, newInfo);
            alert("Your information has been changed.")
		} catch (error) {
			alert(error);
		}
	};
		return (
			<div>
				{pwMatch && <h4 className='error'>{pwMatch}</h4>}
				<h2>Change User Information</h2>
				<form onSubmit={submitForm}>
					<div className='form-group'>
						<label>
							First Name:
							<input
								className='form-control'
								name='newFirst'
								id='newFirst'
								type='text'
								placeholder='First Name'
							/>
						</label>
					</div>

					<div className='form-group'>
						<label>
							Last Name:
							<input
								className='form-control'
								name='newLast'
								id='newLast'
								type='text'
								placeholder='Last Name'
							/>
						</label>
					</div>
					<div className='form-group'>
						<label>
							Birthday:
							<input
								className='form-control'
								name='newBirthday'
								id='newBirthday'
								type='date'
							/>
						</label>
					</div>

					<button type='submit'>Change User Information</button>
				</form>
				<br />
			</div>
		);
}

export default ChangePassword;
