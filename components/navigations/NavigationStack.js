import React, { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddRecipeOverview from "../pages/AddRecipeOverview";
import AddRecipeEditMode from "../pages/AddRecipeEditMode";
import NavigationTab from  "../navigations/NavigationTab";


export default function NavigationStack ()
{
  
  const [tempRecipe, setTempRecipe] = useState({link:""})
  const Stack = createNativeStackNavigator();

  return(
    <Stack.Navigator initialRouteName='EditPages'>

        <Stack.Screen name = "TabScreen" options={{headerShown : false}}>
          {(props) => <NavigationTab {...props} setTempRecipe={ setTempRecipe } />}
        </Stack.Screen>

        <Stack.Screen name="AddRecipeOverview">
          {(props) => <AddRecipeOverview {...props} setTempRecipe={ setTempRecipe } />}
        </Stack.Screen>

        <Stack.Screen name="AddRecipeEditMode">
          {(props) => <AddRecipeEditMode {...props} tempRecipe={tempRecipe} setTempRecipe = {setTempRecipe} />}
        </Stack.Screen>

    </Stack.Navigator>)
}