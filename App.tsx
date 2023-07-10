/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Colors from './components/styles/colors';
import {StyleSheet, useColorScheme, View} from 'react-native';

import Homepage from './components/homepage';
import {Provider, useSelector} from 'react-redux';
import store from './redux/link_store';
import Login from './components/login';
import SignUp from './components/signup';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TransitionSpecs} from '@react-navigation/stack';
import SplashScreen from './components/splash_screen';
import WrapperComponent from './components/wrapper_component';
import { PaperProvider } from 'react-native-paper';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();

  return (
      <Provider store={store}>
        <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="WrapperComponent"
              component={WrapperComponent}
            />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="HomePage" component={Homepage} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        </PaperProvider>
      </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
