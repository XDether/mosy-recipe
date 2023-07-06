import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Tile from "../HomePage/Tile";
import colors from "../constants/colors";
import storage from "../helpers/Storage";

export default function HomeScreen({navigation}) {

  [fullReci, setFullReci] = useState([{id:0}]);
  [reci, setReci] = useState({id:0});
  
  async function Update() {
    const data = await storage.getData();
    setFullReci(data);
  }
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Update();
    });
    return unsubscribe;
  }, []);

  const handleButtonPress = () => {
    if(fullReci[0]){
      const index = Math.floor(Math.random() * fullReci.length);
      const nextRecipe = fullReci[index];
      setReci(nextRecipe);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.tileContainer}>
        <Tile 
          id={reci.id} 
          title={reci.title} 
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
