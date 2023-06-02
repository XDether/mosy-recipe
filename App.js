//import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MainNavigation from './components/navigations/MainNavigation';
import Storage from './components/helpers/Storage';


export default function App() {
  return( 
    <MainNavigation storage={Storage}/>
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