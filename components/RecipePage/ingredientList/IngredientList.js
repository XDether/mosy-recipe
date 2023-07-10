import React from "react";
import { FlatList } from "react-native";
import Entry from "./Entry";

export default function IngredientList({ingredients}){

    return (
        <FlatList data = {ingredients}
            renderItem={({item}) => <Entry amount={item.amount} unit={item.unit} ingredient={item.ingredient}></Entry>}
        />
    )
}