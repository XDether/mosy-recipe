import React, { useState } from "react";
import { useEffect } from "react";
import { Text, View } from "react-native";
import storage from "../helpers/Storage";

export default function RecipePage(){
    
    [data,setData] = useState([])

    useEffect(() => {
        const updateData = async() =>
        {
            setData(await storage.getData());
        }
        updateData()
    }, []);

    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Recipe Page</Text>
    </View>)
}