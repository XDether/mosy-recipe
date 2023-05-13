import React from "react";
import { View,Text,TextInput, Button, SafeAreaView, ScrollView } from "react-native";

export default function AddRecipeEditMode({tempRecipe, setTempRecipe}){
  return(
  <View style={{flex: 1}}>

    <View>
      <Text style={{fontSize: 20}}>{tempRecipe.recipeJSON.title}</Text>
    </View>

    <View>{/** picture here */}</View>

    <View>{/** Navbar here */}</View>

    <View>{/** Iconlist here */}</View>

    <View>
      <Text>Kategorie</Text>
      <TextInput/>
      <Button title="Edit"/>
    </View>

    <View style={{flex: 1}}>
      <Text>Zutaten</Text>
      <SafeAreaView style={{padding: 10}}>
          <ScrollView style={{}} contentContainerStyle={{marginBottom: 5}}>
            {tempRecipe.recipeJSON.ingredients.map((ingredient, index) => {
              return (
                <View style={{height: 100}} key={index}>
                  <Text>
                    {ingredient.amount} {ingredient.unit}{" "}
                    {ingredient.ingredient}
                  </Text>
                  <Button title="Edit" />
                  <Button title="Delete" />
                </View>
              );
            })}
          </ScrollView>
        </SafeAreaView>
    </View>

    <View>
      <Button title="Delete"/>
      <Text>Edit Mode</Text>
      <Button title="Confirm"/>
    </View>

  </View>)
}