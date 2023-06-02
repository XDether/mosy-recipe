import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";

import colors from "../constants/colors";
import Tile from "../recipesOverview/Tile";
import storage from "../helpers/Storage";

export default function RecipesOverview({navigation}) {
  [recipe, setRecipe] = useState([
    {
      id: "1",
      description: "This is recipe 1",
    },
    {
      id: "2",
      description: "This is recipe 2",
    },
    {
      id: "3",
      description: "This is recipe 3",
    },
  ]);
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

  const gridFormat = (recipeArray, colums) => {
    if (recipeArray.length % 2 !== 0) {
      recipeArray.push({ ...recipeArray[0], invisible: true });
    }
    return recipeArray;
  };


  return (
    <SafeAreaView style={style.container}>
      <FlatList
        data={gridFormat(recipe, 2)}
        horizontal={false}
        numColumns={2}
        renderItem={({ item }) => <Tile {...item} navigation={navigation}/>}
        keyExtractor={(item) => item.id}
        style={style.column}
        columnWrapperStyle={style.columnWrapperStyle}
      />
    </SafeAreaView>
  );
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
