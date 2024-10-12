const HamburgerMenu = () => {
	const [visible, setVisible] = useState(false);
	const navigation = useNavigation();

	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	const handleLogout = () => {
		// Add your logout logic here
		console.log("Logged out");
		closeMenu();
		navigation.navigate("Login"); // Navigate to Login after logout
	};

	return (
		<Menu
			visible={visible}
			onDismiss={closeMenu}
			anchor={
				<Button title="⋮" onPress={openMenu} /> // 3-dot button as the anchor
			}>
			<Menu.Item onPress={handleLogout} title="Logout" />
		</Menu>
	);
};

export default HamburgerMenu;
