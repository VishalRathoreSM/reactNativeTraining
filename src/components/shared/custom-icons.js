import React from 'react';
import {Text} from 'react-native';

const icomoonStyles = {
  fontFamily: 'icomoon',
};

export const IconIcomoon = ({content, customStyle}) => (
  <Text style={[icomoonStyles, customStyle]}>{content}</Text>
);
