import React from "react";
import { Text, View, StyleSheet } from "react-native";
import BalanceCard from "./BalanceCard";
import CustomerList from "./CustomerList";

const Index = () => {
	return (
		<View style={styles.container}>
			<BalanceCard />
			<CustomerList />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "black",
		flex: 1,
	},
});
export default Index;
