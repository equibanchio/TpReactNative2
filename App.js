import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import HomeScreen from './src/screens/HomeScreen';
import { View } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <HomeScreen />
      </View>
    </Provider>
  );
}
