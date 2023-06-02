import React, { useState } from "react";
import { useEffect } from "react";
import { Text, View } from "react-native";
import storage from "../helpers/Storage";

export default function RecipePage(){
    
    [DataList,setDataList] = useState([])

    const nice = [<Text></Text>]


    useEffect(() => {
        const updateData = async() =>
        {

            const data = await storage.getData();
            const tmpArray = []

            for(let item of data)
            {
                tmpArray.push(<Text id={item.id}>{item.title}</Text>)
            }
            setDataList(tmpArray)
        }
        updateData()
    }, []);



    
    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {DataList}
    </View>)
}