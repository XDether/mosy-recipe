import React from "react";
import { Text, View, } from "react-native";
import { FlatList } from "react-native";

export default function Steps({text}){
    return (
    <View>
        {/*<Text style={{fontSize: 20, fontWeight:"bold",marginBottom: 10}}>Zubereitung</Text>*/}
        <FlatList data = {text}
            renderItem={({item}) => { return <Text style={{fontSize:16, fontWeight:600}}>{item}</Text>}}
        />
    </View>
    )
}