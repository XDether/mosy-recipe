import React, { useState } from "react";
import { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import storage from "../helpers/Storage";
import styles from '../styles/RecipePageStyles'
import ImageBackgroundComp from "../RecipePage/imageBackgroundComp";
import Iconbar from "../RecipePage/Iconbar";
import Category from "../RecipePage/Category";
import IngredientList from "../RecipePage/ingredientList/IngredientList";
import Steps from "../RecipePage/Steps";

export default function RecipePage(props,{navigation}){
    [data,setData] = useState([]);
    const [mode, setMode] = useState("ingredients");
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
              });
            }
          }
        }
        
        UpdateRecipe()
    }, []);    
    return (
    <View style={{display:"flex"}}>
        <ImageBackgroundComp styles={styles} onID ={onID}/>
        <View style={styles.textContainer}>
          <View style={styles.textRow}>
              <TouchableOpacity onPress={() => changeMode("ingredients")}>
                <Text style={styles.textSize}>Zutaten</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeMode("steps")}>
                <Text style={styles.textSize}>Zubereitung</Text>
              </TouchableOpacity>
          </View>
          <Iconbar portions={data.portions} time={data.time}/>
          <Category name = {data.categoryID}/>
          {mode === "ingredients"? <IngredientList ingredients={data.ingredients}/>:<Steps text={data.instructions}/>}
        </View>
    </View>)
}