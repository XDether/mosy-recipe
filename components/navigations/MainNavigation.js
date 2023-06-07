import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AddRecipeOverview from "../pages/AddRecipeOverview";
import AddRecipeEditMode from "../pages/AddRecipeEditMode";
import TabNavigation from  "./TabNavigation";
import RecipePage from "../pages/RecipePage";
import Recipe from "../models/Recipe";
import storage from "../helpers/Storage";

export default function MainNavigation ()
{
  const [tempRecipe, setTempRecipe] = useState({link:""})
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const createTestData = async ()=>
    {
      await storage.createData([new Recipe('1','Food','Beef',
      [
        {amount:'3',ingredient:'beef'},
        {amount:'3',ingredient:'Salt'}
      ]
      ,'Just Put that salt on da beef','a beefy recipe',"3hrs","3port")])
    }
    createTestData();
  }, []);

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='EditPages'>

          <Stack.Screen name = "TabScreen" options={{headerShown : false}}>
            {(props) => <TabNavigation {...props}/>}
          </Stack.Screen>

          <Stack.Screen name="AddRecipeOverview">
            {(props) => <AddRecipeOverview {...props} setTempRecipe={ setTempRecipe } />}
          </Stack.Screen>

          <Stack.Screen name="AddRecipeEditMode">
            {(props) => <AddRecipeEditMode {...props} tempRecipe={tempRecipe} setTempRecipe = {setTempRecipe} />}
          </Stack.Screen>

          <Stack.Screen name="RecipePage">
            {(props) => <RecipePage {...props}/>}
          </Stack.Screen>
          
      </Stack.Navigator>
    </NavigationContainer>)
}