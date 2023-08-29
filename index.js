/**
 * @format
 */
 import { View, Text, BackHandler, TouchableOpacity, Image, StyleSheet, PermissionsAndroid, ActivityIndicator,StatusBar,TouchableWithoutFeedback, Alert,Dimensions } from 'react-native';

import {AppRegistry} from 'react-native';
import App from './components/App';
import {name as appName} from './app.json';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcon.loadFont(); 
// const App =()=>{
//     return(
// <Text>Test</Text>
//     )
// }

AppRegistry.registerComponent(appName, () => App);
