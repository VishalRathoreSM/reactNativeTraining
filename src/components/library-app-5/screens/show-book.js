import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {startCase} from '../../../helpers/global';

const {emptyArr} = global;

const ShowBook = ({navigation, route: {params}}) => {
  useEffect(() => {
    navigation.setOptions({
      title: `${params.bookName} Details`,
    });
  }, emptyArr);

  const {container, label, bookInfo} = styles;

  return (
    <View style={container}>
      {params &&
        Object.entries(params).map(([key, value]) => (
          <View key={key} style={bookInfo}>
            <Text style={label}>{startCase(key)}</Text>
            <Text>{value.toString()}</Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9c2ff',
  },
  bookInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default ShowBook;
