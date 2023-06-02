import { StyleSheet, Dimensions } from "react-native";
export default StyleSheet.create({
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

