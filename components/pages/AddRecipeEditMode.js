import React from "react";
import { View,Text,TextInput, Button } from "react-native";

export default function AddRecipeEditMode({tempRecipe, setTempRecipe}){
  return(
  <View>

    <View>
      <Text>{tempRecipe.link}</Text>
    </View>

    <View>{/** picture here */}</View>

    <View>{/** Navbar here */}</View>

    <View>{/** Iconlist here */}</View>

    <View>
      <Text>Kategorie</Text>
      <TextInput/>
      <Button title="Edit"/>
    </View>

    <View>
      <Text>Zutaten</Text>
      {/** Recipe List here*/}
    </View>

    <View>
      <Button title="Delete"/>
      <Text>Edit Mode</Text>
      <Button title="Confirm"/>
    </View>

  </View>)
}