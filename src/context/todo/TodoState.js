import React, {useContext, useReducer} from 'react';
import {Http} from '../../http';
import {ScreenContext} from '../screen/ScreenContext';
import {
	ADD_TODO,
	CLEAR_ERROR,
	FETCH_TODOS,
	HIDE_LOADER,
	REMOVE_TODO,
	SHOW_ERROR,
	SHOW_LOADER,
	UPDATE_TODO
} from '../types';
import {TodoContext} from './TodoContext';
import {todoReducer} from './todoReducer';

export const TodoState = ({children}) => {
	const initialState = {
		todos: [],
		loading: false,
		error: null
	};
	const {changeScreen} = useContext(ScreenContext);
	const [state, dispatch] = useReducer(todoReducer, initialState);

	const addTodo = async (title) => {
		clearError();
		const data = await Http.post('https://react-native-f2858-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json', {title}, showError);
		dispatch({type: ADD_TODO, payload: {title, id: data.name}});
	};

	const removeTodo = async (id) => {
		clearError();
		await Http.delete(`https://react-native-f2858-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${id}.json`, showError);
		changeScreen(null);
		dispatch({type: REMOVE_TODO, payload: {id}});
	};

	const fetchTodos = async () => {
		showLoader();
		clearError();

		const data = await Http.get('https://react-native-f2858-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json', showError, hideLoader);

		const todos = Object.keys(data).map((key) => {
			return {
				id: key,
				title: data[key].title
			};
		});

		dispatch({type: FETCH_TODOS, payload: {todos}});
	};

	const updateTodo = async (id, title) => {
		clearError();
		const data = await Http.patch(`https://react-native-f2858-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${id}.json`, {title}, showError);

		dispatch({type: UPDATE_TODO, payload: {id, title: data.title}});
	};

	const showLoader = () => dispatch({type: SHOW_LOADER});
	const hideLoader = () => dispatch({type: HIDE_LOADER});
	const showError = (error) => dispatch({type: SHOW_ERROR, payload: {error}});
	const clearError = () => dispatch({type: CLEAR_ERROR});

	return (<TodoContext.Provider value={
		{
			todos: state.todos,
			loading: state.loading,
			error: state.error,
			addTodo,
			removeTodo,
			updateTodo,
			fetchTodos
		}
	}>
		{children}
	</TodoContext.Provider>);
};

