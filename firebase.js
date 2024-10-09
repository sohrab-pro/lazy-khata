// firebase.js
import { initializeApp } from "firebase/app";
import { initializeAuth, indexedDBLocalPersistence } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
	persistence: indexedDBLocalPersistence,
});

export { auth };
