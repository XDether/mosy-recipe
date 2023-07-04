import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Tile from "../recipesOverview/Tile";
import colors from "../constants/colors";
import storage from "../helpers/Storage";

export default function HomeScreen({navigation}) {
  [fullRecipe, setFullRecipe] = useState();
  [recipe, setRecipe] = useState({id: 0, title: "Hellyeah", description: "Nice"});

  
  async function Update() {
    const data = await storage.getData();
    if (data != null) {
      setFullRecipe(data);
      setRecipe(data[0]);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Update();
    });
    return unsubscribe;
  }, []);

  const handleButtonPress = () => {
    const index = Math.floor(Math.random() * fullRecipe.length);
    setRecipe(fullRecipe[index]);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.tileContainer}>
        <Tile 
          id={recipe.id} 
          title={recipe.title} 
          description={recipe.description} 
          navigation={navigation}/>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Shuffle Recipes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tileContainer: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  recipeText: {
    fontSize: 16,
  },
});
