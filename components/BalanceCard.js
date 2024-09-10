import React, { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getTotalCreditDebit } from "./Database";

const BalanceCard = () => {
	const [showBalance, setShowBalance] = useState(true);
	const [willGive, setWillGive] = useState(0);
	const [willGet, setWillGet] = useState(0);

	function toggleBalance() {
		setShowBalance(!showBalance);
	}

	useFocusEffect(
		useCallback(() => {
			async function getAmounts() {
				const amounts = await getTotalCreditDebit();
				setWillGet(amounts.total_debit?.toLocaleString());
				setWillGive(amounts.total_credit?.toLocaleString());
			}
			getAmounts();
		})
	);

	return (
		<View style={styles.container}>
			{showBalance ? (
				<TouchableOpacity onPress={toggleBalance}>
					<Text style={styles.hideBalanceText}>Hide Balance</Text>
				</TouchableOpacity>
			) : (
				""
			)}
			<View style={styles.balanceContainer}>
				{showBalance ? (
					<>
						<View style={styles.balanceColumn}>
							<Text style={styles.giveAmount}>Rs {willGive}</Text>
							<Text style={styles.giveLabel}>You will give</Text>
						</View>
						<View style={styles.separator} />
						<View style={styles.balanceColumn}>
							<Text style={styles.getAmount}>Rs {willGet}</Text>
							<Text style={styles.getLabel}>You will get</Text>
						</View>
					</>
				) : (
					<TouchableOpacity onPress={toggleBalance}>
						<Text
							style={{
								color: "#FF4500",
								marginLeft: 85,
								paddingVertical: 10,
							}}>
							Show Balance
						</Text>
					</TouchableOpacity>
				)}
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
		fontSize: 20,
		fontWeight: "bold",
		paddingLeft: 10,
	},
	giveLabel: {
		color: "#A9A9A9", // Gray for "You will give" label
		fontSize: 12,
		paddingLeft: 10,
	},
	getAmount: {
		color: "#FF0000", // Red for "You will get" amount
		fontSize: 20,
		fontWeight: "bold",
	},
	getLabel: {
		color: "#A9A9A9", // Gray for "You will get" label
		fontSize: 12,
	},
	separator: {
		height: "100%",
		width: 1,
		backgroundColor: "#A9A9A9", // Gray separator
		marginHorizontal: 20,
	},
});

export default BalanceCard;
