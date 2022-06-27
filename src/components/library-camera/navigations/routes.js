import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BookForm, BookListing, ShowBook, CapturePhoto} from '../screens';
import navigationRoutes from '../../../constants/navigation-routes';

const {BOOK_LISTING, SHOW_BOOK, CREATE_BOOK, CAPTURE_PHOTO} = navigationRoutes;

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={BOOK_LISTING}
          options={{title: 'All Books'}}
          component={BookListing}
        />
        <Stack.Screen
          name={SHOW_BOOK}
          options={{title: 'Book Details'}}
          component={ShowBook}
        />
        <Stack.Screen
          name={CREATE_BOOK}
          options={{title: 'Create A New Book'}}
          component={BookForm}
        />
        <Stack.Screen
          name={CAPTURE_PHOTO}
          options={{title: 'Camera'}}
          component={CapturePhoto}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
