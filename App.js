import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerInfo from "./components/CustomerInfo";
import CustomerList from "./components/CustomerList";
import AddCustomer from "./components/AddCustomer";
import AddTransaction from "./components/AddTransaction";
import TransactionInfo from "./components/TransactionInfo";
import { useEffect } from "react";
import * as SQLite from "expo-sqlite";

const Stack = createNativeStackNavigator();

export default function App() {
	useEffect(() => {
		async function setup() {
			const db = await SQLite.openDatabaseAsync("lazydb");
			await db.execAsync(`
				PRAGMA journal_mode = WAL;

				/*DROP TABLE customer;*/
				/*DROP TABLE transactions;*/

				CREATE TABLE IF NOT EXISTS customer (
					id INTEGER PRIMARY KEY NOT NULL, 
					name TEXT NOT NULL, 
					phone TEXT,
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

				CREATE TABLE IF NOT EXISTS added_customers (
					id INTEGER PRIMARY KEY NOT NULL, 
					customer_id INTEGER NOT NULL, 
					name TEXT NOT NULL, 
					phone TEXT,
					created_at DATETIME DEFAULT CURRENT_TIMESTAMP
				);

				CREATE TABLE IF NOT EXISTS deleted_customers (
					id INTEGER PRIMARY KEY NOT NULL, 
					customer_id INTEGER NOT NULL, 
					created_at DATETIME DEFAULT CURRENT_TIMESTAMP
				);

				CREATE TABLE IF NOT EXISTS updated_customers (
					id INTEGER PRIMARY KEY NOT NULL, 
					customer_id INTEGER NOT NULL, 
					name TEXT NOT NULL, 
					phone TEXT,
					created_at DATETIME DEFAULT CURRENT_TIMESTAMP
				);

				CREATE TABLE IF NOT EXISTS added_transactions (
					id INTEGER PRIMARY KEY NOT NULL,
					transaction_id INTEGER NOT NULL,
					amount REAL NOT NULL,
					comment TEXT,
					created_at DATETIME DEFAULT CURRENT_TIMESTAMP
				);

				CREATE TABLE IF NOT EXISTS deleted_transactions (
					id INTEGER PRIMARY KEY NOT NULL, 
					transaction_id INTEGER NOT NULL, 
					created_at DATETIME DEFAULT CURRENT_TIMESTAMP
				);

				CREATE TABLE IF NOT EXISTS updated_transactions (
					id INTEGER PRIMARY KEY NOT NULL, 
					transaction_id INTEGER NOT NULL,
					amount REAL NOT NULL,
					comment TEXT,
					created_at DATETIME DEFAULT CURRENT_TIMESTAMP
				);
			`);

			// const result = db.getAllSync("SELECT * FROM updated_transactions");
			// console.log(result);
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
					<Stack.Screen
						name="TransactionInfo"
						component={TransactionInfo}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
}
