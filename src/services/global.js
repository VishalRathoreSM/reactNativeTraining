import {Platform} from 'react-native';

global.isIOS = Platform.OS == 'ios';

global.emptyObj = {};

global.emptyArr = [];

global.emptyFn = () => {};
