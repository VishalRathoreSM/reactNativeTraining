import React, {useEffect, useState} from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';

const inputs = new Array(6).fill(0);
const initialOtp = new Array(6).fill('');

function OTP() {
  const [otpTextInput] = useState(() => []);
  const [otp, setOtp] = useState(initialOtp);
  const [activeField, setActiveField] = useState(0);

  useEffect(() => {
    const enteredOtp = otp.join('');

    const isOtpValid =
      enteredOtp.length === otp.length &&
      otp.every(value => !!value.trim() && !isNaN(value));

    if (isOtpValid) {
      Alert.alert('OTP', `OTP entered is ${enteredOtp}`);
    } else if (!!otp[5]) {
      Alert.alert('OTP', 'Invalid OTP');
    }
  }, [otp]);

  const focusOnField = fieldIndex => {
    if (fieldIndex >= 0) {
      otpTextInput[fieldIndex].focus();
      setActiveField(fieldIndex);
    }
  };

  const handleKeyPress = (nativeEvent, index) => {
    console.log(nativeEvent.key);
    if (nativeEvent.key === 'Backspace') focusOnField(index - 1);
  };

  const handleChangeText = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (index < otpTextInput.length - 1 && value) {
      focusOnField(index + 1);
    }

    setOtp(newOtp);
  };

  const {
    container: containerStyle,
    heading: headingStyle,
    otpContainer: otpContainerStyle,
    fieldContainer: itemStyle,
    otpField: otpFieldStyle,
    activeField: activeFieldStyle,
  } = styles;

  const renderItem = index => (
    <View key={index} style={itemStyle}>
      <TextInput
        style={[otpFieldStyle, index == activeField && activeFieldStyle]}
        keyboardType="numeric"
        onChangeText={value => handleChangeText(index, value)}
        onKeyPress={e => handleKeyPress(e.nativeEvent, index)}
        maxLength={1}
        autoFocus={index === 0 ? true : undefined}
        ref={ref => (otpTextInput[index] = ref)}
      />
    </View>
  );

  return (
    <View style={containerStyle}>
      <Text style={headingStyle}>Enter OTP</Text>
      <View style={otpContainerStyle}>
        {inputs.map((_, index) => renderItem(index))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  heading: {
    fontSize: 25,
    marginVertical: 20,
  },
  otpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    flexDirection: 'row',
  },
  fieldContainer: {
    marginHorizontal: 10,
  },
  activeField: {
    borderColor: 'blue',
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
