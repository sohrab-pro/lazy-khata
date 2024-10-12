import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { logout } from "../auth";
import { removeUser } from "../storage";

const Setting = ({ setIsLoggedIn }) => {
	const handleLogout = async () => {
		await logout();
		await removeUser();
		setIsLoggedIn(false);
	};
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={handleLogout}>
				<Text style={styles.logoutText}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = {
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	logoutText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#333",
		marginTop: 20,
	},
	button: {
		backgroundColor: "#f44336",
	},
};

export default Setting;
