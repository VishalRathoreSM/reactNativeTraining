import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
  Keyboard,
  Alert,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import SelectDropdown from '../shared/select-dropdown';
import InputCheckbox from '../shared/input-checkbox';
import InputText from '../shared/input-text';
import {
  getInitialFormValues,
  renderItem,
  formConfigArr,
  formConfig,
  url,
} from '../../constants/book-form';

function BookForm() {
  const [formState, setFormState] = useState(getInitialFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dropDownRef = useRef(null);

  const {values, errors} = formState;

  const {
    containerStyle,
    headerStyle,
    headerTextStyle,
    submitBtnStyle,
    submitBtnTextStyle,
    formStyle,
    formGroupStyle,
    checkboxContainerStyle,
    checkboxStyle,
    reqStyle,
    labelStyle,
    errorStyle,
    inputStyle,
    dropdownRowStyle,
    dropdownBtnStyle,
    dropdownBtnTxtStyle,
    dropdownRowTxtStyle,
  } = styles;

  useEffect(() => {
    if (isSubmitting) {
      const hasErrors = Object.values(errors).some(Boolean);
      if (!hasErrors) {
        axios
          .post(url, values)
          .then(_ => {
            Alert.alert('Submitted Successfully');
            dropDownRef.current.reset();
            setFormState(getInitialFormValues);
          })
          .catch(_ => Alert.alert('Something went wrong'));
      }

      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  const validateField = key => {
    const field = formConfig[key];
    if (field.isReq) {
      const isEmpty = values[key].toString().trim() === '';
      return isEmpty ? `Enter ${field.label} ` : '';
    }
    return '';
  };

  const handleSubmit = () => {
    let errors = {};

    formConfigArr.forEach(({key}) => {
      errors[key] = validateField(key);
    });

    setFormState(prevFormState => ({
      ...prevFormState,
      errors,
    }));
    setIsSubmitting(true);
  };

  const handleFieldChange = (field, value) => {
    const hasError = !!errors[field];

    setFormState(({values: prevValues, errors: prevErrors}) => ({
      errors: {...prevErrors, ...(hasError && {[field]: ''})},
      values: {...prevValues, [field]: value},
    }));
  };

  const renderFields = () => {
    return formConfigArr.map(
      ({label, key, keyboardType, type, data, defaultButtonText}) => {
        if (type === 'text') {
          return (
            <InputText
              key={key}
              styles={{
                inputContainerStyle: formGroupStyle,
                labelStyle,
                inputStyle,
                errorStyle,
              }}
              id={key}
              onChangeText={handleFieldChange}
              value={values[key]}
              error={errors[key]}
              placeholder={label}
              keyboardType={keyboardType}
              label={
                <>
                  {label} <Text style={reqStyle}>*</Text>{' '}
                </>
              }
            />
          );
        } else if (type === 'checkbox') {
          return (
            <InputCheckbox
              key={key}
              styles={{checkboxContainerStyle, checkboxStyle, labelStyle}}
              label={label}
              id={key}
              onValueChange={handleFieldChange}
              value={values[key]}
              error={errors[key]}
            />
          );
        } else if (type === 'dropdown') {
          return (
            <SelectDropdown
              key={key}
              data={data}
              styles={{
                dropdownContainerStyle: formGroupStyle,
                labelStyle,
                btnStyle: dropdownBtnStyle,
                btnTxtStyle: dropdownBtnTxtStyle,
                rowStyle: dropdownRowStyle,
                rowTxtStyle: dropdownRowTxtStyle,
              }}
              onSelect={handleFieldChange}
              id={key}
              label={label}
              ref={dropDownRef}
              defaultButtonText={defaultButtonText}
              renderBtnTextAfterSelection={renderItem}
              renderRowTextForSelection={renderItem}
            />
          );
        }
      },
    );
  };

  return (
    <SafeAreaView style={containerStyle}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={0}
        style={containerStyle}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={containerStyle}>
            <View style={headerStyle}>
              <Text style={headerTextStyle}>Library Form</Text>
            </View>

            <ScrollView style={containerStyle}>
              <View style={formStyle}>{renderFields()}</View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <Pressable
        onPress={handleSubmit}
        disabled={isSubmitting}
        style={submitBtnStyle}>
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Text style={submitBtnTextStyle}>Submit</Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: '#5DB3FF',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextStyle: {
    textTransform: 'capitalize',
    color: '#800080',
    fontWeight: '800',
    fontSize: 25,
  },
  submitBtnStyle: {
    height: 50,
    backgroundColor: '#90EE90',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnTextStyle: {
    textTransform: 'capitalize',
    color: '#000',
    fontWeight: '700',
    fontSize: 20,
  },
  formStyle: {
    flex: 1,
    alignItems: 'center',
  },
  formGroupStyle: {
    width: '90%',
    marginVertical: 10,
  },
  checkboxContainerStyle: {
    width: '90%',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxStyle: {
    marginRight: 10,
  },
  reqStyle: {
    color: 'red',
  },
  labelStyle: {
    fontWeight: '700',
    marginVertical: 10,
  },
  errorStyle: {
    color: 'red',
    marginTop: 10,
  },
  inputStyle: {
    padding: 10,
    fontSize: 15,
    backgroundColor: 'lightblue',
    height: 40,
  },
  dropdownBtnStyle: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: 'lightblue',
  },
  dropdownBtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 15,
  },
  dropdownRowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdownRowTxtStyle: {color: '#444', textAlign: 'left'},
});

export default BookForm;
