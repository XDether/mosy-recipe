import React from "react";
import { Text, View, ImageBackground, TouchableOpacity,FlatList } from "react-native";
import Entry from "./Entry";

export default function IngredientList({ingredients}){

    return (
    <View>
        <Text style={{fontSize: 20, fontWeight:"bold",marginBottom: 10}}>Zutaten</Text>
        <FlatList data = {ingredients}
        renderItem={({item}) => <Entry amount={item.amount} unit={item.unit} ingredient={item.ingredient}></Entry>}
        />
    </View>
    )
}