/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';

import store from './src/store';

import BookForm from './src/components/library-app-2/book-form';
import OTP from './src/components/otp-exercise/otp';
import PlayingWithFonts from './src/components/playing-with-fonts-exercise/playing-with-fonts';
import Index from './src/components/library-app-2';
import Index2 from './src/components/know-your-app';
import Routes from './src/components/library-app-5/navigations/routes.js';
import Routes2 from './src/components/library-camera/navigations/routes.js';

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <Routes2 />
    </Provider>
  );
};

export default App;
