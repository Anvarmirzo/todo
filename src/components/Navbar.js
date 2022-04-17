import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Navbar = (props) => {
	return (
		<View style={styles.navbar}>
			<Text style={styles.text}>Todo App</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	navbar: {
		height: 70,
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: '#3949ab',
		paddingBottom: 10
	},
	text: {
		color: '#fff'
	}
});