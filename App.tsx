import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { RootNavigator } from './navigations/RootNavigator';

LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release'
])
export default function App() {
  return (
    <Provider store={store}>
        <RootNavigator />
    </Provider>
  );
}
