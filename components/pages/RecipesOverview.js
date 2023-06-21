import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";

import Tile from "../recipesOverview/Tile";
import storage from "../helpers/Storage";
import colors from "../constants/colors";
import { TextInput } from "react-native";
import { View } from "react-native";

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

  [fullRecipe, setFullRecipe] = useState([
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

  const UpdateRecipe = async()=>
  {
    const data = await storage.getData();
    if(data != null){
        setRecipe(data);
        setFullRecipe(data);
    }
  }

  const [searchTerm, setSearchTerm] = useState("")

  //UpdateRecipe();
  useEffect(()=>{
    console.log(searchTerm)
    navigation.addListener("focus",()=>{
      UpdateRecipe()
      
    });
  },[navigation])

  const gridFormat = (recipeArray, colums) => {
    if (recipeArray.length % 2 !== 0) {
      recipeArray.push({ ...recipeArray[0], invisible: true });
    }
    return recipeArray;
  };

  const handleSearch = (value)=>
  {
    if(value === "" || value === null)
    {
      setRecipe(fullRecipe)
    }else{
      const tmpArray = new Array();
      for(let item of fullRecipe)
      {
        console.log(item.title)
        if(item.title === value){
          tmpArray.push(item)
        }
      }
      setRecipe(tmpArray)
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={{marginVertical: 10, marginHorizontal: (Dimensions.get("window").width * 0.1) / 4}}>
        <TextInput
          style={{ height: 40, borderColor: colors.accent, borderWidth: 2, borderRadius:100,overflow: "scroll", textAlign:"center" }}
          placeholder="Search"
          onChangeText={(value) =>{ handleSearch(value)} }
        />
      </View>
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
    backgroundColor: "rgb(245, 196, 249)",
  },
  column: {
  },
  invisible: {
    backgroundColor: "transparent",
  },
  columnWrapperStyle: {
    marginVertical: (Dimensions.get("window").width * 0.1) / 4,
    justifyContent: "space-around",
    height: Dimensions.get("window").width / 2,
  },
});
