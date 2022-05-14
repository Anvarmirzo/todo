import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View, Alert} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {THEME} from '../theme';

export const AddTodo = ({onSubmit}) => {
	const [value, setValue] = useState('');

	const pressHandler = () => {
		if (value.trim()) {
			onSubmit(value);
			setValue('');
		} else {
			Alert.alert('Error', 'You must enter a value!', [{text: 'OK'}]);
		}
	};
	return (
		<View style={styles.block}>
			<TextInput
				onChangeText={setValue}
				value={value}
				placeholder="Title"
				style={styles.input}
				autoCorrect={true}
				autoCapitalize="none"
				keyboardType="number-pad"
			/>
			<AntDesign.Button
				onPress={pressHandler}
				name="pluscircle"
				size={24}
				color="black">
				Add
			</AntDesign.Button>
		</View>
	);
};

const styles = StyleSheet.create({
	block: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
	},
	input: {
		flex: 1,
		borderBottomWidth: 2,
		borderStyle: 'solid',
		borderColor: THEME.MAIN_COLOR,
		padding: 5,
		marginRight: 10,
	}
});