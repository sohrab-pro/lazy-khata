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
		await storeUser(user);
		return ["success", true];
	} catch (error) {
		return [error, false];
	}
};

const login = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		await getUser(user.uid);
		await storeUser(user);
		return ["success", true];
	} catch (error) {
		console.log("this error");
		console.error(error);
		return [error, false];
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
