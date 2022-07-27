import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import SelectDropdown from '../../shared/select-dropdown';
import InputCheckbox from '../../shared/input-checkbox';
import InputText from '../../shared/input-text';
import {
  getInitialFormValues,
  renderItem,
  formConfigArr,
  formConfig,
  url,
} from '../../../constants/book-form';
import {container, aICenter} from '../../../assets/styles/global';
import {getBooks, setBooks} from '../../../store/slices/books';
import navigationRoutes from '../../../constants/navigation-routes';
import {Navigate, Push} from '../../../helpers/routes';
import {LaunchImageLibrary} from '../../../helpers/gallery';

const {BOOK_LISTING, CAPTURE_PHOTO} = navigationRoutes;

const {photo} = formConfig;

const {isIOS} = global;

const keyboardAvoidingViewProps = {
  behavior: isIOS ? 'padding' : null,
  keyboardVerticalOffset: 40,
  style: container,
};

const options = {
  storageOptions: {
    path: 'images',
    mediaType: 'photos',
  },
  maxWidth: 300,
  maxHeight: 400,
  includeBase64: true,
};

const BookForm = ({navigation, route}) => {
  const books = useSelector(getBooks);
  const [formState, setFormState] = useState(getInitialFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const dropDownRef = useRef(null);

  const {values, errors} = formState;

  const {
    cameraTools,
    btn,
    image,
    imageContainer,
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
          .then(async _ => {
            Alert.alert('Submitted Successfully');
            dropDownRef.current.reset();
            setFormState(getInitialFormValues);
            let newBooks = [...books, {...values}];
            await AsyncStorage.setItem('books', JSON.stringify(newBooks));
            dispatch(setBooks(newBooks));
            Navigate(navigation, BOOK_LISTING);
          })
          .catch(_ => Alert.alert('Something went wrong'));
      }

      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  useFocusEffect(
    useCallback(() => {
      route.params?.imageUri &&
        handleFieldChange(photo.key, route.params.imageUri);
    }, [route.params]),
  );

  const openGallery = () => {
    LaunchImageLibrary(options, response => {
      if (response.didCancel) return;
      else if (response.error) {
        Alert.alert('Something went wrong');
      } else {
        const uri = response.assets[0].uri;
        handleFieldChange(photo.key, uri);
      }
    });
  };

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

  const openCameraScreen = () => Push(navigation, CAPTURE_PHOTO);

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
        } else if (type === 'image') {
          return (
            <View key={key} style={formGroup}>
              <Text style={labelS}>
                {label} <Text style={red}>*</Text>{' '}
              </Text>
              {!!values[key] && (
                <View style={imageContainer}>
                  <Image
                    style={image}
                    source={{
                      uri: values[key],
                    }}
                  />
                </View>
              )}
              <View style={cameraTools}>
                <TouchableOpacity style={btn} onPress={openCameraScreen}>
                  <Text>Take Picture</Text>
                </TouchableOpacity>
                <Text> OR </Text>
                <TouchableOpacity style={btn} onPress={openGallery}>
                  <Text>Choose From Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
      },
    );
  };

  return (
    <SafeAreaView style={container}>
      <KeyboardAvoidingView {...keyboardAvoidingViewProps}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={container}>
            <View style={header}>
              <Text style={headerText}>Library Form</Text>
            </View>
            <ScrollView style={container}>
              <View style={form}>
                {renderFields()}
                <View style={formGroup}>
                  <Pressable style={aICenter} onPress={openCameraScreen}>
                    <Text style={btn}>Scan QR Code</Text>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  btn: {
    marginVertical: 10,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    width: 150,
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
  cameraTools: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default BookForm;
