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

import {store} from './src/store';

import BookForm from './src/components/library-app-2/book-form';
import OTP from './src/components/otp-exercise/otp';
import PlayingWithFonts from './src/components/playing-with-fonts-exercise/playing-with-fonts';
import Index from './src/components/library-app-2';

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      {/* <OTP />
      <BookForm />
      <PlayingWithFonts /> */}
      <Index />
    </Provider>
  );
};

export default App;
