import React from "react";
import { Button, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function ImageBackgroundComp({styles}){
    return (
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
    )
}