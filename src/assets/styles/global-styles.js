import {StyleSheet, StatusBar} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 45,
    marginBottom: 20,
  },
});

export default globalStyles;
