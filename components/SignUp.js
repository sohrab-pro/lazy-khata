import { View, Text, StyleSheet } from "react-native";
import { signUp } from "../auth";

const SignUp = () => {
	const handleSignUp = async () => {
		const response = await signUp(email, password);
		if (response) {
			setLogin(true);
		}
	};
	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient
				colors={["#4c669f", "#3b5998", "#192f6a"]}
				style={styles.gradient}>
				<View style={styles.content}>
					<Text style={styles.title}>Welcome Back</Text>
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
					<TouchableOpacity style={styles.registerLink}>
						<Text style={styles.registerText}>
							No account? Register here
						</Text>
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
};

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
		marginBottom: 30,
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
});

export default SignUp;
