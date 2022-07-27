import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {container, fs20} from '../../../assets/styles/global.js';

import navigationRoutes from '../../../constants/navigation-routes';
import {
  flashOff,
  flashOn,
  camera,
  loop,
} from '../../../constants/font-codes.js';

import {GoBack, Navigate} from '../../../helpers/routes.js';
import {IconIcomoon} from '../../shared/custom-icons.js';

const {CREATE_BOOK, BOOK_LOCATION} = navigationRoutes;

const {
  FlashMode: {on: flashModeOn, off: flashModeOff},
  Type: {back: backCamera, front: frontCamera},
} = RNCamera.Constants;

const {isIOS, emptyArr, emptyObj} = global;

const cameraOptions = {quality: 0.5, base64: true};

const androidCameraPermissionOptions = {
  title: 'Permission to use camera',
  message: 'We need your permission to use your camera',
  buttonPositive: 'Ok',
  buttonNegative: 'Cancel',
};

const CapturePhoto = ({navigation, route}) => {
  const [cameraAccess, setCameraAccess] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isCameraTypeBack, setIsCameraTypeBack] = useState(true);

  const cameraRef = useRef(null);

  const {isScan} = route.params || emptyObj;

  const {preview, btnContainer, capture} = styles;

  useEffect(() => {
    isScan &&
      navigation.setOptions({
        title: 'Scanner',
      });
    request(isIOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then(
      result => {
        if (result == RESULTS.GRANTED) setCameraAccess(true);
        else {
          Alert.alert('Requires camera access');
          GoBack(navigation);
        }
      },
    );
  }, emptyArr);

  const takePicture = async () => {
    if (cameraRef) {
      const data = await cameraRef.current.takePictureAsync(cameraOptions);
      Navigate(navigation, CREATE_BOOK, {imageUri: data.uri});
    }
  };

  const toggleCamera = () => {
    setIsCameraTypeBack(prevState => !prevState);
  };

  const toggleFlash = () => {
    setIsFlashOn(prevState => !prevState);
  };

  const onBarCodeRead = e => {
    Alert.alert('Barcode value is' + e.data, 'Barcode type is' + e.type);
    Navigate(navigation, BOOK_LOCATION, {...JSON.parse(e.data)});
  };

  const renderScanner = () => (
    <View style={container}>
      {cameraAccess && (
        <QRCodeScanner
          reactivate={true}
          showMarker={true}
          onRead={onBarCodeRead}
        />
      )}
    </View>
  );

  const renderCamera = () => {
    const flashContent = isFlashOn ? flashOn : flashOff;
    const flashMode = isFlashOn ? flashModeOn : flashModeOff;
    const cameraType = isCameraTypeBack ? backCamera : frontCamera;
    return (
      <View style={container}>
        {cameraAccess && (
          <>
            <RNCamera
              ref={cameraRef}
              style={preview}
              type={cameraType}
              flashMode={flashMode}
              androidCameraPermissionOptions={androidCameraPermissionOptions}
              captureAudio={false}
            />
            <View style={btnContainer}>
              <TouchableOpacity onPress={toggleCamera} style={capture}>
                <IconIcomoon customStyle={fs20} content={loop} />
              </TouchableOpacity>
              <TouchableOpacity onPress={takePicture} style={capture}>
                <IconIcomoon customStyle={fs20} content={camera} />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleFlash} style={capture}>
                <IconIcomoon customStyle={fs20} content={flashContent} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

  return isScan ? renderScanner() : renderCamera();
};

const styles = StyleSheet.create({
  btnContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default CapturePhoto;
