import React, {useEffect, useState} from 'react';
import {TextInput, View, StyleSheet, StatusBar, Alert} from 'react-native';

const inputs = new Array(6).fill(0);

function OTP() {
  const [otpTextInput] = useState([]);
  const [otp, setOtp] = useState(Array(6).fill(''));

  useEffect(() => {
    otpTextInput[0].focus();
  }, []);

  const focusPrevious = (key, index) => {
    if (key === 'Backspace' && index !== 0) otpTextInput[index - 1].focus();
  };

  const focusNext = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (index < otpTextInput.length - 1 && value) {
      otpTextInput[index + 1].focus();
    }

    if (index === otpTextInput.length - 1 && value) {
      otpTextInput[index].blur();
      newOtp.every(value => value.length && !isNaN(value)) &&
        Alert.alert('OTP', `OTP entered is ${newOtp.join('')}`);
    }

    setOtp(newOtp);
  };

  const renderItem = index => {
    return (
      <View key={index} style={styles.item}>
        <TextInput
          style={styles.otpField}
          keyboardType="numeric"
          onChangeText={value => focusNext(index, value)}
          onKeyPress={e => focusPrevious(e.nativeEvent.key, index)}
          maxLength={1}
          onSubmitEditing={() => {
            otpTextInput[index].blur();
            otp.every(value => value.length && !isNaN(value)) &&
              Alert.alert('OTP', `OTP entered is ${otp.join('')}`);
          }}
          ref={ref => (otpTextInput[index] = ref)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {inputs.map((i, index) => renderItem(index))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
    borderColor: '#000',
    borderWidth: 1,
    flexDirection: 'row',
  },
  item: {
    marginHorizontal: 10,
  },
  otpField: {
    borderColor: '#000',
    borderWidth: 1,
    height: 50,
    width: 35,
    padding: 5,
    textAlign: 'center',
    color: '#000',
  },
});

export default OTP;
