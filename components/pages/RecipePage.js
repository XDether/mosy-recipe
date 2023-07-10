import React, { useState } from "react";
import { useEffect } from "react";
import { Text, View, TouchableOpacity, Button, SafeAreaView } from "react-native";
import storage from "../helpers/Storage";
import ImageBackgroundComp from "../RecipePage/imageBackgroundComp";
import Iconbar from "../RecipePage/Iconbar";
import Category from "../RecipePage/Category";
import IngredientList from "../RecipePage/ingredientList/IngredientList";
import Steps from "../RecipePage/Steps";
import colors from "../constants/colors";

export default function RecipePage(props){
    [data,setData] = useState([]);
    [mode, setMode] = useState("ingredients");
    [onID, setOnID] = useState("3");

    const changeMode = (newMode) => {
      setMode(newMode);
    };

    useEffect(() => {
        const UpdateRecipe = async()=>
        {
          if(props != null){
            const data = await storage.getDataWithId(props.route.params.id);
            if(data != null){
              setData(data);
              setOnID(props.route.params.id);
              props.navigation.setOptions({
                title: data.title === '' ? 'No title' : data.title,
                headerRight: () => (
                  <Button style={{}} title="Edit" onPress={() =>  {props.navigation.navigate('AddRecipeEditMode', {editingRecipe : data})}}/>
                )
              });
            }
          }
        }
        UpdateRecipe()
    }, []);    
    return (
    <SafeAreaView style={{flex : 1, paddingHorizontal: 12}}>
      <ImageBackgroundComp onID ={onID} src={data.image} description={data.description}/>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", gap: 30}}>
            <TouchableOpacity onPress={() => changeMode("ingredients")} style={{ backgroundColor: mode === "ingredients" ? colors.primary:colors.background, borderRadius:50, paddingHorizontal:15, paddingVertical: 5}}>
              <Text style={{ fontSize: 20,}}>Zutaten</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeMode("steps")} style={{ backgroundColor: mode === "steps" ? colors.primary:colors.background, borderRadius:50, paddingHorizontal:15, paddingVertical: 5}}>
              <Text style={{ fontSize: 20,}}>Zubereitung</Text>
            </TouchableOpacity>
        </View>
        
        
        {mode === "ingredients" ? <Iconbar portions={data.portions} time={data.time}/> : null}
        {mode === "ingredients" ? <Category name = {data.categoryID}/> : null}
        <View style={{backgroundColor:"black", height: 1, marginVertical:10 }}/>

        {mode === "ingredients" ? <IngredientList ingredients={data.ingredients}/>:<Steps text={data.instructions}/>}
    </SafeAreaView>)
}