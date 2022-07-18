import {Text, TextInput, View} from 'react-native';
import React from 'react';

const InputText = ({
  styles = {},
  id,
  onChangeText,
  value,
  placeholder = '',
  keyboardType,
  label = '',
  error,
}) => {
  const {inputContainerStyle, labelStyle, inputStyle, errorStyle} = styles;
  return (
    <View style={inputContainerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        placeholder={placeholder}
        style={inputStyle}
        value={value}
        onChangeText={value => onChangeText(id, value)}
      />
      {!!error && <Text style={errorStyle}>{error}</Text>}
    </View>
  );
};

export default InputText;
