import {useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {Navbar} from './src/components/Navbar';
import {MainScreen} from './src/screens/MainScreen';
import {TodoScreen} from './src/screens/TodoScreen';
import {THEME} from './src/theme';

const loadApp = async (setAppIsReady) => {
	try {
		await Font.loadAsync({
			'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
			'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
		});
	} catch (e) {
		console.warn(e);
	} finally {
		setAppIsReady(true);
	}
};


export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		loadApp(setAppIsReady);
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) await SplashScreen.hideAsync();
	}, [appIsReady]);

	const [todoId, setTodoId] = useState(1);
	const [todos, setTodos] = useState([{
		id: 1, title: 'Learn React Native', completed: false
	}, {
		id: 2, title: 'Learn React', completed: false
	}, {
		id: 3, title: 'Learn Redux', completed: false
	}, {
		id: 4, title: 'Learn GraphQL', completed: false
	}]);
	if (!appIsReady) return null;


	const addTodo = (title) => {
		setTodos([...todos, {
			id: `${todos.length + 1}`, title: title
		}]);
	};

	const removeTodo = (id) => {
		const todo = todos.find(todo => todo.id === id);
		Alert.alert('Delete', `Delete "${todo.title}"?`, [{text: 'Cancel', style: 'cancel'}, {
			text: 'Delete', style: 'destructive', onPress: () => {
				setTodoId(null);
				setTodos(todos.filter(todo => todo.id !== id));
			}
		}], {cancelable: true});
	};

	const updateTodo = (id, title) => {
		setTodos(old => old.map(todo => {
			if (todo.id === id) todo.title = title;
			return todo;
		}));
	};

	const handleBack = () => {
		setTodoId(null);
	};

	let content = <MainScreen todos={todos} addTodo={addTodo} removeTodo={removeTodo} openTodo={setTodoId}/>;
	if (todoId) {
		const currentTodo = todos.find(todo => todo.id === todoId);
		content = <TodoScreen
			onSave={updateTodo}
			todo={currentTodo}
			goBack={handleBack}
			onRemove={removeTodo}
		/>;
	}

	return (<View onLayout={onLayoutRootView}>
		<Navbar/>
		<View style={styles.container}>
			{content}
		</View>
	</View>);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: THEME.PADDING_HORIZONTAL,
		paddingVertical: 20,
		flex: 0,
		flexDirection: 'column'
	}
});
