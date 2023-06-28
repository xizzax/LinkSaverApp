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
import {Provider} from 'react-redux';
import store from './redux/link_store';
import Login from './components/login';
import SignUp from './components/signup';




function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    //this is for the redux part
    <Provider store={store}>
      <View>
        {/* <Login /> */}
        <SignUp />
        {/* <Homepage username="Izza" /> */}
      </View>
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
