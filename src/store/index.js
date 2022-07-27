import {configureStore} from '@reduxjs/toolkit';
import booksReducer from './slices/books';

export default store = configureStore({
  reducer: {books: booksReducer},
});
