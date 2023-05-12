//import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddRecipeOverview from './components/pages/AddRecipeOverview';
import AddRecipeEditMode from './components/pages/AddRecipeEditMode';



const Stack = createNativeStackNavigator();

export default function App() {

  const [tempRecipe, setTempRecipe] = useState({link:""})

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MainPage'>

          <Stack.Screen name="AddRecipeOverview">
            {(props) => <AddRecipeOverview {...props} setTempRecipe={ setTempRecipe } />}
          </Stack.Screen>

          <Stack.Screen name="AddRecipeEditMode">
            {(props) => <AddRecipeEditMode {...props} tempRecipe={tempRecipe} setTempRecipe = {setTempRecipe} />}
          </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
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