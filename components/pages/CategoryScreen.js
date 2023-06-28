import React, {useState} from "react";
import { Text, View, FlatList, StyleSheet,  Dimensions, } from "react-native";

import Tile from "../recipesOverview/Tile";
import storage from "../helpers/Storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryScreen(props){
    [category, setCategory] = useState([
        {
            id: "Fleisch",
            description: "Fleisch",
        },
        {
            id: "Fisch",
            description: "Fisch",
        },
    ]);


    const gridFormat = (categoryArray, colums) => {
        if (categoryArray.length % 2 !== 0) {
            categoryArray.push({ ...categoryArray[0], invisible: true });
        }
        return categoryArray;
      };



      
    return (
        <SafeAreaView style={style.container}>
            <FlatList
                data={gridFormat(category, 2)}
                horizontal={false}
                numColumns={2}
                renderItem={({ item }) => <Tile {...item} navigation={props.navigation} isCategory={true}/>}
                keyExtractor={(item) => item.id}
                style={style.column}
                columnWrapperStyle={style.columnWrapperStyle}
            />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgb(245, 196, 249)",
    },
    column: {
      flex: 1,
    },
    invisible: {
      backgroundColor: "transparent",
    },
    columnWrapperStyle: {
      marginVertical: (Dimensions.get("window").width * 0.1) / 4,
      flex: 1,
      justifyContent: "space-around",
      height: Dimensions.get("window").width / 2,
    },
  });
  