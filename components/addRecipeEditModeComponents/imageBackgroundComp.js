import React from "react";
import { Button, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function ImageBackgroundComp({styles, imageSRC, recipeTitle}){

    return (
    <View>
        <ImageBackground
          resizeMode="cover"
          style={{height: 200}}
          source={{uri: imageSRC }}>
          <View style={{position: 'absolute', bottom: 0, flexDirection: 'row', alignItems: 'center', width: "100%",backgroundColor: 'rgba(211,211,211, 0.5)', justifyContent: 'space-between'}}>
            <Text>{recipeTitle}</Text>
            <TouchableOpacity>
              <Ionicons name="pencil" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    )
}