import React from "react";
import { Text, View, } from "react-native";
import { FlatList } from "react-native";

export default function Steps({text}){
    console.log(text)
    return (
    <View>
        <Text style={{fontSize: 20, fontWeight:"bold",marginBottom: 10}}>Zubereitung</Text>
        <FlatList data = {text}
            renderItem={({item}) => <Text>{item.instruction}</Text>}
        />
    </View>
    )
}