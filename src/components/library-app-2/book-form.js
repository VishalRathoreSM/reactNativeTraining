// import React, {useState} from 'react';
// import CheckBox from '@react-native-community/checkbox';
// import {
//   StatusBar,
//   StyleSheet,
//   KeyboardAvoidingView,
//   ScrollView,
//   Pressable,
//   Text,
//   TextInput,
//   View,
// } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import SelectDropdown from 'react-native-select-dropdown';

// const data = ['Vishal', 'nishant', 'Vicky'];

// function BookForm() {
//   const [formValues, setFormValues] = useState({
//     bookName: '',
//     authorName: '',
//     publisher: '',
//     price: '',
//     email: '',
//     website: '',
//     displayBook: false,
//   });

//   const {bookName, authorName, price, email, website, displayBook} = formValues;

//   const formFields = [
//     {
//       label: 'Book Name',
//       keyboardType: 'default',
//       value: bookName,
//       key: 'bookName',
//     },
//     {
//       label: 'Author Name',
//       keyboardType: 'default',
//       value: authorName,
//       key: 'authorName',
//     },
//     {
//       key: 'publisher',
//       Comp: () => (
//         <View style={styles.formGroup}>
//           <Text style={styles.label}>Publishers</Text>
//           <SelectDropdown
//             data={data}
//             defaultButtonText="Select a publisher"
//             onSelect={selectedItem => {
//               handleFieldChange('publisher', selectedItem);
//             }}
//             buttonTextAfterSelection={selectedItem => {
//               return selectedItem;
//             }}
//             rowTextForSelection={item => {
//               return item;
//             }}
//             buttonStyle={styles.dropdownBtnStyle}
//             buttonTextStyle={styles.dropdownBtnTxtStyle}
//             renderDropdownIcon={isOpened => {
//               return (
//                 <FontAwesome
//                   name={isOpened ? 'chevron-up' : 'chevron-down'}
//                   color={'#444'}
//                   size={18}
//                 />
//               );
//             }}
//             dropdownIconPosition={'right'}
//             rowStyle={styles.dropdownRowStyle}
//             rowTextStyle={styles.dropdownRowTxtStyle}
//           />
//         </View>
//       ),
//     },
//     {label: 'Price', keyboardType: 'numeric', value: price, key: 'price'},
//     {label: 'Email', keyboardType: 'email-address', value: email, key: 'email'},
//     {label: 'Website', keyboardType: 'url', value: website, key: 'website'},
//     {
//       key: 'displayBook',
//       Comp: () => (
//         <View style={styles.checkboxContainer}>
//           <CheckBox
//             value={displayBook}
//             onValueChange={value => handleFieldChange('displayBook', value)}
//             style={styles.checkbox}
//           />
//           <Text style={styles.label}>
//             Do you want to display this Book in library?
//           </Text>
//         </View>
//       ),
//     },
//   ];

//   const handleFieldChange = (field, value) => {
//     setFormValues(prevFormValues => ({...prevFormValues, [field]: value}));
//   };

//   const handleSubmit = () => {};

//   return (
//     <KeyboardAvoidingView enabled behavior="padding" style={{flex: 1}}>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.headerText}>Library Form</Text>
//         </View>
//         <ScrollView style={{flex: 1}}>
//           <View style={styles.form}>
//             {formFields.map(({Comp, label, key, value, keyboardType}) =>
//               Comp ? (
//                 <Comp key={key} />
//               ) : (
//                 <View key={key} style={styles.formGroup}>
//                   <Text style={styles.label}>
//                     {label} <Text style={styles.req}>*</Text>{' '}
//                   </Text>
//                   <TextInput
//                     keyboardType={keyboardType}
//                     placeholder={label}
//                     style={styles.input}
//                     value={value}
//                     onChangeText={value => handleFieldChange(key, value)}
//                   />
//                 </View>
//               ),
//             )}
//           </View>
//         </ScrollView>
//         <Pressable
//           onPress={handleSubmit}
//           style={({pressed}) => [styles.submitBtn]}>
//           <Text style={styles.submitBtnText}>Submit</Text>
//         </Pressable>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 40,
//   },
//   header: {
//     backgroundColor: '#5DB3FF',
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerText: {
//     textTransform: 'capitalize',
//     color: '#800080',
//     fontWeight: '800',
//     fontSize: 25,
//   },
//   submitBtn: {
//     height: 50,
//     backgroundColor: '#90EE90',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   submitBtnText: {
//     textTransform: 'capitalize',
//     color: '#000',
//     fontWeight: '700',
//     fontSize: 20,
//   },
//   form: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//   },
//   formGroup: {
//     width: '90%',
//     marginVertical: 10,
//   },
//   checkboxContainer: {
//     width: '90%',
//     marginVertical: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkbox: {
//     marginRight: 10,
//   },
//   req: {
//     color: 'red',
//   },
//   label: {
//     fontWeight: '700',
//     marginVertical: 10,
//   },
//   input: {
//     padding: 10,
//     borderColor: '#000',
//     fontSize: 15,
//     borderWidth: 2,
//     height: 40,
//   },
//   dropdownBtnStyle: {
//     width: '100%',
//     height: 40,
//     padding: 10,
//     backgroundColor: '#FFF',
//     borderWidth: 2,
//     borderColor: '#000',
//   },
//   dropdownBtnTxtStyle: {color: '#444', textAlign: 'left', fontSize: 15},
//   dropdownRowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
//   dropdownRowTxtStyle: {color: '#444', textAlign: 'left'},
// });

// export default BookForm;
