import {useCallback, useEffect, useState} from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {ScreenState} from './src/context/screen/ScreenState';
import {TodoState} from './src/context/todo/TodoState';
import {MainLayout} from './src/MainLayout';

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

	if (!appIsReady) return null;

	return (
		<ScreenState>
			<TodoState>
				<MainLayout onLayoutRootView={onLayoutRootView}/>
			</TodoState>
		</ScreenState>
	);
}


