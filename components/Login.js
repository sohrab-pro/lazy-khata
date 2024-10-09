import { View, Text, TextInput, Button } from "react-native";
import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signUp, login, logout } from "../auth";

export default function Login({ setLogin }) {
	const [email, setEmail] = useState("sohrabprofile@gmail.com");
	const [password, setPassword] = useState("khankhan");
	const handleLogin = async () => {
		const response = await login(email, password);
		console.log(response);
		// setLogin(true);
	};

	const handleSignUp = async () => {
		const response = await signUp(email, password);
		if (response) {
			setLogin(true);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text>Email:</Text>
				<TextInput
					value={email}
					onChangeText={(text) => setEmail(text)}
					placeholder="Enter email"
				/>
				<Text>Password:</Text>
				<TextInput
					secureTextEntry
					value={password}
					onChangeText={(text) => setPassword(text)}
					placeholder="Enter password"
				/>

				<Button title="Sign Up" onPress={handleSignUp} />
				<Button title="Login" onPress={handleLogin} />
			</View>
		</SafeAreaView>
	);
}

const styles = {
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "100%",
	},
	content: {
		justifyContent: "center",
		flex: 1,
		width: "80%",
	},
};
