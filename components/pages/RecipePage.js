import React, { useState } from "react";
import { useEffect } from "react";
import { Text, View } from "react-native";
import storage from "../helpers/Storage";

export default function RecipePage(){
    
    [data,setData] = useState([])

    useEffect(() => {
        const UpdateRecipe = async()=>
        {
          const data = await storage.getData();
          if(data != null){
            setRecipe(data);
          }
        }
        UpdateRecipe()
    }, []);

    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Recipe Page</Text>
    </View>)
}