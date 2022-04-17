import React from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {AddTodo} from '../components/AddTodo';
import {Todo} from '../components/Todo';

export const MainScreen = ({addTodo, removeTodo, todos}) => {
	return (
		<View>
			<AddTodo onSubmit={addTodo}/>
			<FlatList
				data={todos}
				renderItem={({item}) => <Todo todo={item} onRemove={removeTodo}/>}
				keyExtractor={item => item.id}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});