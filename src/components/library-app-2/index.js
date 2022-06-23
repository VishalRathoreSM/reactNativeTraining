import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
} from 'react-native';

import axios from 'axios';
import BookForm from './book-form';
import BookListing from './book-listing';
import {container} from '../../assets/styles/global';
import {url} from '../../constants/book-form';

const {isIOS, emptyArr} = global;

const keyboardAvoidingViewProps = {
  behavior: isIOS ? 'padding' : null,
  keyboardVerticalOffset: 0,
  style: container,
};

let isInitiallyFetching = true;

const Index = () => {
  const [books, setBooks] = useState(emptyArr);
  const [isFetching, setIsFetching] = useState(true);

  const fetchBooks = () => {
    setIsFetching(true);
    axios.get(url).then(res => {
      setBooks(res.data?.books);
      isInitiallyFetching = false;
      setIsFetching(false);
    });
  };

  useEffect(fetchBooks, emptyArr);

  return (
    <KeyboardAvoidingView {...keyboardAvoidingViewProps}>
      <SafeAreaView style={container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={container}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={fetchBooks} />
            }>
            <BookListing books={books} isFetching={isInitiallyFetching} />
            <BookForm />
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Index;
