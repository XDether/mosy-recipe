import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Tile from "../recipesOverview/Tile";
import colors from "../constants/colors";
export default function HomeScreen({dataSet}) {
  [recipe, setRecipe] = useState([
    {
      id: "1",
      description: "This is recipe 1",
    },
    {
      id: "2",
      description: "This is recipe 2",
    },
    {
      id: "3",  
      description: "This is recipe 3",
    },
  ]);
  const [randomId, setRandomId] = useState();
  const [shuffledArray, setShuffledArray] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (dataSet != null) {
      setRecipe(data);
    }

    const length = recipe.length;
    setShuffledArray(
      Array.from({ length }, (_, index) => index + 1).sort(
        () => Math.random() - 0.5
      )
    );
  }, [dataSet]);

  const handleButtonPress = () => {
    const index = shuffledArray[counter] - 1;
    setRandomId(recipe[index].id);
    setCounter((prev) => {
      const next = (prev + 1) % recipe.length;

      return next;
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.tileContainer}>{<Tile id={randomId}></Tile>}</View>

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
