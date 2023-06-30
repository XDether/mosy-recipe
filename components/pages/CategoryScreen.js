import React, {useEffect, useState} from "react";
import { Text } from "react-native";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";
import Storage from "../helpers/Storage";

export default function CategoryScreen({navigation}){
    [category, setCategory] = useState([
        {
            categoryID: "Fleisch",
        },
        {
            categoryID: "Fisch",
        },
    ]);

    const UpdateRecipe = async()=>
    {
      const data = await Storage.getData();
      if(data != null){
        const unique = [];
        for (const item of data) {
          const isDuplicate = unique.find((obj) => obj.categoryID === item.categoryID);
          if (!isDuplicate) {
            unique.push(item);
          }
        }
        //console.log(unique)
        setCategory(unique)
      }
    }

    useEffect(()=>{
      UpdateRecipe()
    },[navigation])

    function CategoryTile({name}) {
      return (
      <TouchableOpacity onPress={()=>{navigation.navigate("Recipes",{categoryID: name})}} >
        <Text style={{fontSize:16, backgroundColor:colors.accent, borderRadius: 50, paddingHorizontal: 10}}>
            {name}
        </Text>
      </TouchableOpacity>)
    }

    return (
        <SafeAreaView>
          <FlatList 
            numColumns={3}
            data = {category}
            renderItem={({item}) => <CategoryTile name = {item.categoryID}/>}
            columnWrapperStyle={{
              justifyContent: "space-between",
              margin: (Dimensions.get("window").width * 0.3) / 4
            }}
          />

        </SafeAreaView>
    )
} 