import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerInfo from "./components/CustomerInfo";
import CustomerList from "./components/CustomerList";
import AddCustomer from "./components/AddCustomer";
import AddTransaction from "./components/AddTransaction";
import { useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { updateRow } from "./components/Database";

const Stack = createNativeStackNavigator();

export default function App() {
	useEffect(() => {
		async function setup() {
			const db = await SQLite.openDatabaseAsync("lazydb");
			await db.execAsync(`
				PRAGMA journal_mode = WAL;
				
				CREATE TABLE IF NOT EXISTS customer (
					id INTEGER PRIMARY KEY NOT NULL, 
					name TEXT NOT NULL, 
					phone INTEGER,
					created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
					updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
				);
				
				CREATE TRIGGER IF NOT EXISTS update_customer_updated_at
				AFTER UPDATE ON customer
				FOR EACH ROW
				BEGIN
					UPDATE customer SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
				END;

				CREATE TABLE IF NOT EXISTS transactions (
					id INTEGER PRIMARY KEY NOT NULL,
					amount REAL NOT NULL,
					comment TEXT,
					transaction_type TEXT,
					customer_id INTEGER,
					created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
					updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
					FOREIGN KEY(customer_id) REFERENCES customer(id)
				);

				CREATE TRIGGER IF NOT EXISTS update_transactions_updated_at
				AFTER UPDATE ON transactions
				FOR EACH ROW
				BEGIN
					UPDATE transactions SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
				END;
			`);

			const transactions = await db.getAllAsync(
				"SELECT * FROM transactions"
			);
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
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="AddTransaction"
						component={AddTransaction}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
}
