import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerInfo from "./components/CustomerInfo";
import CustomerList from "./components/CustomerList";

const Stack = createNativeStackNavigator();

export default function App() {
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
						name="CustomerInfo"
						component={CustomerInfo}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
}
