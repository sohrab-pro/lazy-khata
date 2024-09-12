import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addTransactionsRow } from "./Database";

const AddTransaction = () => {
	const route = useRoute();
	const navigation = useNavigation();

	// Extract parameters
	const { customerInfo } = route.params;
	const [amount, setAmount] = useState("");
	const [comment, setComment] = useState("");

	const handleSubmit = async () => {
		if (!amount) {
			Alert.alert("Validation", "Amount is required!");
			return;
		}

		await addTransactionsRow(
			amount,
			comment,
			customerInfo.id,
			customerInfo.transaction_type
		);
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Add Transaction</Text>

			<TextInput
				placeholder="Amount"
				style={styles.input}
				value={amount}
				keyboardType="phone-pad"
				onChangeText={setAmount}
			/>

			<TextInput
				placeholder="Comment"
				style={styles.input}
				value={comment}
				onChangeText={setComment}
			/>

			<TouchableOpacity
				style={[
					styles.continueButton,
					!amount ? styles.disabledButton : null,
				]}
				onPress={handleSubmit}
				disabled={!amount}>
				<Text style={styles.continueButtonText}>Add</Text>
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
	disabledButton: {
		color: "#fff",
		backgroundColor: "gray",
	},
});

export default AddTransaction;
