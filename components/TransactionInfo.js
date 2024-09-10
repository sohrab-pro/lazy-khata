import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Button,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { deleteRow } from "./Database";
import { useNavigation, useRoute } from "@react-navigation/native";

const TransactionInfo = () => {
	const navigation = useNavigation();
	const route = useRoute();

	const transactionData = route.params.item;

	async function deleteTransaction() {
		await deleteRow(transactionData.id, "transactions");
		navigation.goBack();
	}

	return (
		<View style={{ flex: 1, padding: 10 }}>
			<Text>{transactionData.amount}</Text>
			<Text>{transactionData.transaction_type}</Text>
			<TouchableOpacity onPress={deleteTransaction}>
				<Text
					style={{
						padding: 10,
						backgroundColor: "gray",
						width: 70,
					}}>
					Delete
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default TransactionInfo;
