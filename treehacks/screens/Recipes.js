import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Pressable,
} from 'react-native';
import Markdown from 'react-native-markdown-display';

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { api } from "../convex/_generated/api";
import { useQuery } from "convex/react";
import { getIngredients, getFriends} from "../convex/convex_functions"

// const copy1 = `
// **[Pork Stir-fry with Bell Peppers and Milk Rice]**
// **- Ingredients:**\n
//     1/2 lb ground pork
//     1 red bell pepper, sliced
//     1 green bell pepper, sliced
//     1 clove garlic, minced
//     1 cup cooked rice
//     1/2 cup milk
//     1 egg, beaten
//     2 tbsp cooking oil
//     Salt and pepper to taste
// **- Instructions:**\n
//     Heat oil in a wok or large pan over medium-high heat.
//     Add the pork and cook until browned.
//     Add the garlic and bell peppers, stir-fry for 2-3 minutes until softened.
//     In a separate bowl, whisk together the milk and egg.
//     Pour the milk-egg mixture into the pan and scramble with the pork and vegetables.
//     Add the cooked rice and stir-fry until heated through and combined.
//     Season with salt and pepper to taste.
//     Serve hot with additional vegetables or fried egg (optional).
// `;

// const copy2 = `
// **[Scrambled Eggs with Peas and Cranberry Sauce]**
// **- Ingredients:**\n
//     2 eggs
//     1/2 cup frozen peas
//     1/4 cup cranberry juice
//     1 tbsp butter
//     Salt and pepper to taste

// **- Instructions:**\n
//     Melt butter in a pan over medium heat.
//     Add the peas and cook for 2-3 minutes until softened.
//     Add the eggs and scramble until cooked through, desired consistency.
//     Reduce heat to low and pour in the cranberry juice.
//     Let the sauce simmer for a minute to thicken slightly.
//     Season with salt and pepper to taste.
//     Serve on toast or with rice.

// `;

// plan to get all the ingredients for an event
// call getFriends for the specific user, and loop through each friend
// for each friend, call getIngredients, concatenate their ingredients to the prompt 
// "Person " + x " ingredients: " + 

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyA6sN0PxKyoAfo58e4Kgt6WYMZL6f7CDQc";

function handleSubmit() {
    console.log("hi");
}

const Recipes = ({navigation}) => {

    const [copy1, setCopy1] = useState(null);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    prompt = `Make 2-3 detailed and thorough Chinese style recipes
    ONLY using these people's available ingredients. The people will cook
    TOGETHER, so just combine their available ingredients to make the recipes.
    If there's any specific ingredients that could enhance the dishes and are
    specific to Chinese cuisine, please let us know but in a separate section,
    or mark the ingredient as optional.\n`;
    const users = useQuery(api.users.userList) || [];
    // new user account username we're demoing with: johndoe 
    const friends = getFriends("johndoe", users);
    // for(int x = 0; x < friends.length; x++) {
        //const currIngredients = getIngredients(friend, users);
        //prompt += "Person " + x + " ingredients: [";
        //for(int i = 0; i < currIngredients.length; i++) {
            // prompt += "currIngredients[i]" + ", ";
        //}
        // prompt += "]\n";
    //}
    friends.forEach((string) => {
        const currIngredients = getIngredients(string, users);
        prompt += "Person " + x + " ingredients: [";
        currIngredients.forEach((string) => {
            prompt += string + ", ";
        })
        prompt += "]\n";
    })
    console.log(prompt);

    useEffect(() => {
        const getPromptOnLoad = async () => {
          try {
            //console.log(prompt);
            const result = await model.generateContent(prompt);
            setCopy1(result.response.text());
          } catch (error) {
            console.error('Error fetching content:', error);
          }
        };
    
        getPromptOnLoad();
      }, []); 

    

    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.titleText}>Recipes</Text>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.titleText}>Dish 1:</Text>
            {copy1 ? (
              <Markdown>
                {copy1}
              </Markdown>
            ) : (
              <Text style={styles.placeholderText}>Recipes loading...</Text>
            )}
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {navigation.navigate("dashboard")}}
              
              // disabled={!isValid}
            >
              <Text style={styles.buttonText}>Finish</Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: '#ffc0a2',
    marginHorizontal: 20,

  },
  text: {
    fontSize: 18,
    marginHorizontal: 20,
    marginVertical: 20,
    
  },
  titleText: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  buttonStyle: {
    width: 120,
    paddingVertical: 15,
    backgroundColor: '#ce4a4c',
    borderRadius: 5,
    marginBottom: 40,
    marginTop: 40,
    // top: 120,
    left: 100,

},
buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    width: 250,
    borderRadius: 5,
    top: 0,
    left: 20,
    color: 'white',
},
});

export default Recipes;