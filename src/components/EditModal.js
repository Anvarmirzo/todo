import React, {useState} from 'react';
import {Button, Modal, View, TextInput, StyleSheet, Alert} from 'react-native';
import {THEME} from '../theme';

export const EditModal = ({isVisible, onCancel, onSave, value}) => {
	const [title, setTitle] = useState(value);
	const saveHandler = () => {
		if (title.trim().length < 3) {
			Alert.alert('Error', 'Title must be at least 3 characters long', [{text: 'OK'}]);
		}else {
			onSave(title);
		}
	};

	return (
		<Modal visible={isVisible} animationType="slide">
			<View style={styles.wrap}>
				<TextInput
					style={styles.input}
					value={title}
					onChangeText={setTitle}
					placeholder="Enter the name"
					autoCapitalize="none"
					autoCorrect={false}
					maxLength={64}

				/>
				<View style={styles.buttons}>
					<Button title="Cancel" onPress={onCancel} color={THEME.DANGER_COLOR}/>
					<Button title="Save" onPress={saveHandler}/>
				</View>
			</View>

		</Modal>
	);
};

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		padding: 10,
		borderBottomColor: THEME.MAIN_COLOR,
		borderBottomWidth: 2,
		width: '80%'
	},
	buttons: {
		width: '100%',
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
});