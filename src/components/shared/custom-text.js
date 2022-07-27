import React from 'react';
import {Text} from 'react-native';

const {emptyObj} = global;

const gochiHandStyles = {
  fontFamily: 'GochiHand-Regular',
};
const bold = {
  fontWeight: 'bold',
};

export const GochiHandText = ({children, customStyle = emptyObj}) => (
  <Text style={[gochiHandStyles, customStyle]}>{children}</Text>
);

export const BoldText = ({children, customStyle = emptyObj}) => (
  <Text style={[bold, customStyle]}>{children}</Text>
);
