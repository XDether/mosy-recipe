import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

export default function AddRecipeOverview({navigation, setTempRecipe}){

  const [link, setLink] = useState("");

  const handleCheffkoch = () => {

    setTempRecipe({
      link: link
    });
    
    navigation.navigate('AddRecipeEditMode')

  }

  const handleNewRecipe = () => {
    navigation.navigate('AddRecipeEditMode')
  }

  return(
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Button
      title="Create New Recipe"
      onPress={handleNewRecipe}
    />

    <Text> Or </Text>
    
    <Button
      title="Import From Cheffkoch"
      onPress={(handleCheffkoch)}
    />

    <TextInput
      onChangeText={text => setLink(text)}
      value={link}
    />
  </View>)
}