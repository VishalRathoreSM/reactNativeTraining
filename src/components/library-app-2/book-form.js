import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  ActivityIndicator,
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

const BookForm = () => {
  const [formState, setFormState] = useState(getInitialFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dropDownRef = useRef(null);

  const {values, errors} = formState;

  const {
    container,
    header,
    headerText,
    submitBtn,
    submitBtnText,
    form,
    formGroup,
    checkboxContainer,
    checkbox,
    red,
    labelS,
    errorS,
    inputS,
    dropdownRow,
    dropdownBtn,
    dropdownBtnTxt,
    dropdownRowTxt,
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
                inputContainer: formGroup,
                label: labelS,
                input: inputS,
                error: errorS,
              }}
              id={key}
              onChangeText={handleFieldChange}
              value={values[key]}
              error={errors[key]}
              placeholder={label}
              keyboardType={keyboardType}
              label={
                <>
                  {label} <Text style={red}>*</Text>{' '}
                </>
              }
            />
          );
        } else if (type === 'checkbox') {
          return (
            <InputCheckbox
              key={key}
              styles={{checkboxContainer, checkbox, label: labelS}}
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
                dropdownContainer: formGroup,
                label: labelS,
                btn: dropdownBtn,
                btnTxt: dropdownBtnTxt,
                row: dropdownRow,
                rowTxt: dropdownRowTxt,
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
    <SafeAreaView style={container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={0}
        style={container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={container}>
            <View style={header}>
              <Text style={headerText}>Library Form</Text>
            </View>

            <ScrollView style={container}>
              <View style={form}>{renderFields()}</View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <Pressable
        onPress={handleSubmit}
        disabled={isSubmitting}
        style={submitBtn}>
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Text style={submitBtnText}>Submit</Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#5DB3FF',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    textTransform: 'capitalize',
    color: '#800080',
    fontWeight: '800',
    fontSize: 25,
  },
  submitBtn: {
    height: 50,
    backgroundColor: '#90EE90',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    textTransform: 'capitalize',
    color: '#000',
    fontWeight: '700',
    fontSize: 20,
  },
  form: {
    flex: 1,
    alignItems: 'center',
  },
  formGroup: {
    width: '90%',
    marginVertical: 10,
  },
  checkboxContainer: {
    width: '90%',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  red: {
    color: 'red',
  },
  labelS: {
    fontWeight: '700',
    marginVertical: 10,
  },
  errorS: {
    color: 'red',
    marginTop: 10,
  },
  inputS: {
    padding: 10,
    fontSize: 15,
    backgroundColor: 'lightblue',
    height: 40,
  },
  dropdownBtn: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: 'lightblue',
  },
  dropdownBtnTxt: {
    color: '#444',
    textAlign: 'left',
    fontSize: 15,
  },
  dropdownRow: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdownRowTxt: {color: '#444', textAlign: 'left'},
});

export default BookForm;
