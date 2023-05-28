import React from "react";
import { Button, Text, View } from "react-native";

export default function HomeScreen({navigation}){
    
    function handleAdd()
    {
        navigation.navigate("AddRecipeOverview")
    }

    return (
    <View>
        <Button title="Create New Recipe" onPress={ handleAdd } />
    </View>)
}