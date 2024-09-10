import * as SQLite from "expo-sqlite";

export async function addCustomerRow(name, phone) {
	const db = await SQLite.openDatabaseAsync("lazydb");
	await db.runAsync(
		"INSERT INTO customer (name, phone) VALUES (?, ?)",
		name,
		phone
	);
	return getAllCustomerRows();
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
	return getAllCustomerRows();
}

export async function updateRow(id, name, phone) {
	const db = await SQLite.openDatabaseAsync("lazydb");
	await db.runAsync(
		"UPDATE contact SET name = ?, phone = ? WHERE id = ?",
		value,
		intValue,
		id
	);
	return getAllCustomerRows();
}

export async function deleteRow(id, table) {
	const db = await SQLite.openDatabaseAsync("lazydb");
	await db.runAsync(`DELETE FROM ${table} WHERE id = ?`, id);
	return getAllCustomerRows();
}

export async function getAllCustomerRows() {
	const db = await SQLite.openDatabaseAsync("lazydb");
	const allRows = await db.getAllAsync("SELECT * FROM customer");
	return allRows;
}

export async function getAllTransactionsRows() {
	const db = await SQLite.openDatabaseAsync("lazydb");
	const allRows = await db.getAllAsync("SELECT * FROM transactions");
	return allRows;
}

export async function filterTransactionsRows(id) {
	const db = await SQLite.openDatabaseAsync("lazydb");
	const allRows = await db.getAllAsync(
		`SELECT * FROM transactions WHERE customer_id = ${id} ORDER BY created_at DESC`
	);
	return allRows;
}

export async function getTotalCreditDebit() {
	const db = await SQLite.openDatabaseAsync("lazydb");
	const results = await db.getAllAsync(`
    SELECT 
        SUM(CASE WHEN transaction_type = 'credit' THEN amount ELSE 0 END) AS total_credit,
        SUM(CASE WHEN transaction_type = 'debit' THEN amount ELSE 0 END) AS total_debit
    FROM transactions;
    `);

	return results[0];
}

export async function getTotalCreditDebitCustomer(id) {
	const db = await SQLite.openDatabaseAsync("lazydb");
	const results = await db.getAllAsync(
		`
    SELECT 
      SUM(CASE WHEN transaction_type = 'credit' THEN amount ELSE 0 END) AS total_credit,
      SUM(CASE WHEN transaction_type = 'debit' THEN amount ELSE 0 END) AS total_debit
    FROM transactions
    WHERE customer_id = ?
    `,
		[id]
	);

	return results[0];
}
