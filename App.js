//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import MainNavigation from './components/navigations/MainNavigation';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import colors from './components/constants/colors';
import CameraTest from './components/helpers/CameraTest';


export default function App() {
  return(
    <CameraTest/>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});