import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Button,
	FlatList,
	TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { deleteRow } from "./Database";

const transactions = [
	{
		id: "1",
		date: "Sun, 08 Sep 24 • 12:16 AM",
		title: "Tindodag + home payment",
		amount: "-2,000",
		balance: "Rs39,062",
		type: "gave",
	},
];

const CustomerInfo = ({ route }) => {
	const navigation = useNavigation();
	const { customer } = route.params;

	const [transaction, setTransaction] = useState([]);

	async function addTransaction(type) {
		let customerInfo = {
			id: customer.id,
			name: customer.name,
			transaction_type: type,
		};
		navigation.navigate("AddTransaction", {
			customerInfo,
		});
	}

	async function deleteTheRow() {
		await deleteRow(customer.id, "customer");
		navigation.goBack();
	}
	const renderTransaction = ({ item }) => (
		<View style={styles.transactionRow}>
			<Text style={styles.transactionTitle}>{item.title}</Text>
			<Text
				style={[
					styles.transactionAmount,
					item.type === "gave" ? styles.redText : styles.greenText,
				]}>
				{item.amount}
			</Text>
			<Text style={styles.transactionBalance}>Bal. {item.balance}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			{/* Header Section */}
			<View style={styles.header}>
				<Text style={styles.customerName}>Khalid</Text>
				<Text style={styles.customerType}>Customer</Text>
			</View>

			{/* Balance and Send Button */}
			<View style={styles.balanceContainer}>
				<Text style={styles.balanceText}>Rs 39,062</Text>
				<Text style={styles.subText}>You will give</Text>
				<TouchableOpacity style={styles.sendButton}>
					<Text style={styles.sendButtonText}>SEND</Text>
				</TouchableOpacity>
			</View>

			{/* Action Buttons */}
			<View style={styles.actionButtons}>
				<Button title="Report" onPress={() => {}} />
				<Button title="Set Date" onPress={() => {}} />
				<Button title="Reminder" onPress={() => {}} />
				<Button title="SMS" onPress={() => {}} />
			</View>

			{/* Transaction List */}
			<FlatList
				data={transactions}
				keyExtractor={(item) => item.id}
				renderItem={renderTransaction}
			/>

			{/* Bottom Section */}
			<View style={styles.bottomSection}>
				<TouchableOpacity
					onPress={() => addTransaction("debit")}
					style={styles.gaveButton}>
					<Text style={styles.bottomButtonText}>YOU GAVE Rs</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => addTransaction("credit")}
					style={styles.gotButton}>
					<Text style={styles.bottomButtonText}>YOU GOT Rs</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingHorizontal: 10,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 10,
		backgroundColor: "#f95a57",
	},
	customerName: {
		fontSize: 20,
		color: "#fff",
	},
	customerType: {
		backgroundColor: "#fff",
		color: "#f95a57",
		paddingHorizontal: 5,
		borderRadius: 5,
	},
	balanceContainer: {
		alignItems: "center",
		marginVertical: 20,
	},
	balanceText: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#39b54a",
	},
	subText: {
		color: "#666",
	},
	sendButton: {
		backgroundColor: "#39b54a",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		marginTop: 10,
	},
	sendButtonText: {
		color: "#fff",
		fontWeight: "bold",
	},
	actionButtons: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginVertical: 10,
	},
	transactionRow: {
		paddingVertical: 10,
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
	},
	transactionTitle: {
		fontSize: 16,
	},
	transactionAmount: {
		fontSize: 18,
		fontWeight: "bold",
	},
	redText: {
		color: "#e74c3c",
	},
	greenText: {
		color: "#2ecc71",
	},
	transactionBalance: {
		color: "#666",
	},
	bottomSection: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingVertical: 10,
		backgroundColor: "#fff",
	},
	gaveButton: {
		backgroundColor: "#e74c3c",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	gotButton: {
		backgroundColor: "#2ecc71",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	bottomButtonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});

export default CustomerInfo;
