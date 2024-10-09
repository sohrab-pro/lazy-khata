// auth.js
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { storeUser, getUser } from "./storage";

const signUp = async (email, password) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		// console.log(user);
		await storeUser(user);
		return user;
	} catch (error) {
		console.error(
			error.code,
			"error!!",
			error.code == "auth/email-already-in-use",
			"here##"
		);
		return false;
	}
};

const login = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		console.log(userCredential);
		const user = userCredential.user;
		await getUser(user.uid);
	} catch (error) {
		console.log("this error");
		console.error(error);
	}
};

const logout = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error(error);
	}
};

export { signUp, login, logout };
