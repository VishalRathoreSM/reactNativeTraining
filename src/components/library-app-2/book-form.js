import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';

const dropdownData = ['Vishal', 'Nishant', 'Vicky'];
const url = 'https://library-mock-server.herokuapp.com/';

const reqFields = ['bookName', 'authorName', 'price', 'email', 'website'];

const defaultFormValues = {
  bookName: '',
  authorName: '',
  publisher: '',
  price: '',
  email: '',
  website: '',
  displayBook: false,
};

function BookForm() {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {bookName, authorName, price, email, website, displayBook} = formValues;

  const formFields = [
    {
      label: 'Book Name',
      keyboardType: 'default',
      value: bookName,
      key: 'bookName',
    },
    {
      label: 'Author Name',
      keyboardType: 'default',
      value: authorName,
      key: 'authorName',
    },
    {
      comp: (
        <View key="publisher" style={styles.formGroup}>
          <Text style={styles.label}>Publishers</Text>
          <SelectDropdown
            data={dropdownData}
            defaultButtonText="Select a publisher"
            onSelect={selectedItem => {
              handleFieldChange('publisher', selectedItem);
            }}
            buttonTextAfterSelection={selectedItem => selectedItem}
            rowTextForSelection={item => item}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color="#444"
                  size={18}
                />
              );
            }}
            dropdownIconPosition="right"
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
          />
        </View>
      ),
    },
    {label: 'Price', keyboardType: 'numeric', value: price, key: 'price'},
    {label: 'Email', keyboardType: 'email-address', value: email, key: 'email'},
    {label: 'Website', keyboardType: 'url', value: website, key: 'website'},
    {
      comp: (
        <View key="displayBook" style={styles.checkboxContainer}>
          <CheckBox
            value={displayBook}
            onValueChange={value => handleFieldChange('displayBook', value)}
            style={styles.checkbox}
          />
          <Text style={styles.label}>
            Do you want to display this Book in library?
          </Text>
        </View>
      ),
    },
  ];

  const handleFieldChange = (field, value) => {
    setFormValues(prevFormValues => ({...prevFormValues, [field]: value}));
  };

  const validateForm = () => {
    for (const field of reqFields) {
      if (formValues[field].toString().trim() === '') {
        Alert.alert('Enter required fields');
        setIsSubmitting(false);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    validateForm() &&
      axios
        .post(url, formValues)
        .then(_ => {
          Alert.alert('Submitted Successfully');
          setFormValues(defaultFormValues);
        })
        .catch(_ => Alert.alert('Something went wrong'))
        .finally(() => setIsSubmitting(false));
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={0}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Library Form</Text>
            </View>
            <ScrollView style={{flex: 1}}>
              <View style={styles.form}>
                {formFields.map(
                  ({comp, label, key, value, keyboardType}) =>
                    comp || (
                      <View key={key} style={styles.formGroup}>
                        <Text style={styles.label}>
                          {label} <Text style={styles.req}>*</Text>{' '}
                        </Text>
                        <TextInput
                          keyboardType={keyboardType}
                          placeholder={label}
                          style={styles.input}
                          value={value}
                          onChangeText={value => handleFieldChange(key, value)}
                        />
                      </View>
                    ),
                )}
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Pressable
        onPress={handleSubmit}
        disabled={isSubmitting}
        style={styles.submitBtn}>
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Text style={styles.submitBtnText}>Submit</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 40,
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
  req: {
    color: 'red',
  },
  label: {
    fontWeight: '700',
    marginVertical: 10,
  },
  input: {
    padding: 10,
    borderColor: '#000',
    fontSize: 15,
    borderWidth: 2,
    height: 40,
  },
  dropdownBtnStyle: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#000',
  },
  dropdownBtnTxtStyle: {color: '#444', textAlign: 'left', fontSize: 15},
  dropdownRowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdownRowTxtStyle: {color: '#444', textAlign: 'left'},
});

export default BookForm;
