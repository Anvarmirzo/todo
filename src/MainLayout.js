import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Navbar} from './components/Navbar';
import {ScreenContext} from './context/screen/ScreenContext';
import {MainScreen} from './screens/MainScreen';
import {TodoScreen} from './screens/TodoScreen';
import {THEME} from './theme';

export const MainLayout = ({onLayoutRootView}) => {
	const {todoId} = useContext(ScreenContext);

	return (
		<View onLayout={onLayoutRootView}>
			<Navbar title="Todo App"/>
			<View style={styles.container}>{todoId ? <TodoScreen/> : <MainScreen/>}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: THEME.PADDING_HORIZONTAL,
		paddingVertical: 20,
		flex: 0,
		flexDirection: 'column'
	}
});