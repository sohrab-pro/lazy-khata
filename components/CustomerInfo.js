import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomerInfo = ({ route }) => {
	const { customer } = route.params;

	return (
		<View style={styles.container}>
			<Text style={styles.name}>{customer.name}</Text>
			<Text style={styles.balance}>Rs {customer.amount}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default CustomerInfo;
