import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Navbar} from './src/components/Navbar';
import {MainScreen} from './src/screens/MainScreen';
import {TodoScreen} from './src/screens/TodoScreen';

export default function App() {
	const [todoId, setTodoId] = useState(null);
	const [todos, setTodos] = useState([
		{
			id: 1,
			title: 'Learn React Native',
			completed: false
		},
		{
			id: 2,
			title: 'Learn React',
			completed: false
		},
		{
			id: 3,
			title: 'Learn Redux',
			completed: false
		},
		{
			id: 4,
			title: 'Learn GraphQL',
			completed: false
		}
	]);


	const addTodo = (title) => {
		setTodos([...todos, {
			id: `${todos.length + 1}`, title: title
		}]);
	};

	const removeTodo = (id) => {
		console.log(id);
		setTodos(todos.filter(todo => todo.id !== id));
	};

	let content = <MainScreen todos={todos} addTodo={addTodo} removeTodo={removeTodo}/>;
	if (content) content = <TodoScreen todos={todos}/>;

	return (
		<View>
			<Navbar/>
			<View style={styles.container}>
				{content}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 30, paddingVertical: 20,
		flex: 0,
		flexDirection: 'column'
	}
});
