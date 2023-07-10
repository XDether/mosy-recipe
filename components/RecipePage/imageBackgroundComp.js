import React from "react";
import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import Ionicon from "@expo/vector-icons/Ionicons";
import storage from "../helpers/Storage";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
export default function ImageBackgroundComp({ onID, src,}){
    const navigation = useNavigation()
    return (
      <View  style={{maxHeight: 135, height: 135, marginBottom: 15, alignSelf: "center", width: Dimensions.get("window").width }} >
        <ImageBackground
          style={{ height: 135 }}
          resizeMode="cover"
          source={{uri:src ? src:null}}
        >
          <TouchableOpacity style = {{position:"absolute", top:10, right: 10}} onPress={async()=>{
            await storage.removeData(onID)
            navigation.navigate("Recipes")
           }}>
              <Ionicon name="trash" color="white" size={24}></Ionicon>
          </TouchableOpacity>
        
          <View style={{}}>
            <Text style={{}}>"nice"</Text>
          </View>
        </ImageBackground>
      </View>
    )
}