import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Alert,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {openSettings} from '../../../services/linking';
import {getDistance} from '../../../services/location';

const {
  PERMISSIONS: {ACCESS_FINE_LOCATION},
  RESULTS: {GRANTED, DENIED, NEVER_ASK_AGAIN},
  request: requestPermissionAndroid,
  check: checkPermissionAndroid,
} = PermissionsAndroid;

const {emptyObj, emptyArr, emptyFn, isIOS} = global;

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f9c2ff',
  },
  content: {
    marginVertical: 10,
    textAlign: 'center',
  },
  titleContainer: {
    marginVertical: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
};

const {container, content, row, title, titleContainer} = styles;

const BookLocation = ({route}) => {
  const [location, setLocation] = useState(null);

  const {data} = route.params || emptyObj;

  useEffect(() => {
    getLocation();
  }, emptyArr);

  const renderDistance = () =>
    getDistance(location.coords, {
      latitude: data.latitude,
      longitude: data.longitude,
    });

  const hasPermissionIOS = async () => {
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    } else if (status === 'denied') {
      Alert.alert('Location permission denied');
    } else if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow app to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSettings},
          {text: "Don't Use Location", onPress: emptyFn},
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (isIOS) {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.Version < 23) {
      return true;
    }

    const hasPermission = await checkPermissionAndroid(ACCESS_FINE_LOCATION);

    if (hasPermission) {
      return true;
    }

    const status = await requestPermissionAndroid(ACCESS_FINE_LOCATION);

    if (status === GRANTED) {
      return true;
    }

    if (status === DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        showLocationDialog: true,
      },
    );
  };

  const renderLocation = ({locationFound, latitude, longitude, name}) =>
    locationFound ? (
      <>
        <View style={titleContainer}>
          <Text style={title}>{name} Location</Text>
        </View>
        <View style={row}>
          <Text>Latitude : {latitude}</Text>
          <Text>Longitude : {longitude}</Text>
        </View>
      </>
    ) : (
      <View>
        <Text>{name} Location not found</Text>
      </View>
    );

  return (
    <SafeAreaView style={container}>
      {renderLocation({
        locationFound: !!location,
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
        name: 'Your',
      })}
      {renderLocation({
        locationFound: !!data,
        latitude: data?.latitude,
        longitude: data?.longitude,
        name: 'Book',
      })}
      {location && data && (
        <View>
          <Text style={content}>
            You are {renderDistance()} meters far from Book
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BookLocation;
