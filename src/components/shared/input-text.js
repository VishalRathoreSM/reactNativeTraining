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
  const {inputContainer, label: labelS, input, error: errorS} = styles;
  return (
    <View style={inputContainer}>
      <Text style={labelS}>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        placeholder={placeholder}
        style={input}
        value={value}
        onChangeText={value => onChangeText(id, value)}
      />
      {!!error && <Text style={errorS}>{error}</Text>}
    </View>
  );
};

export default InputText;
