/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {store} from './src/store';
import {Provider} from 'react-redux';
// import BookForm from './src/components/library-app-2/book-form';
import OTP from './src/components/otp-exercise/otp';
// import PlayingWithFonts from './src/components/playing-with-fonts-exercise/playing-with-fonts';

const App = () => {
  return (
    <Provider store={store}>
      {/* <BookForm /> */}
      {/* <OTP /> */}
      {/* <PlayingWithFonts /> */}
    </Provider>
  );
};

export default App;
