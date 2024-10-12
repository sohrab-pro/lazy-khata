import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BottomTabs = ({ tabs, activeTab, onPress, navigation }) => {
	return (
		<View style={styles.container}>
			{tabs.map((tab, index) => (
				<TouchableOpacity
					key={index}
					style={[
						styles.tab,
						activeTab === tab ? styles.activeTab : null,
					]}
					onPress={() => onPress(tab)}>
					<Text
						style={[
							styles.tabText,
							activeTab === tab ? styles.activeTabText : null,
						]}>
						{tab}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "#fff",
		height: 50,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
	},
	tab: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	activeTab: {
		backgroundColor: "#ccc",
	},
	tabText: {
		fontSize: 16,
	},
	activeTabText: {
		color: "#333",
		fontWeight: "bold",
	},
});

export default BottomTabs;
