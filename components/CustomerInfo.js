import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Button,
	FlatList,
	TouchableOpacity,
} from "react-native";
import moment from "moment-timezone";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { deleteRow, filterTransactionsRows } from "./Database";

const CustomerInfo = ({ route }) => {
	const navigation = useNavigation();
	const { customer } = route.params;

	const [transactions, setTransactions] = useState([]);
	const [currentBalance, setCurrentBalance] = useState(0);
	const [amountLabel, setAmountLabel] = useState("");

	useFocusEffect(
		React.useCallback(() => {
			// transaction
			async function getData() {
				const rows = await filterTransactionsRows(customer.id);
				let totalCredit = 0;
				let totalDebit = 0;
				const formattedRows = rows.map((row) => {
					if (row.transaction_type == "credit") {
						totalCredit += row.amount;
					} else {
						totalDebit += row.amount;
					}

					const karachiTime = moment
						.utc(row.created_at)
						.tz("Asia/Karachi");

					const formattedDate = karachiTime.format("YYYY-MM-DD");
					const formattedTime = karachiTime.format("h:mm A");

					row.created_at = `${formattedDate} ・ ${formattedTime}`;
					return row;
				});
				setTransactions(formattedRows);
			}
			getData();

			return () => {};
		}, [customer.id])
	);

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
		<TouchableOpacity
			onPress={() => navigation.navigate("TransactionInfo", { item })}>
			<View style={styles.transactionRow}>
				<Text style={styles.transactionDate}>{item.created_at}</Text>
				{item.comment ? (
					<Text style={styles.transactionTitle}>{item.comment}</Text>
				) : (
					""
				)}
				<Text
					style={[
						styles.transactionAmount,
						item.transaction_type === "debit"
							? styles.redText
							: styles.greenText,
					]}>
					{item.amount}
				</Text>
				<Text style={styles.transactionBalance}>
					Bal. {item.balance}
				</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			{/* Header Section */}
			<View style={styles.header}>
				<Text style={styles.customerName}>{customer.name}</Text>
				<Text style={styles.customerType}>Customer</Text>
			</View>

			{/* Balance and Send Button */}
			<View style={styles.balanceContainer}>
				<Text style={styles.balanceText}>Rs {currentBalance}</Text>
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
				data={transactions} // Use dynamic transaction data
				keyExtractor={(item) => item.id.toString()}
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
	transactionDate: {
		fontSize: 12,
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
