import React, {useEffect, useState} from "react";
import { Text } from "react-native";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";

export default function CategoryScreen({navigation, dataSet}){
  [category, setCategory] = useState([]);
  useEffect(()=>{
    if(dataSet != null){
      const unique = [];
      for (const item of dataSet) {
        const isDuplicate = unique.find((obj) => obj.categoryID === item.categoryID);
        if (!isDuplicate) {
          unique.push(item);
        }
      }
      setCategory(unique)
    }
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