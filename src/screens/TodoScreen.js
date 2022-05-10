import React, {useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {EditModal} from '../components/EditModal';
import {AppCard} from '../components/ui/AppCard';
import {THEME} from '../theme';

export const TodoScreen = ({goBack, todo, onRemove, onSave}) => {
	const [modal, setModal] = useState(false);

	const saveHandler = (title) => {
		onSave(todo.id, title);
		setModal(false)
	};

	return (
		<View>
			<EditModal
				isVisible={modal}
				value={todo.title}
				onSave={saveHandler}
				onCancel={() => setModal(false)}
			/>
			<AppCard style={styles.card}>
				<Text style={styles.title}>{todo.title}</Text>
				<Button title="Edit" onPress={() => setModal(true)}/>
			</AppCard>
			<View style={styles.buttons}>
				<View style={styles.button}>
					<Button title="Go to home" color={THEME.GRAY_COLOR} onPress={goBack}/>
				</View>
				<View style={styles.button}>
					<Button title="Delete" color={THEME.DANGER_COLOR} onPress={() => {
						onRemove(todo.id);
					}}/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	button: {
		width: '40%'
	},
	card: {
		marginBottom: 20
	},
	title: {
		fontSize: 20
	}
});