import * as SQLite from "expo-sqlite";

export async function addCustomerRow(name, phone) {
	const db = await SQLite.openDatabaseAsync("lazydb");
	await db.runAsync(
		"INSERT INTO customer (name, phone) VALUES (?, ?)",
		name,
		phone
	);
	return getAllRows();
}

export async function addTransactionsRow(
	amount,
	comment,
	customer_id,
	transaction_type
) {
	const db = await SQLite.openDatabaseAsync("lazydb");
	await db.runAsync(
		"INSERT INTO transactions (amount, comment, customer_id, transaction_type) VALUES (?, ?, ?, ?)",
		amount,
		comment,
		customer_id,
		transaction_type
	);
	return getAllRows();
}

export async function updateRow(id, name, phone) {
	const db = await SQLite.openDatabaseAsync("lazydb");
	await db.runAsync(
		"UPDATE contact SET name = ?, phone = ? WHERE id = ?",
		value,
		intValue,
		id
	);
	return getAllRows();
}

export async function deleteRow(id, table) {
	const db = await SQLite.openDatabaseAsync("lazydb");
	await db.runAsync(`DELETE FROM ${table} WHERE id = ?`, id);
	return getAllRows();
}

export async function getAllRows() {
	const db = await SQLite.openDatabaseAsync("lazydb");
	const allRows = await db.getAllAsync("SELECT * FROM customer");
	return allRows;
}
