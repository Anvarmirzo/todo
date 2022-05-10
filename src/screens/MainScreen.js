import React from 'react';
import {Text, View, StyleSheet, FlatList, Image} from 'react-native';
import {AddTodo} from '../components/AddTodo';
import {Todo} from '../components/Todo';

export const MainScreen = ({addTodo, removeTodo, todos, openTodo}) => {
	let content =
		<View style={styles.imgWrap}>
			<Image
				style={styles.image}
				source={require('../../assets/no-items.png')}
			/>
		</View>;

	if (todos.length > 0) content = <FlatList
		data={todos}
		renderItem={({item}) => <Todo
			todo={item}
			onRemove={removeTodo}
			onOpen={openTodo}
		/>}
		keyExtractor={item => item.id}
	/>;

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
		width:'100%',
		height:'100%',
		resizeMode: 'contain'
	}
});