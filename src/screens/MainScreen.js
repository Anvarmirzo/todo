import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Image, Dimensions} from 'react-native';
import {AddTodo} from '../components/AddTodo';
import {Todo} from '../components/Todo';
import {AppButton} from '../components/ui/AppButton';
import {AppLoader} from '../components/ui/AppLoader';
import {AppText} from '../components/ui/AppText';
import {ScreenContext} from '../context/screen/ScreenContext';
import {TodoContext} from '../context/todo/TodoContext';
import {THEME} from '../theme';

export const MainScreen = () => {
	const {addTodo, todos, fetchTodos, loading, error} = useContext(TodoContext);
	const {changeScreen} = useContext(ScreenContext);

	const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - (THEME.PADDING_HORIZONTAL * 2));

	const loadTodos = useCallback(async () => {
		await fetchTodos();
	}, [fetchTodos]);

	useEffect(() => {
		loadTodos();
	}, []);

	useEffect(() => {
		const update = () => {
			const width = Dimensions.get('window').width - (THEME.PADDING_HORIZONTAL * 2);
			setDeviceWidth(width);
		};

		Dimensions.addEventListener('change', update);

		return () => {
			Dimensions.removeEventListener('change', update);
		};
	}, []);

	if (loading) return <AppLoader/>;

	if (error) return (
		<View style={styles.center}>
			<AppText style={styles.error}>{error}</AppText>
			<AppButton onPress={loadTodos}>Try again</AppButton>
		</View>
	);

	let content =
		<View style={styles.imgWrap}>
			<Image
				style={styles.image}
				source={require('../../assets/no-items.png')}
			/>
		</View>;

	if (todos.length > 0) {
		content =
			<View style={{width: deviceWidth}}>
				<FlatList
					data={todos}
					renderItem={({item}) => <Todo todo={item} onOpen={changeScreen}/>}
					keyExtractor={item => item.id}
				/>
			</View>;
	}

	return (<View>
		<AddTodo onSubmit={addTodo}/>
		{content}
	</View>);
};

const styles = StyleSheet.create({
	imgWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		height: 300
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain'
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	error: {
		color: THEME.DANGER_COLOR,
		fontSize: 20,
		marginBottom: 15
	}
});