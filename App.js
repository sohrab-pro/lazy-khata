import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Index from "./components/Index";

export default function App() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Index />
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}
