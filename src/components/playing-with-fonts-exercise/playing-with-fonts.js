// import React from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   Image,
// } from 'react-native';
// import IconAntDesign from 'react-native-vector-icons/AntDesign';
// import CustomIcon from './custom-icon';

// const icons = [
//   {text: '1. Caret up', name: 'caretup', customIcon: false},
//   {text: '2. Caret down', name: 'caretdown', customIcon: false},
//   {text: '3. Pencil', name: 'pencil', customIcon: true},
//   {text: '4. History', name: 'history', customIcon: true},
// ];

// const Header = () => {
//   return (
//     <View style={styles.header}>
//       <Text style={styles.headerText}>React Native Fonts</Text>
//     </View>
//   );
// };

// const IconsList = () => {
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {color: 'green', textTransform: 'uppercase'},
//         ]}>
//         Icons
//       </Text>
//       <View>
//         {icons.map(({text, name, customIcon}) => (
//           <View key={text} style={styles.iconRow}>
//             <Text style={styles.sectionDescription}>{text}</Text>
//             {customIcon ? (
//               <CustomIcon name={name} />
//             ) : (
//               <IconAntDesign name={name} />
//             )}
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };

// const Section = ({children, title}) => {
//   return (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionTitle}>{title}</Text>
//       <Text style={styles.sectionDescription}>{children}</Text>
//     </View>
//   );
// };

// const PlayingWithFonts = () => {
//   return (
//     <SafeAreaView>
//       <ScrollView contentInsetAdjustmentBehavior="automatic">
//         <Header />
//         <View>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             Press <Text style={styles.highlight}>Cmd + R</Text> in the simulator
//             to reload your app's code.
//           </Section>
//           <Section title="Debug">
//             Press <Text style={styles.highlight}>Cmd + D</Text> in the simulator
//             or Shake your device to open the React Native debug menu.
//           </Section>
//         </View>
//         <IconsList />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     height: 50,
//     backgroundColor: 'yellow',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerText: {
//     textTransform: 'capitalize',
//     color: 'brown',
//     fontSize: 28,
//     fontWeight: '600',
//     fontFamily: 'GochiHand-Regular',
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontFamily: 'GochiHand-Regular',
//     fontSize: 24,
//     fontWeight: '600',
//     color: 'blue',
//   },
//   iconRow: {
//     flexDirection: 'row',
//     width: '80%',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   sectionDescription: {
//     fontFamily: 'GochiHand-Regular',
//     marginTop: 8,
//     fontSize: 18,
//   },
//   highlight: {
//     fontWeight: '700',
//     color: 'red',
//   },
// });

// export default PlayingWithFonts;
