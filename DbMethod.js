import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

export default function App() {
	const [name, setName] = useState("");
	const [listContact, setListContact] = useState([]);

	async function addNewRow() {
		const db = await SQLite.openDatabaseAsync("databaseApp");
		await db.runAsync(
			"INSERT INTO contact (value, intValue) VALUES (?, ?)",
			name,
			1000
		);

		let allRows = await db.getAllAsync("SELECT * FROM contact");
		let newArray = [];
		for (const row of allRows) {
			newArray.push(row);
		}

		setListContact(newArray);
	}

	useEffect(() => {
		async function setup() {
			const db = await SQLite.openDatabaseAsync("databaseApp");
			// Uncomment if you need to initialize the table
			db.execAsync(`
				PRAGMA journal_mode = WAL;
				CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
			`);

			const allRows = await db.getAllAsync("SELECT * FROM contact");
			let newArray = [];
			for (const row of allRows) {
				newArray.push(row);
			}
			setListContact(newArray);
		}
		setup();
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1 }}>
				<StatusBar style="auto" />
				{listContact.map((item, index) => {
					return (
						<Text
							style={{ color: "black", padding: 10 }}
							key={index}>
							{item.value} {/* Display the 'value' column */}
						</Text>
					);
				})}
				<TextInput
					onChangeText={setName}
					value={name}
					placeholder="Enter your name"
					style={{
						width: 350,
						height: 50,
						borderWidth: 2,
						borderColor: "gray",
						margin: 5,
						padding: 5,
					}}
				/>
				<TouchableOpacity onPress={addNewRow}>
					<Text>Add Name</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
