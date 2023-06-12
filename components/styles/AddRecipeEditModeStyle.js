import { StyleSheet, Dimensions } from "react-native";
export default StyleSheet.create({
    image: {
      width: "100%",
      height: 10,
      justifyContent: "flex-end",
    },
    imageContainer: {
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
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    textContainer: {
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

