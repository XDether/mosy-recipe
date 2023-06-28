import React, {useEffect, useLayoutEffect, useState} from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";

import unitData from "../partials/units";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Picker} from "@react-native-picker/picker";
import styles from "../styles/AddRecipeEditModeStyle";
import ImageBackgroundComp from "../addRecipeEditModeComponents/imageBackgroundComp";
import unitJSON from "../partials/units";
import storage from "../helpers/Storage.js";
import Recipe from "../models/Recipe.js";
import {Divider} from "react-native-elements";
import colors from "../constants/colors.js";

export default function AddRecipeEditMode(props,{
  id,
  tempRecipe,
  setTempRecipe,
  editingRecipeData
}) {
  [data, setData] = useState([])
  const [mode, setMode] = useState("ingredients");
  const [selectedUnit, setSelectedUnit] = useState("g");
  const [ingredientValue, setIngredientValue] = useState("");
  const [amountValue, setAmountValue] = useState();
  const [titleValue, setTitleValue] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [instructionValue, setInstructionValue] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [portionSize, setPortionSize] = useState(1);
  const [prepTime, setPrepTime] = useState("");



  const [editIngredient, setEditIngredient] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editedUnit, setEditedUnit] = useState("g");
  const [editIndex, setEditIndex] = useState(null);


  const changeMode = (newMode) => {
    setMode(newMode);
  };
  useEffect(() => {
    const updateRecipe = async () => {
      if (props !== null) {
        if (props.route.id !== undefined) {
          const data = await storage.getDataWithId(props.route.id);
          if (data !== null) {
            setData(data);
          }
        }
      }
    }
    updateRecipe()
  }, []);
  useLayoutEffect(() => {
    if(props.tempRecipe !== null){
      props.navigation.setOptions({
        headerTitle: props.tempRecipe.recipeJSON.title,
      });
    } else {
      props.navigation.setOptions({
        headerTitle: "Add Recipe",
      });
    }
  });

  const changeTitle = (text) => {
    setTitleValue(text);
  }

  const [ingredients, setIngredients] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = (index) => {
    console.log(index)
    const selectedIngredient = ingredients[index];
    setEditIndex(index);
    setEditIngredient(selectedIngredient.ingredient);
    setEditedUnit(selectedIngredient.unit);
    setEditAmount(selectedIngredient.amount);
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const recalculatePortionSize = (newPortionSize) => {
    if (newPortionSize === 0 || isNaN(newPortionSize)) {
      return
    } else{
      const updatedIngredients = [...ingredients];
      updatedIngredients.forEach((ingredient) => {
        ingredient.amount = (ingredient.amount / portionSize) * newPortionSize;
      });
      setIngredients(updatedIngredients);
      setPortionSize(newPortionSize);
    }

  }

  const handleSave = () => {
    const updatedIngredient = [...ingredients];
    updatedIngredient[editIndex] = {
      ingredient: editIngredient,
      amount: editAmount,
      unit: editedUnit,
    };
    setIngredients(updatedIngredient);
    closeModal();
  };

  const saveDataToRecipe = async () => {
    const allRecipes = await storage.getData();
    const newID = storage.generateIDFromData(allRecipes);
    if (props.tempRecipe !== null) {
      await storage.addData(new Recipe(newID, props.tempRecipe.recipeJSON.category, props.tempRecipe.recipeJSON.title, props.tempRecipe.recipeJSON.ingredients,  props.tempRecipe.recipeJSON.instructions,
          props.tempRecipe.recipeJSON.description,  props.tempRecipe.recipeJSON.portionSize, props.tempRecipe.recipeJSON.time));
      props.navigation.navigate("RecipePage", {id: newID});
    } else{
      await storage.addData(new Recipe(newID, category, titleValue, ingredients, instructions, description, portionSize, prepTime));
      props.navigation.navigate("RecipePage", {id: newID});
    }


  }

  const addIngredient = () => {
    if (ingredientValue !== "" && amountValue !== "") {
      const newIngredient = {
        ingredient: ingredientValue,
        amount: amountValue,
        unit: selectedUnit,
      };
      const updatedIngredient = [...ingredients, newIngredient];
      setIngredients(updatedIngredient);
      setIngredientValue("");
      setAmountValue("");
    }
  };

  const addInstructions = () => {
    if (instructionValue !== "") {
      const updatedInstruction = [...instructions, instructionValue];
      setInstructions(updatedInstruction);
      setInstructionValue("");
    }
  }

  try {
    var editingRecipe = props.route.params.editingRecipe
  }
  catch (e) {
    var editingRecipe = undefined
  }

 

  
  if (props.tempRecipe !== null) {
    
    return (
        <View style={{overflow: "scroll",height: "100%"}}>
          <ImageBackgroundComp styles={styles.image} imageSRC={props.tempRecipe.recipeJSON.image} recipeTitle={props.tempRecipe.recipeJSON.title}/>
          <View style={styles.textContainer}>
            <View style={styles.textRow}>
              <TouchableOpacity style={{backgroundColor: colors.accent, borderRadius: 15, paddingHorizontal: 10}} onPress={() => changeMode("ingredients")}>
                <Text style={styles.textSize}>Zutaten</Text>
              </TouchableOpacity>
              <TouchableOpacity  style={{backgroundColor: colors.accent, borderRadius: 15, paddingHorizontal: 10}} onPress={() => changeMode("steps")}>
                <Text style={styles.textSize}>Zubereitung</Text>
              </TouchableOpacity>
            </View>
          </View>

          {mode === "ingredients" ? (
              <View>
                <View style={styles.iconContainer}>
                  <View style={{padding: 5}}>
                    <Ionicons name="people-outline" size={30} color="black"/>
                    <Text style={{textAlign: 'center'}}>{props.tempRecipe.recipeJSON.portionSize}</Text>
                  </View>
                  <View style={{padding: 5}}>
                    <Ionicons name="time-outline" size={30} color="black"/>
                    <Text style={{textAlign: 'center'}}>{props.tempRecipe.recipeJSON.time}</Text>
                  </View>
                  <View style={{padding: 5}}>
                    <Ionicons name="heart-outline" size={30} color="black"/>
                  </View>
                </View>
                {/* kategorie View */}
                <View style={styles.categorieContainer}>
                  <Text style={styles.textSize}>Kategorie:</Text>
                  <Text style={styles.textSize}>{props.tempRecipe.recipeJSON.category}</Text>
                  <TouchableOpacity style={{padding:10}}>
                    <Ionicons name="pencil" size={25} color="black"/>
                  </TouchableOpacity>
                </View>

                {/* Zutaten View */}
                <View style={styles.ingredientsContainer}>
                  <Text style={styles.textSize}>Zutaten:</Text>
                  <View>
                    <SafeAreaView style={{height: "100%", padding:5}}>
                      <ScrollView style={{paddingBottom: 5}}
                                  contentContainerStyle={{marginBottom: 5}}>
                        {props.tempRecipe.recipeJSON.ingredients.map((ingredient, index) => {
                          return (
                              <View
                                style={{
                                  width: "100%",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                                key={index}
                                >
                                <Text style={{fontSize: 20, paddingBottom: 5}}>{ingredient.amount} {ingredient.unit} {ingredient.ingredient}</Text>
                                <TouchableOpacity onPress={() => openModal(index)}>
                                  <Ionicons name="pencil" size={25} color="black"/>
                                </TouchableOpacity>

                              </View>
                          )
                        })
                        }

                      </ScrollView>
                    </SafeAreaView>
                  </View>

                </View>

              </View>
          ) : (
              <View>
                <SafeAreaView style={{padding: 20}}>
                  <Text style={styles.textSize}>{props.tempRecipe.recipeJSON.instructions}</Text>
                </SafeAreaView>

              </View>


          )}
          <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                backgroundColor: "pink",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: 10,
              }}
          >
            <TouchableOpacity>
              <Ionicons name="trash-outline" size={30} color="black"/>
            </TouchableOpacity>

            <Text style={styles.textSize}>Edit Mode</Text>
            <TouchableOpacity onPress={saveDataToRecipe}>
              <Ionicons name="checkmark-circle-outline" size={30} color="black"/>
            </TouchableOpacity>
          </View>
        </View>
    );
  } else if (editingRecipe !== undefined) {
    return (
      <View style={{overflow: "scroll",height: "100%"}}>
          <ImageBackgroundComp styles={styles.image} recipeTitle={editingRecipe.title}/>
          <View style={styles.textContainer}>
            <View style={styles.textRow}>
              <TouchableOpacity style={{backgroundColor: colors.accent, borderRadius: 15, paddingHorizontal: 10}} onPress={() => changeMode("ingredients")}>
                <Text style={styles.textSize}>Zutaten</Text>
              </TouchableOpacity>
              <TouchableOpacity  style={{backgroundColor: colors.accent, borderRadius: 15, paddingHorizontal: 10}} onPress={() => changeMode("steps")}>
                <Text style={styles.textSize}>Zubereitung</Text>
              </TouchableOpacity>
            </View>
          </View>

          {mode === "ingredients" ? (
              <View>
                <View style={styles.iconContainer}>
                  <View style={{padding: 5}}>
                    <Ionicons name="people-outline" size={30} color="black"/>
                    <Text style={{textAlign: 'center'}}>{editingRecipe.portionSize}</Text>
                  </View>
                  <View style={{padding: 5}}>
                    <Ionicons name="time-outline" size={30} color="black"/>
                    <Text style={{textAlign: 'center'}}>{editingRecipe.time}</Text>
                  </View>
                  <View style={{padding: 5}}>
                    <Ionicons name="heart-outline" size={30} color="black"/>
                  </View>
                </View>
                {/* kategorie View */}
                <View style={styles.categorieContainer}>
                  <Text style={styles.textSize}>Kategorie:</Text>
                  <Text style={styles.textSize}>{editingRecipe.categoryID}</Text>
                  <TouchableOpacity style={{padding:10}}>
                    <Ionicons name="pencil" size={25} color="black"/>
                  </TouchableOpacity>
                </View>

                {/* Zutaten View */}
                <View style={styles.ingredientsContainer}>
                  <Text style={styles.textSize}>Zutaten:</Text>
                  <View>
                    <SafeAreaView style={{height: "100%", padding:5}}>
                      <ScrollView style={{paddingBottom: 5}}
                                  contentContainerStyle={{marginBottom: 5}}>
                        {editingRecipe.ingredients.map((ingredient, index) => {
                          return (
                              <View
                                style={{
                                  width: "100%",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                                key={index}
                                >
                                <Text style={{fontSize: 20, paddingBottom: 5}}>{ingredient.amount} {ingredient.unit} {ingredient.ingredient}</Text>
                                <TouchableOpacity onPress={() => openModal(index)}>
                                  <Ionicons name="pencil" size={25} color="black"/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                        onPress={() => {
                                          console.log(...editingRecipe.ingredients)
                                          const updatedIngredients = editingRecipe.ingredients;
                                          updatedIngredients.splice(index, 1);
                                          setIngredients(updatedIngredients);
                                        }}
                                        style={{}}
                                    >
                                      <Ionicons
                                          name="trash-outline"
                                          size={20}
                                          color="black"
                                      />
                                  </TouchableOpacity>


                              </View>
                          )
                        })
                        }

                      </ScrollView>
                    </SafeAreaView>
                  </View>

                </View>

              </View>
          ) : (
              <View>
                <SafeAreaView style={{padding: 20}}>
                  <Text style={styles.textSize}>{editingRecipe.instructions}</Text>
                </SafeAreaView>

              </View>


          )}
          <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                backgroundColor: "pink",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: 10,
              }}
          >
            <TouchableOpacity>
              <Ionicons name="trash-outline" size={30} color="black"/>
            </TouchableOpacity>

            <Text style={styles.textSize}>Edit Mode</Text>
            <TouchableOpacity onPress={saveDataToRecipe}>
              <Ionicons name="checkmark-circle-outline" size={30} color="black"/>
            </TouchableOpacity>
          </View>
        </View>
    )
  }else {
    return (
        <View style={{overflow: "scroll",height: "100%"}}>
          <ImageBackgroundComp styles={styles.image} recipeTitle={titleValue} setRecipeTitle={changeTitle} />
          <View style={styles.textContainer}>
            <View style={styles.textRow}>
              <TouchableOpacity style={{backgroundColor: colors.accent, borderRadius: 15, paddingHorizontal: 10}} onPress={() => changeMode("ingredients")}>
                <Text style={styles.textSize}>Zutaten</Text>
              </TouchableOpacity>
              <TouchableOpacity  style={{backgroundColor: colors.accent, borderRadius: 15, paddingHorizontal: 10}} onPress={() => changeMode("steps")}>
                <Text style={styles.textSize}>Zubereitung</Text>
              </TouchableOpacity>
            </View>
            {mode === "ingredients" ? (
                <View>
                  <View style={styles.iconContainer}>
                    <View style={{padding: 5}}>
                      <Ionicons name="people-outline" size={30} color="black"/>
                      <TextInput style={{padding: 5, textAlign: 'center'}} keyboardType={"numeric"} value={portionSize.toString()} onChangeText={(text) => recalculatePortionSize(parseInt(text))} ></TextInput>

                    </View>
                    <View style={{padding: 5, alignItems : 'center'}}>
                      <Ionicons name="time-outline" size={30} color="black"/>
                      <TextInput style={{padding: 5, textAlign: 'center'}} placeholder={"insert time"} value={prepTime} onChangeText={(text) => setPrepTime(text)} ></TextInput>
                    </View>
                    <View style={{padding: 5}}>
                      <Ionicons name="heart-outline" size={30} color="black"/>
                    </View>
                  </View>
                  {/* Kategorie View */}
                  <View style={styles.categorieContainer}>
                    <Text style={styles.textSize}>Kategorie:</Text>
                    <TextInput
                        style={{
                          borderWidth: 1,
                          borderRadius: 10,
                          backgroundColor: "lightpink",
                          borderColor: "red",
                          fontSize: 15,
                          padding: 5,
                        }}
                        placeholder="Kategorie"
                        value={category}
                        onChangeText={(text) => setCategory(text)}
                    />
                    {/*<TouchableOpacity style={{padding: 10}}>*/}
                    {/*  <Ionicons name="pencil" size={30} color="black"/>*/}
                    {/*</TouchableOpacity>*/}
                  </View>
                  {/* Zutaten View */}
                  <View style={styles.ingredientsContainer}>
                    <Text style={styles.textSize}>Zutaten</Text>
                    <View style={{flexDirection: "row"}}>
                      <TouchableOpacity
                          onPress={addIngredient}
                          style={{
                            justifyContent: "center",
                            alignContent: "center",
                          }}
                      >
                        <Ionicons name="pencil" size={25} color="black"/>
                      </TouchableOpacity>
                      <TextInput
                          style={{fontSize: 20, textAlign: "center", marginRight: 5}}
                          placeholder="Zutat hinzufügen"
                          value={ingredientValue}
                          onChangeText={(text) => setIngredientValue(text)}
                      />
                      <TextInput
                          inputMode="numeric"
                          style={{fontSize: 20, textAlign: "center"}}
                          value={amountValue}
                          onChangeText={(text) => setAmountValue(text)}
                          placeholder="Menge"
                      />
                      <Picker
                          style={{height: 50, width: 130}}
                          selectedValue={selectedUnit}
                          onValueChange={(itemValue, itemIndex) =>
                              setSelectedUnit(itemValue)
                          }
                      >
                        {unitData.map((unit, index) => {
                          return (
                              <Picker.Item
                                  key={index}
                                  label={unit.label}
                                  value={unit.value}
                              />
                          );
                        })}
                      </Picker>
                    </View>
                    <SafeAreaView style={{padding:5}}>
                      <ScrollView style={{height: "65%",paddingBottom: 5}}
                      contentContainerStyle={{marginBottom: 5}}>
                          {ingredients.map((ingredient, index) => {
                            return (
                                <View
                                    style={{
                                      width: "100%",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                    }}
                                    key={index}
                                >
                                  <Text style={{paddingBottom: 5, fontSize: 20}}>
                                    {ingredient.amount} {ingredient.unit}{" "}
                                    {ingredient.ingredient}
                                  </Text>
                                  <View
                                      style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                      }}
                                  >
                                    <TouchableOpacity
                                        style={{
                                          paddingRight: 20,
                                        }}
                                        onPress={() => openModal(index)}
                                    >
                                      <Ionicons
                                          name="pencil"
                                          size={20}
                                          color="black"
                                      />
                                    </TouchableOpacity>
                                    {/* DIVIDER HIER HIN  */}
                                    <Modal
                                        visible={isModalVisible}
                                        animationType="slide"
                                        onRequestClose={closeModal}
                                    >
                                      <View
                                          style={{
                                          }}
                                      >
                                        <View
                                            style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              padding: 50,
                                            }}
                                        >
                                          <Text
                                              style={{fontSize: 20, paddingRight: 10}}
                                          >
                                            Zutat bearbeiten:
                                          </Text>
                                          <TextInput
                                              style={{
                                                fontSize: 15,
                                                justifyContent: "center",
                                                alignSelf: "center",
                                              }}
                                              value={editIngredient}
                                              onChangeText={(text) =>
                                                  setEditIngredient(text)
                                              }
                                              placeholder="Zutat"
                                          />
                                        </View>

                                        <View
                                            style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              justifyContent: "center",
                                            }}
                                        >
                                          <Text style={{fontSize: 20}}>
                                            Unit bearbeiten:
                                          </Text>
                                          <Picker
                                              style={{height: 50, width: 130}}
                                              selectedValue={editedUnit}
                                              onValueChange={(itemValue, itemIndex) =>
                                                  setEditedUnit(itemValue)
                                              }
                                          >
                                            {unitJSON.map((unit, index) => {
                                              return (
                                                  <Picker.Item
                                                      key={index}
                                                      label={unit.label}
                                                      value={unit.value}
                                                  />
                                              );
                                            })}
                                          </Picker>
                                        </View>
                                        <View
                                            style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              paddingTop: 50,
                                            }}
                                        >
                                          <Text
                                              style={{fontSize: 20, paddingRight: 15}}
                                          >
                                            Menge bearbeiten:
                                          </Text>
                                          <TextInput
                                              style={{
                                                fontSize: 18,
                                                justifyContent: "center",
                                                alignSelf: "center",
                                              }}
                                              value={editAmount}
                                              onChangeText={(text) =>
                                                  setEditAmount(text)
                                              }
                                              placeholder="Menge"
                                              keyboardType="numeric"
                                          />
                                        </View>
                                        <View
                                            style={{
                                              flexDirection: "row",
                                              justifyContent: "center",
                                              paddingTop: 50,
                                            }}
                                        >
                                          <Button
                                              title="Speichern"
                                              onPress={handleSave}
                                          />
                                          <Button
                                              title="Abbrechen"
                                              onPress={closeModal}
                                          />
                                        </View>
                                      </View>
                                    </Modal>
                                    <TouchableOpacity
                                        onPress={() => {
                                          const updatedIngredients = [...ingredients];
                                          updatedIngredients.splice(index, 1);
                                          setIngredients(updatedIngredients);
                                        }}
                                        style={{}}
                                    >
                                      <Ionicons
                                          name="trash-outline"
                                          size={20}
                                          color="black"
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                            );
                          })}
                        </ScrollView>
                        </SafeAreaView>
                    </View>
                  </View>
            ) : (
                <View style={{paddingTop: 30, paddingLeft: 10}}>
                  <View style={{flexDirection: "column"}}>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={addInstructions}>
                        <Ionicons name="pencil" size={25} color="black"/>
                      </TouchableOpacity>
                      <TextInput
                          value={instructionValue}
                          onChangeText={(text) => setInstructionValue(text)}
                          style={styles.textSize}
                          placeholder="Schritt hinzufügen"
                      />
                    </View>

                    {instructions.length > 0 ? (
                        <SafeAreaView style={{padding: 20}}>
                          <ScrollView style={{paddingBottom: 5, height: "85%"}}
                                      contentContainerStyle={{marginBottom: 5}}>
                            {instructions.map((instruction, index) => {
                              return (
                                  <View style={{
                                    width: "80%",
                                    flexDirection: "row",paddingBottom: 20,
                                    justifyContent: 'space-between',
                                  }}
                                        key={index}>
              <Text style={{fontSize: 15, maxWidth: '80%'}}> {instruction}</Text>

                                  <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {
                                    const updatedInstructions = [...instructions];
                                    updatedInstructions.splice(index, 1);
                                    setInstructions(updatedInstructions);
                                  }}>
                                    <Ionicons name="trash-outline" size={25} color="black"/>
                                  </TouchableOpacity>
                                  </View>
                              );
                            })}
                          </ScrollView>

                        </SafeAreaView>
                    ) : null}
                  </View>
                </View>
            )}
          </View>
          <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                backgroundColor: "pink",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: 10,
              }}
          >
            <TouchableOpacity>
              <Ionicons name="trash-outline" size={30} color="black"/>
            </TouchableOpacity>

            <Text style={styles.textSize}>Edit Mode</Text>
            <TouchableOpacity onPress={saveDataToRecipe}>
              <Ionicons name="checkmark-circle-outline" size={30} color="black"/>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}


