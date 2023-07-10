import React from "react";
import { Text,} from "react-native";
import { FlatList } from "react-native";

export default function Steps({text}){
    return (

    <FlatList data = {text}
        renderItem={({item}) => { return <Text style={{fontSize:18, fontWeight:400, marginBottom: 20}}>{item}</Text>}}
    />

    )
}