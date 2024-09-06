import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BalanceCard = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.hideBalanceText}>Hide Balance</Text>
			<View style={styles.balanceContainer}>
				<View style={styles.balanceColumn}>
					<Text style={styles.giveAmount}>Rs 0</Text>
					<Text style={styles.giveLabel}>You will give</Text>
				</View>
				<View style={styles.separator} />
				<View style={styles.balanceColumn}>
					<Text style={styles.getAmount}>Rs 0</Text>
					<Text style={styles.getLabel}>You will get</Text>
				</View>
				<View style={styles.separator} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#202020", // Black background
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
	},
	hideBalanceText: {
		color: "#FF4500", // Red for "Hide Balance" text
		fontSize: 12,
		marginBottom: 10,
	},
	balanceContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	balanceColumn: {
		alignItems: "center",
	},
	giveAmount: {
		color: "#00FF00", // Green for "You will give" amount
		fontSize: 24,
		fontWeight: "bold",
	},
	giveLabel: {
		color: "#A9A9A9", // Gray for "You will give" label
		fontSize: 14,
	},
	getAmount: {
		color: "#FF0000", // Red for "You will get" amount
		fontSize: 24,
		fontWeight: "bold",
	},
	getLabel: {
		color: "#A9A9A9", // Gray for "You will get" label
		fontSize: 14,
	},
	separator: {
		height: "100%",
		width: 1,
		backgroundColor: "#A9A9A9", // Gray separator
		marginHorizontal: 20,
	},
});

export default BalanceCard;
