import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";

const AddCustomer = ({ route, navigation }) => {
	const { customers, setCustomers } = route.params;
	const [name, setName] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const handleContinue = () => {
		if (!name) {
			Alert.alert("Validation", "Name is required!");
			return;
		}

		// Add new customer
		const newCustomer = {
			id: (customers.length + 1).toString(),
			name,
			date: new Date().toDateString(),
			time: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
			}),
			amount: "0",
			type: "request",
		};

		setCustomers([...customers, newCustomer]);
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Add Customer</Text>

			<TextInput
				placeholder="Name"
				style={styles.input}
				value={name}
				onChangeText={setName}
			/>

			<TextInput
				placeholder="Mobile Number"
				style={styles.input}
				value={mobileNumber}
				keyboardType="phone-pad"
				onChangeText={setMobileNumber}
			/>

			<TouchableOpacity
				style={styles.continueButton}
				onPress={handleContinue}>
				<Text style={styles.continueButtonText}>CONTINUE</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 20,
		color: "orange",
	},
	input: {
		height: 50,
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 10,
		fontSize: 16,
		marginBottom: 20,
	},
	continueButton: {
		backgroundColor: "orange",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
	},
	continueButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default AddCustomer;
