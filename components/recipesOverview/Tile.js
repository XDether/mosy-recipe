import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { images } from "../constants/images";
import colors from "../constants/colors";
export default function Tile({ id, description, invisible, navigation }) {
  const onPressHandler = () => {
    console.log("navigate somewhere");
  };
  if (!invisible) {
    return (
      <TouchableOpacity onPress={onPressHandler}>
        <View style={styles.container}>
          {id ? (
            <Image source={images[id]} style={styles.image} />
          ) : (
            <View style={styles.placeholder}></View>
          )}
          <View style={styles.textbox}>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else return <View style={[styles.container, styles.invisible]} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: colors.primary,
    borderRadius: 15,
    flexDirection: "column",
    aspectRatio: 0.9,
  },
  image: {
    height: "70%",
    width: "90%",
    borderRadius: 5,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "black",
  },
  placeholder: {
    backgroundColor: "white",
    aspectRatio: 1,
    width: "90%",
  },
  textbox: {
    height: "20%",
  },
  invisible: {
    backgroundColor: "transparent",
  },
});
