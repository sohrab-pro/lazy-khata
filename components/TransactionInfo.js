import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { deleteRow, getCustomer } from "./Database";
import { useNavigation, useRoute } from "@react-navigation/native";

const TransactionInfo = () => {
	const navigation = useNavigation();
	const route = useRoute();

	const [color, setColor] = useState("");
	const [message, setMessage] = useState("");
	const [customerName, setCustomerName] = useState("");

	const transactionData = route.params.item;

	async function getCustomerData(id) {
		const customer = await getCustomer(id);
		setCustomerName(customer.name);
		return customer;
	}

	useEffect(() => {
		getCustomerData(transactionData.customer_id);
	}, [transactionData.customer_id]);

	useEffect(() => {
		if (transactionData.transaction_type === "credit") {
			setColor("green");
			setMessage(
				`You Got Rs ${transactionData.amount.toLocaleString()} from ${customerName}`
			);
		} else {
			setColor("#f95a57");
			setMessage(
				`You Gave Rs ${transactionData.amount.toLocaleString()} to ${customerName}`
			);
		}
	}, [transactionData, customerName]);

	async function deleteTransaction() {
		await deleteRow(transactionData.id, "transactions");
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<View style={[styles.header, { backgroundColor: color }]}>
				<Text
					style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
					{message}
				</Text>
				<Text style={styles.customerName}>{transactionData.name}</Text>
				<Text style={styles.customerType}>Customer</Text>
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
		justifyContent: "space-around",
		paddingVertical: 10,
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
});

export default TransactionInfo;
