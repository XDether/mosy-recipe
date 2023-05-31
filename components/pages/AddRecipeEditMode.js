import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function AddRecipeEditMode({
  tempRecipe = null,
  setTempRecipe,
}) {
  const [mode, setMode] = useState("ingredients");

  const changeMode = (newMode) => {
    setMode(newMode);
  };
  if (tempRecipe !== null) {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Text style={{ fontSize: 20 }}>{tempRecipe.recipeJSON.title}</Text>
        </View>

        <View>{/** picture here */}</View>

        <View>{/** Navbar here */}</View>

        <View>{/** Iconlist here */}</View>

        <View>
          <Text>Kategorie</Text>
          <TextInput />
          <Button title="Edit" />
        </View>

        <View style={{ flex: 1 }}>
          <Text>Zutaten</Text>
          <SafeAreaView style={{ padding: 10 }}>
            <ScrollView style={{}} contentContainerStyle={{ marginBottom: 5 }}>
              {tempRecipe.recipeJSON.ingredients.map((ingredient, index) => {
                return (
                  <View style={{ height: 100 }} key={index}>
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
          <Button title="Delete" />
          <Text>Edit Mode</Text>
          <Button title="Confirm" />
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={styles.imageContainer}>
          <ImageBackground
            style={styles.image}
            resizeMode="cover"
            source={require("../../assets/black_image.jpg")}
          >
            <View style={styles.textOnImage}>
              <Text style={styles.imageText}>------</Text>
              <TouchableOpacity>
                <Ionicons name="pencil" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.textContainer}>
          <View style={styles.textRow}>
            <TouchableOpacity onPress={() => changeMode("ingredients")}>
              <Text style={styles.textSize}>Zutaten</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeMode("steps")}>
              <Text style={styles.textSize}>Zubereitung</Text>
            </TouchableOpacity>
          </View>
          {mode === "ingredients" ? (
            <View>
              <View style={styles.iconContainer}>
                <View style={{ padding: 5 }}>
                  <Ionicons name="people-outline" size={30} color="black" />
                  <Text>Portionen</Text>
                </View>
                <View style={{ padding: 5 }}>
                  <Ionicons name="time-outline" size={30} color="black" />
                  <Text>Zeit</Text>
                </View>
                <View style={{ padding: 5 }}>
                  <Ionicons name="heart-outline" size={30} color="black" />
                </View>
              </View>
              {/* Kategorie View */}
              <View style={styles.categorieContainer}>
                <Text style={styles.textSize}>Kategorie:</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    backgroundColor: "lightpink",
                    borderColor: "red",
                    fontSize: 15,
                    padding: 5,
                  }}
                  placeholder="Kategorie"
                />
                <TouchableOpacity style={{ padding: 10 }}>
                  <Ionicons name="pencil" size={30} color="black" />
                </TouchableOpacity>
              </View>
              {/* Zutaten View */}
              <View style={styles.ingredientsContainer}>
                <Text style={styles.textSize}>Zutaten</Text>
                <SafeAreaView style={{ padding: 10 }}>
                  <ScrollView>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity>
                        <Ionicons name="pencil" size={25} color="black" />
                      </TouchableOpacity>
                      <TextInput
                        style={styles.textSize}
                        placeholder="Zutat hinzufügen"
                      />
                    </View>
                  </ScrollView>
                </SafeAreaView>
              </View>
            </View>
          ) : (
            <View style={{paddingTop: 30, paddingLeft: 10}}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity>
                  <Ionicons name="pencil" size={25} color="black" />
                </TouchableOpacity>
                <TextInput
                  style={styles.textSize}
                  placeholder="Zutat hinzufügen"
                />
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 3,
    justifyContent: "flex-end",
  },
  imageContainer: {
    flex: 1,
    paddingBottom: 50,
  },
  imageText: {
    color: "white",
    fontSize: 30,
  },
  textOnImage: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textContainer: {
    flex: 2,
    flexDirection: "column",
  },
  iconContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  categorieContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  ingredientsContainer: {
    padding: 20,
  },
  textSize: {
    fontSize: 20,
  },
});
