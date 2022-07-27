import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import {formConfig} from '../../../constants/book-form';
import {startCase} from '../../../helpers/global';

const {photo, qrCode} = formConfig;

const {emptyArr} = global;

const ShowBook = ({navigation, route: {params}}) => {
  useEffect(() => {
    navigation.setOptions({
      title: `${params.bookName} Details`,
    });
  }, emptyArr);

  const {container, label, bookInfo, image} = styles;

  return (
    <View style={container}>
      {params &&
        Object.entries(params).map(([key, value]) => (
          <View key={key} style={bookInfo}>
            <Text style={label}>{startCase(key)}</Text>
            {key == photo.key || key == qrCode.key ? (
              <Image
                style={image}
                source={{
                  uri: value,
                }}
              />
            ) : (
              <Text>{value.toString()}</Text>
            )}
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
  image: {
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    width: 150,
  },
});

export default ShowBook;
