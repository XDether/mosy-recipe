import React from "react";
import { Text, View} from "react-native";

export default function Entry({amount,unit,ingredient}){
    return (
    <View style ={{display: "flex", flexDirection:"row", flexWrap: "wrap", justifyContent:"space-between",marginVertical: 5, paddingHorizontal: 10}}>
        <Text style={{fontSize: 16,}}>{amount + " " +  unit}</Text>
        <Text style={{fontSize: 16, width: 150}}>{ingredient}</Text>
    </View>)
}