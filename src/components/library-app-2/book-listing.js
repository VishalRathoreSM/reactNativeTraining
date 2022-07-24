import React from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import Book from './book';

const {emptyArr} = global;

const BookListing = ({books = emptyArr, isFetching = true}) => {
  const {booksList} = styles;

  return (
    <View style={booksList}>
      {isFetching ? (
        <ActivityIndicator size="large" color="pink" />
      ) : !!books.length ? (
        books.map(data => <Book key={data.bookName} data={data} />)
      ) : (
        <Text>No Books Present</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  booksList: {
    marginVertical: 10,
  },
});

export default BookListing;
