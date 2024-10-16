import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signUp, login } from "../auth";
import { LinearGradient } from "expo-linear-gradient";

function Login({ setLogin }) {
	const [email, setEmail] = useState("sohrabprofile@gmail.com");
	const [password, setPassword] = useState("khankhan");
	const [error, setError] = useState("");
	const handleLogin = async () => {
		const [response, code] = await login(email, password);
		if (code) {
			setLogin(true);
		} else {
			if (response.code === "User not found") {
				setError("User not found");
			} else if (response.code === "auth/invalid-credential") {
				setError("Incorrect email or password");
			} else {
				setError("Something went wrong");
			}
		}
	};

	const handleSignUp = async () => {
		const [response, code] = await signUp(email, password);
		if (code) {
			setLogin(true);
		} else {
			if (response.code === "auth/email-already-in-use") {
				setError("Email already in use");
			} else {
				setError("Something went wrong");
			}
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient
				colors={["#4c669f", "#3b5998", "#192f6a"]}
				style={styles.gradient}>
				<View style={styles.content}>
					<Text style={styles.title}>Welcome Back</Text>
					<Text style={styles.error}>{error}</Text>
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Email:</Text>
						<TextInput
							style={styles.input}
							value={email}
							onChangeText={(text) => setEmail(text)}
							placeholder="Enter email"
							placeholderTextColor="#a0a0a0"
						/>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Password:</Text>
						<TextInput
							style={styles.input}
							secureTextEntry
							value={password}
							onChangeText={(text) => setPassword(text)}
							placeholder="Enter password"
							placeholderTextColor="#a0a0a0"
						/>
					</View>
					<TouchableOpacity
						style={styles.button}
						onPress={handleLogin}>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, styles.signUpButton]}
						onPress={handleSignUp}>
						<Text style={styles.buttonText}>Sign Up</Text>
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	gradient: {
		flex: 1,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#ffffff",
		marginBottom: 10,
	},
	inputContainer: {
		width: "100%",
		marginBottom: 20,
	},
	label: {
		color: "#ffffff",
		marginBottom: 5,
	},
	input: {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: 5,
		padding: 10,
		color: "#ffffff",
	},
	button: {
		backgroundColor: "#4CAF50",
		padding: 15,
		borderRadius: 5,
		width: "100%",
		alignItems: "center",
		marginBottom: 10,
	},
	signUpButton: {
		backgroundColor: "#2196F3",
	},
	buttonText: {
		color: "#ffffff",
		fontWeight: "bold",
	},
	registerLink: {
		marginTop: 20,
	},
	registerText: {
		color: "#ffffff",
		textDecorationLine: "underline",
	},
	error: {
		color: "red",
		marginBottom: 10,
		fontWeight: "bold",
	},
});

export default Login;
