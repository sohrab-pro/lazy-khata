import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerInfo from "./components/CustomerInfo";
import CustomerList from "./components/CustomerList";
import AddCustomer from "./components/AddCustomer";
import AddTransaction from "./components/AddTransaction";
import TransactionInfo from "./components/TransactionInfo";
import BottomTabs from "./components/ButtonTabs";
import Setting from "./components/Setting";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { getUser } from "./storage";

const Stack = createNativeStackNavigator();

function MainContent({ setIsLoggedIn }) {
	const [activeTab, setActiveTab] = useState("Home");
	const navigation = useNavigation();

	const handlePress = (tab) => {
		setActiveTab(tab);
		if (tab === "Home") {
			navigation.navigate("CustomerList");
		} else if (tab === "Settings") {
			navigation.navigate("Setting");
		} else if (tab === "Profile") {
		}
	};

	return (
		<>
			<Stack.Navigator initialRouteName="CustomerList">
				<Stack.Screen
					name="CustomerList"
					component={CustomerList}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="AddCustomer"
					component={AddCustomer}
					options={{ headerShown: false, title: "Adding customer" }}
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
				<Stack.Screen name="Setting" options={{ headerShown: false }}>
					{() => <Setting setIsLoggedIn={setIsLoggedIn} />}
				</Stack.Screen>
			</Stack.Navigator>
			<BottomTabs
				tabs={["Home", "Settings"]}
				activeTab={activeTab}
				onPress={handlePress}
			/>
		</>
	);
}

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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

	useEffect(() => {
		const checkLogin = async () => {
			const user = await getUser();
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		};
		checkLogin();
	}, []);

	if (!isLoggedIn) {
		return <Login setLogin={setIsLoggedIn} />;
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<NavigationContainer>
				<MainContent setIsLoggedIn={setIsLoggedIn} />
			</NavigationContainer>
		</SafeAreaView>
	);
}
