import React, {useContext, useState} from 'react';
import {View, StyleSheet, Dimensions, Alert} from 'react-native';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {ScreenContext} from '../context/screen/ScreenContext';
import {TodoContext} from '../context/todo/TodoContext';
import {THEME} from '../theme';
import {AppButton} from '../components/ui/AppButton';
import {EditModal} from '../components/EditModal';
import {AppCard} from '../components/ui/AppCard';
import {AppTextBold} from '../components/ui/AppTextBold';

export const TodoScreen = () => {
	const {removeTodo, updateTodo, todos} = useContext(TodoContext);
	const {todoId, changeScreen} = useContext(ScreenContext);

	const [modal, setModal] = useState(false);

	const todo = todos.find(todo => todo.id === todoId);

	const handleBack = () => {
		changeScreen(null);
	};

	const saveHandler = async (title) => {
		await updateTodo(todo.id, title);
		setModal(false);
	};

	const editHandler = () => {
		setModal(true);
	};

	const deleteHandler = () => {
		Alert.alert('Delete', `Delete "${todo.title}"?`, [
			{
				text: 'Cancel',
				style: 'cancel'
			},
			{
				text: 'Delete',
				style: 'destructive',
				onPress: () => {
					changeScreen(null);
					removeTodo(todoId);
				}
			}], {cancelable: true});
	};

	const cancelHandler = () => {
		setModal(false);
	};

	return (<View>
		<EditModal
			isVisible={modal}
			value={todo.title}
			onSave={saveHandler}
			onCancel={cancelHandler}
		/>
		<AppCard style={styles.card}>
			<AppTextBold style={styles.title}>{todo.title}</AppTextBold>
			<AppButton onPress={editHandler}>
				<FontAwesome name="edit" size={20}/>
			</AppButton>
		</AppCard>
		<View style={styles.buttons}>
			<View style={styles.button}>
				<AppButton color={THEME.GRAY_COLOR} onPress={handleBack}>
					<AntDesign name="arrowleft" size={20}/>
				</AppButton>
			</View>
			<View style={styles.button}>
				<AppButton color={THEME.DANGER_COLOR} onPress={deleteHandler}>
					<FontAwesome name="trash" size={20}/>
				</AppButton>
			</View>
		</View>
	</View>);
};

const styles = StyleSheet.create({
	buttons: {
		flexDirection: 'row', justifyContent: 'space-between'
	},
	button: {
		// width: Dimensions.get('window').width / 3,
		width: Dimensions.get('window').width > 400 ? 150 : 100
	},
	card: {
		marginBottom: 20
	},
	title: {
		fontSize: 20
	}
});