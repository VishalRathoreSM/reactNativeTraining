import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {libraryApiEndpoint as url} from '../../constants/library';

const BookListing = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(url).then(res => {
      setBooks(res.data?.books);
    });
  }, []);

  return (
    <View>
      <FlatList
        data={books}
        renderItem={({item}) => (
          <Text style={styles.item}>{item.bookName}</Text>
        )}
        keyExtractor={item => item.bookName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    fontWeight: 'bold',
  },
});

export default BookListing;
