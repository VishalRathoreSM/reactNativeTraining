import React from 'react';
import {Text} from 'react-native';

const gochiHandStyles = {
  fontFamily: 'GochiHand-Regular',
};

export const GochiHandText = ({children, customStyle = {}}) => (
  <Text style={[gochiHandStyles, customStyle]}>{children}</Text>
);
