import React, {useState} from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';

const inputs = new Array(6).fill('');
const otp = [];

const OTP = () => {
  const [activeField, setActiveField] = useState(0);

  const handleSubmit = () => {
    const enteredOtp = otp.join('');

    const isOtpValid =
      enteredOtp.length === inputs.length &&
      otp.every(value => !!value.trim() && !isNaN(value));

    if (isOtpValid) {
      Alert.alert('OTP', `OTP entered is ${enteredOtp}`);
    } else {
      Alert.alert('OTP', 'Invalid OTP');
    }
  };

  const focusOnField = index => index >= 0 && inputs[index].focus();

  const handleKeyPress = (nativeEvent, index) =>
    nativeEvent.key === 'Backspace' && focusOnField(index - 1);

  const handleChangeText = (index, value) => {
    otp[index] = value;

    if (index < inputs.length - 1 && value) {
      focusOnField(index + 1);
    }

    if (index == inputs.length - 1) {
      handleSubmit();
    }
  };

  const {
    container,
    heading,
    otpContainer,
    fieldContainer,
    otpField,
    activeFieldS,
  } = styles;

  const renderField = (_, index) => (
    <View key={index} style={fieldContainer}>
      <TextInput
        onSubmitEditing={handleSubmit}
        style={[otpField, index == activeField && activeFieldS]}
        keyboardType="numeric"
        onChangeText={value => handleChangeText(index, value)}
        onKeyPress={e => handleKeyPress(e.nativeEvent, index)}
        maxLength={1}
        onFocus={() => setActiveField(index)}
        autoFocus={index === 0 ? true : undefined}
        ref={ref => (inputs[index] = ref)}
      />
    </View>
  );

  return (
    <SafeAreaView style={container}>
      <Text style={heading}>Enter OTP</Text>
      <View style={otpContainer}>{inputs.map(renderField)}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  activeFieldS: {
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
