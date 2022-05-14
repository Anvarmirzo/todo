import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {THEME} from '../theme';
import {AppButton} from '../components/ui/AppButton';
import {EditModal} from '../components/EditModal';
import {AppCard} from '../components/ui/AppCard';
import {AppTextBold} from '../components/ui/AppTextBold';

export const TodoScreen = ({goBack, todo, onRemove, onSave}) => {
	const [modal, setModal] = useState(false);

	const saveHandler = (title) => {
		onSave(todo.id, title);
		setModal(false);
	};

	const editHandler = () => {
		setModal(true);
	};

	const deleteHandler = () => {
		onRemove(todo.id);
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
				<AppButton color={THEME.GRAY_COLOR} onPress={goBack}>
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
	}, button: {
		width: '40%'
	}, card: {
		marginBottom: 20
	}, title: {
		fontSize: 20
	}
});