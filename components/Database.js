import * as SQLite from "expo-sqlite";

export async function addRow(name, phone) {
	const db = await SQLite.openDatabaseAsync("lazydb");
	await db.runAsync(
		"INSERT INTO customer (name, phone) VALUES (?, ?)",
		name,
		phone
	);
	return getAllRows();
}

export async function updateRow(id, value, intValue) {
	await db.runAsync(
		"UPDATE contact SET name = ?, phone = ? WHERE id = ?",
		value,
		intValue,
		id
	);
	return getAllRows();
}

export async function deleteRow(id) {
	await db.runAsync("DELETE FROM contact WHERE id = ?", id);
	return getAllRows();
}

export async function getAllRows() {
	const db = await SQLite.openDatabaseAsync("lazydb");
	const allRows = await db.getAllAsync("SELECT * FROM customer");
	return allRows;
}
