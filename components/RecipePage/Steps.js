import React from "react";
import { Text, View, } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Steps({text}){
    return (
    <View>
        <Text style={{fontSize: 20, fontWeight:"bold",marginBottom: 10}}>Zubereitung</Text>
        <Text>{text}</Text>
    </View>
    )
}