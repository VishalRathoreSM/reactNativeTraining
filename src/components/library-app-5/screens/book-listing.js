import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {getBooks, setBooks} from '../../../store/slices/books';
import {url} from '../../../constants/book-form';
import navigationRoutes from '../../../constants/navigation-routes';
import {Push} from '../../../helpers/routes';

const {SHOW_BOOK, CREATE_BOOK} = navigationRoutes;

const {emptyArr} = global;

const keyExtractor = item => item.bookName;

let isInitiallyFetching = true;

const BookListing = ({navigation}) => {
  const books = useSelector(getBooks);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchBooks();
  }, emptyArr);

  const fetchBooks = async () => {
    try {
      setIsFetching(true);
      const books = await AsyncStorage.getItem('books');
      if (books) {
        isInitiallyFetching = false;
        dispatch(setBooks(JSON.parse(books)));
        setIsFetching(false);
      } else {
        axios.get(url).then(res => {
          dispatch(setBooks(res.data?.books));
          isInitiallyFetching = false;
          setIsFetching(false);
        });
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  const renderBook = ({item}) => (
    <Text onPress={() => Push(navigation, SHOW_BOOK, {...item})} style={book}>
      {item.bookName}
    </Text>
  );

  const onAddBookPress = () => Push(navigation, CREATE_BOOK);

  const {addBookBtn, book, booksList, btnText} = styles;

  return (
    <SafeAreaView style={booksList}>
      {isInitiallyFetching ? (
        <ActivityIndicator size="large" color="pink" />
      ) : !!books.length ? (
        <FlatList
          data={books}
          renderItem={renderBook}
          onRefresh={fetchBooks}
          refreshing={isFetching}
          keyExtractor={keyExtractor}
        />
      ) : (
        <Text>No Books Present</Text>
      )}

      <TouchableOpacity style={addBookBtn} onPress={onAddBookPress}>
        <Text style={btnText}>Add Book</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  book: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    fontWeight: 'bold',
  },
  addBookBtn: {
    backgroundColor: '#4285F4',
    marginHorizontal: 20,
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    padding: 10,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  booksList: {
    marginVertical: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default BookListing;
