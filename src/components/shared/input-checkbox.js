import {Text, View} from 'react-native';
import React from 'react';

import CheckBox from '@react-native-community/checkbox';

const InputCheckbox = ({styles = {}, label = '', id, onValueChange, value}) => {
  const {checkboxContainerStyle, checkboxStyle, labelStyle} = styles;
  return (
    <View style={checkboxContainerStyle}>
      <CheckBox
        value={value}
        onValueChange={value => onValueChange(id, value)}
        style={checkboxStyle}
      />
      <Text style={labelStyle}>{label}</Text>
    </View>
  );
};

export default InputCheckbox;
