import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export const Todo = ({todo, onRemove}) => {
	const handlePress = () => {
		console.log('Todo pressed');
	};

	const handleLongPress = () => {
		onRemove(todo.id);
	};

	return (
		<TouchableOpacity onPress={handlePress} onLongPress={handleLongPress}>
			<View style={styles.todo}>
				<Text style={styles.text}>{todo.title}</Text>
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