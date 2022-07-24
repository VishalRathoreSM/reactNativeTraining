import React, {useState} from 'react';
import {Image, Text, View, ActivityIndicator} from 'react-native';
import {BoldText} from '../shared/custom-text';

const styles = {
  bookContainer: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  bookNameS: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 10,
  },
  bookInfo: {
    fontSize: 15,
    paddingVertical: 10,
  },
  bookLogo: {
    height: 100,
    width: 100,
    paddingVertical: 10,
  },
  bookImgloader: {height: 10, width: 80, alignItems: 'center'},
};

const {bookContainer, bookInfo, bookNameS, bookLogo, bookImgloader} = styles;

const {emptyObj} = global;

const uri = 'https://api.lorem.space/image/book';

const BookInfo = ({label, content}) => (
  <Text style={bookInfo}>
    <BoldText>{label} -</BoldText> {content}
  </Text>
);

const Book = ({data}) => {
  const {bookName, authorName, publisher, email, website, price} =
    data || emptyObj;
  const [imageLoaded, setImageLoaded] = useState(false);

  const onLoadEnd = () => {
    setImageLoaded(true);
  };

  return (
    <View style={bookContainer}>
      <Text style={bookNameS}>{bookName}</Text>
      <BookInfo label="Authored By" content={authorName} />
      <BookInfo label="Published By" content={publisher} />
      <BookInfo label="Email" content={email} />
      <BookInfo label="Website" content={website} />
      <BookInfo label="Price" content={price} />
      {!imageLoaded && (
        <View style={bookImgloader}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
      <Image
        style={bookLogo}
        onLoadEnd={onLoadEnd}
        source={{
          uri,
        }}
      />
    </View>
  );
};

export default Book;
