/**
 * @format
 */

import {AppRegistry} from 'react-native';
import './src/services/global';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
