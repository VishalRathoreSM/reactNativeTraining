import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const books = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, {payload}) {
      return [...payload];
    },
  },
});

export const {setBooks} = books.actions;

export const getBooks = state => state.books;

export default books.reducer;
