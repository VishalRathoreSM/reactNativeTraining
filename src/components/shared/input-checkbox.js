import {Text, View} from 'react-native';
import React from 'react';

import CheckBox from '@react-native-community/checkbox';

const InputCheckbox = ({styles = {}, label = '', id, onValueChange, value}) => {
  const {checkboxContainer, checkbox, label: labelS} = styles;
  return (
    <View style={checkboxContainer}>
      <CheckBox
        value={value}
        onValueChange={value => onValueChange(id, value)}
        style={checkbox}
      />
      <Text style={labelS}>{label}</Text>
    </View>
  );
};

export default InputCheckbox;
