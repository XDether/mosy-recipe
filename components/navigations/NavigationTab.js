import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../pages/HomeScreen";
import RecipesOverview from "../pages/RecipesOverview";
import CategoryScreen from "../pages/CategoryScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from "../constants/colors";

export default function NavigationTab()
{
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle:{
            backgroundColor: color.primary,
            borderRadius: 100,
            marginHorizontal:50,
            marginBottom: 10,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Recipes') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }else if (route.name === 'Categorys') {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: color.textPrimary,
          tabBarInactiveTintColor: color.iconPrimary,
        })}
      >

      <Tab.Screen name = "Home" component={HomeScreen}/>
      <Tab.Screen name = "Recipes" component={RecipesOverview}/>
      <Tab.Screen name = "Categorys" component={CategoryScreen}/>
    </Tab.Navigator>
  )
}