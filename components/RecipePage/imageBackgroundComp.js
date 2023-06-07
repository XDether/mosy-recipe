import React from "react";
import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import Ionicon from "@expo/vector-icons/Ionicons";

export default function ImageBackgroundComp({styles}){
    return (
    <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.image}
          resizeMode="cover"
          source={require("../../assets/black_image.jpg")}
        >
          <TouchableOpacity style = {{position:"absolute", top:10, right: 10}}>
              <Ionicon name="trash" color="white" size={24}></Ionicon>
          </TouchableOpacity>
        
          <View style={styles.textOnImage}>
            <Text style={styles.imageText}>------</Text>
          </View>
        </ImageBackground>
      </View>
    )
}