import React, {useContext, useReducer} from 'react';
import {ScreenContext} from '../screen/ScreenContext';
import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from '../types';
import {TodoContext} from './TodoContext';
import {todoReducer} from './todoReducer';

export const TodoState = ({children}) => {
	const initialState = {
		todos: [
			{id: 1, title: 'Learn React Native'},
			{id: 2, title: 'Learn React'},
			{id: 3, title: 'Learn Redux'},
			{id: 4, title: 'Learn GraphQL'}
		]
	};
	const {changeScreen} = useContext(ScreenContext);
	const [state, dispatch] = useReducer(todoReducer, initialState);

	const addTodo = (title) => dispatch({type: ADD_TODO, payload: {title}});
	const removeTodo = (id) => {
		changeScreen(null);
		dispatch({type: REMOVE_TODO, payload: {id}});
	};
	const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, payload: {id, title}});

	return (<TodoContext.Provider value={{todos: state.todos, addTodo, removeTodo, updateTodo}}>
		{children}
	</TodoContext.Provider>);
};