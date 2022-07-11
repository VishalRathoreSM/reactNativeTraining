import {StyleSheet, Text} from 'react-native';
import React from 'react';

const MyAppText = ({children, customStyle = {}}) => (
  <Text style={[styles.text, customStyle]}>{children}</Text>
);

export default MyAppText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'GochiHand-Regular',
  },
});
