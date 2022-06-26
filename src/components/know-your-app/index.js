import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  getVersion,
  getBuildNumber,
  getApplicationName,
  getDeviceType,
  getSerialNumber,
} from 'react-native-device-info';
import globalStyles from '../../assets/styles/global-styles';

const Index = () => {
  const [serialNo, setSerialNo] = useState('');

  useEffect(() => {
    getSerialNumber().then(res => {
      setSerialNo(res);
    });
  }, []);

  const info = [
    {label: 'Version Number', func: getVersion},
    {label: 'Build Number', func: getBuildNumber},
    {label: 'Application Name', func: getApplicationName},
    {label: 'Device Type', func: getDeviceType},
    {label: 'Serial Number', value: serialNo},
  ];

  return (
    <SafeAreaView styles={globalStyles.container}>
      <View>
        <Text style={styles.heading}>Device Info</Text>
      </View>
      <View>
        {info.map(({label, func, value}) => (
          <View key={label} style={styles.item}>
            <Text style={styles.itemText}>{label}</Text>
            <Text>:</Text>
            <Text style={styles.itemText}>{func ? func() : value}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  itemText: {
    flexBasis: '45%',
    textAlign: 'center',
  },
});
