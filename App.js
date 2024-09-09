import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerInfo from "./components/CustomerInfo";
import CustomerList from "./components/CustomerList";
import AddCustomer from "./components/AddCustomer";
import { useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { updateRow } from "./components/Database";

const Stack = createNativeStackNavigator();

export default function App() {
	useEffect(() => {
		async function setup() {
			const db = await SQLite.openDatabaseAsync("lazydb");
			db.execAsync(`
				PRAGMA journal_mode = WAL;
				CREATE TABLE IF NOT EXISTS customer (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, phone INTEGER);
				`);
			// INSERT  INTO customer (name, phone) VALUES ('Sohrab', 03426006612);

			const allRows = await db.getAllAsync("SELECT * FROM customer");
			for (const row of allRows) {
				console.log(row);
			}
		}
		setup();
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar style="auto" />
			<NavigationContainer>
				<Stack.Navigator initialRouteName="CustomerList">
					<Stack.Screen
						name="Customers"
						component={CustomerList}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="AddCustomer"
						component={AddCustomer}
						options={{
							headerShown: false,
							title: "Adding customer",
						}}
					/>
					<Stack.Screen
						name="CustomerInfo"
						component={CustomerInfo}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
}
