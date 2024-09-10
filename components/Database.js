import * as SQLite from "expo-sqlite";

export async function addCustomerRow(name, phone) {
	const db = await SQLite.openDatabaseAsync("lazydb");
	const result = await db.runAsync(
		"INSERT INTO customer (name, phone) VALUES (?, ?)",
		name,
		phone
	);

	const customerID = result.lastInsertRowId;
	const lastCustomer = await db.getFirstAsync(
		"SELECT * FROM customer WHERE id = ?",
		customerID
	);

	return lastCustomer;
}

export async function getCustomer(id) {
	const db = await SQLite.openDatabaseAsync("lazydb");
	const customer = await db.getFirstAsync(
		"SELECT * FROM customer WHERE id = ?",
		id
	);
	return customer;
}

export async function addTransactionsRow(
	amount,
	comment,
	customer_id,
	transaction_type
) {
	const db = await SQLite.openDatabaseAsync("lazydb");
	const result = await db.runAsync(
		"INSERT INTO transactions (amount, comment, customer_id, transaction_type) VALUES (?, ?, ?, ?)",
		amount,
		comment,
		customer_id,
		transaction_type
	);

	const transactionID = result.lastInsertRowId;
	const lastTransaction = await db.getFirstAsync(
		"SELECT * FROM transactions WHERE id = ?",
		transactionID
	);
	return lastTransaction;
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
	const allRows = await db.getAllAsync(`
    SELECT c.*, MAX(t.updated_at) AS last_transaction_date
    FROM customer c
    LEFT JOIN transactions t ON c.id = t.customer_id
    GROUP BY c.id
    ORDER BY last_transaction_date DESC
  `);
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
      SUM(CASE WHEN transaction_type = 'debit' THEN amount ELSE 0 END) AS total_debit,
      MAX(updated_at) AS last_updated
    FROM transactions
    WHERE customer_id = ?
    `,
		[id]
	);

	return results[0];
}
