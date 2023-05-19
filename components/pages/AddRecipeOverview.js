import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import * as cheerio from "cheerio";

export default function AddRecipeOverview({ navigation, setTempRecipe }) {
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recipeJSON, setRecipeJSON] = useState({});
  
  const handleChefkoch = () => {
    getChefkochData(link, setIsLoading).then((recipeJSON) => {
      setRecipeJSON(recipeJSON);
      setTempRecipe({
        link: link,
        recipeJSON: recipeJSON,
      });
  
      navigation.navigate("AddRecipeEditMode");
    })

  };

  const handleNewRecipe = () => {
    navigation.navigate("AddRecipeEditMode");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Create New Recipe" onPress={handleNewRecipe} />

      <Text> Or </Text>

      <Button title="Import From Chefkoch" onPress={handleChefkoch} />

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <View>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            placeholder="insert Chefkoch Link"
            onChangeText={(text) => setLink(text)}
            value={link}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

function getChefkochData(link, setIsLoading) {
  return new Promise(async (resolve, reject) => {
    try{
      const searchURL = link;
      setIsLoading(true);
      const response = await fetch(searchURL);
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const mainJQuery = $("main");
      const recipeTitle = mainJQuery
        .find(
          "article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.recipe-header > div > h1"
        )
        .text();
      const ingredientsHeadline = mainJQuery
        .find(
          "main > article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.recipe-ingredients.ds-or-1 > h2 "
        )
        .text();
      const portionSize = mainJQuery
        .find(
          "main > article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.recipe-ingredients.ds-or-1 > div.recipe-servings.ds-box > form > input"
        )
        .val();
      const recipeIngredients = [];
      mainJQuery
          
        .find(
          "main > article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.recipe-ingredients.ds-or-1 > table > tbody > tr"
        )
        .each((i, el) => {
          const ingredientsWithMeasurementsLongText = $($(el).find("td > span"))
            .text()
            .trim();
          const ingredientsWithMeasurements = ingredientsWithMeasurementsLongText
            .replace(/\s{2,}/g, " ")
            .trim()
            .split(" ");
          const amount = ingredientsWithMeasurements[0];
          const unit = ingredientsWithMeasurements[1];
          const ingredient = ingredientsWithMeasurements[2];
          recipeIngredients.push({
            ingredient,
            amount,
            unit,
          });
        });
        const recipeInstructions = [];
        mainJQuery
          .find(
            "article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.ds-or-3 > div:nth-child(3)"
          )
          .each((i, el) => {
            recipeInstructions.push($(el).text().trim());
          });
          setIsLoading(false);
          recipeJSON = {
            title: recipeTitle,
            ingredients: recipeIngredients,
            instructions: recipeInstructions,
            portionSize: portionSize,
          };
          resolve(recipeJSON);
    } catch (error) {
      console.log(error);
    }
  })
}