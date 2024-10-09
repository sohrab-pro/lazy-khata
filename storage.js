// storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUser = async (user) => {
	const userData = {
		uid: user.uid,
		email: user.email,
		name: user.displayName,
		photoURL: user.photoURL,
	};
	await AsyncStorage.setItem("user", JSON.stringify(userData));
};

export const getUser = async () => {
	const user = await AsyncStorage.getItem("user");
	return JSON.parse(user);
};

export const removeUser = async () => {
	await AsyncStorage.removeItem("user");
};
