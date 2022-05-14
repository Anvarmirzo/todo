import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {AppTextBold} from './ui/AppTextBold';

export const Todo = ({todo, onOpen}) => {
	const handlePress = () => {
		onOpen(todo.id);
	};

	return (
		<TouchableOpacity onPress={handlePress}>
			<View style={styles.todo}>
				<AppTextBold>{todo.title}</AppTextBold>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	todo: {
		flexDirection: 'column',
		alignItems: 'center',
		padding: 15,
		borderWidth: 1,
		borderColor: '#eee',
		borderRadius: 5,
		marginBottom: 10
	}
});