/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App1 from './src/index'
import {name as appName} from './app.json';
import Main from './src/Main'
import App from "./src/Route/Route"

AppRegistry.registerComponent(appName, () => App);
