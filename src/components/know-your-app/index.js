import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {
  getVersion,
  getBuildNumber,
  getApplicationName,
  getDeviceType,
  getSerialNumber,
} from 'react-native-device-info';

import {container} from '../../assets/styles/global';

const {emptyArr} = global;

const deviceInfo = [
  {label: 'Version Number', getInfo: getVersion},
  {label: 'Build Number', getInfo: getBuildNumber},
  {label: 'Application Name', getInfo: getApplicationName},
  {label: 'Device Type', getInfo: getDeviceType},
];

const Index = () => {
  const [serialNo, setSerialNo] = useState('');

  useEffect(() => {
    getSerialNumber().then(setSerialNo);
  }, emptyArr);

  const {heading, item, itemText} = styles;

  return (
    <SafeAreaView styles={container}>
      <View>
        <Text style={heading}>Device Info</Text>
      </View>
      <View>
        {deviceInfo.map(({label, getInfo}) => (
          <View key={label} style={item}>
            <Text style={itemText}>{label}</Text>
            <Text>:</Text>
            <Text style={itemText}>{getInfo()}</Text>
          </View>
        ))}
        <View style={item}>
          <Text style={itemText}>Serial Number</Text>
          <Text>:</Text>
          <Text style={itemText}>{serialNo}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

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

export default Index;
