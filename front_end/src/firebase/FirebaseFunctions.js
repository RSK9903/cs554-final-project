import firebase from 'firebase/app';

async function updateName(displayName) {
	await firebase.auth().currentUser.updateProfile({ displayName: displayName });
}

async function doCreateUserWithEmailAndPassword(email, password, displayName) {
	await firebase.auth().createUserWithEmailAndPassword(email, password);
	firebase.auth().currentUser.updateProfile({ displayName: displayName });
}

async function doChangePassword(email, oldPassword, newPassword) {
	let credential = firebase.auth.EmailAuthProvider.credential(email, oldPassword);
	await firebase.auth().currentUser.reauthenticateWithCredential(credential);
	await firebase.auth().currentUser.updatePassword(newPassword);
	await doSignOut();
}

async function doSignInWithEmailAndPassword(email, password) {
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
		.then(async function () {
			// New sign-in will be persisted with session persistence.
			await firebase.auth().signInWithEmailAndPassword(email, password);
		})
		.catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
		});
}

async function doSocialSignIn(provider) {
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
		.then(async function () {
			// New sign-in will be persisted with session persistence.
			let socialProvider = null;
			if (provider === 'google') {
				socialProvider = new firebase.auth.GoogleAuthProvider();
			} else if (provider === 'facebook') {
				socialProvider = new firebase.auth.FacebookAuthProvider();
			}
			await firebase.auth().signInWithPopup(socialProvider);
		})
		.catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
		});
}

async function doPasswordReset(email) {
	await firebase.auth().sendPasswordResetEmail(email);
}

async function doPasswordUpdate(password) {
	await firebase.auth().updatePassword(password);
}

async function doSignOut() {
	await firebase.auth().signOut();
}

export {
	updateName,
	doCreateUserWithEmailAndPassword,
	doSocialSignIn,
	doSignInWithEmailAndPassword,
	doPasswordReset,
	doPasswordUpdate,
	doSignOut,
	doChangePassword,
};
