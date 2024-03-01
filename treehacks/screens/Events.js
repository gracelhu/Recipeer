import { View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {getEvents} from '../convex/convex_functions';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
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

const Events = ({navigation, user}) => {

  const leftArrowPressed = async () => {
    console.log('Left arrow pressed');
    navigation.navigate('login');

  };
  
    const users = useQuery(api.convex_functions.userList) || [];
 //   const userQ = user.username;
   // console.log(userQ);
    const events = getEvents("gracelhu", users);
  return (
    <View style={{backgroundColor: 'white', flex: 1, alignItems: 'center', gap: 15,}}>
      <Text style={styles.titleText}>Events</Text>
      {events.map((event, index) => (
            <Text key={index}>{event.name}</Text>,
            <Text key={index}>{event.date}</Text>,
            <Text key={index}>{event.time}</Text>
        ))}
        <View style={styles.first}>
            <Pressable onPress={() => {navigation.navigate("createevent")}}>
               <Image style={styles.image} source={require("../pictures/plus.png")}/>
            </Pressable>
           
        </View>
        <View style={styles.event}>
        </View>
        <View style={styles.event}>
        </View>
        <View style={styles.event}>
        </View>
        <View style={styles.event}>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    baseText: {
      fontFamily: 'Cochin',
    },
    titleText: {
      fontSize: 35,
      fontWeight: 'bold',
      marginBottom: 10,

    },
    event: {
        borderWeight: 10,
        borderColor: 'white',
        width: 290,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingLeft: 20,
    },
    first: {
        borderWeight: 10,
        borderColor: 'black',
        width: 290,
        height: 150,
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        paddingLeft: 120,
        paddingTop: 30,
    },
    header: {
        backgroundColor: '#97E0FF',
        height: 200,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 50,
        width: 50,
        marginTop: 20,
        marginBottom: 10,
        
    },
    ingredient: {
      backgroundColor: '#B9EBFF',
      fontSize: 20,
      borderRadius: 5,
      fontSize: 20,
      height: 30,
      width: 70,
      paddingLeft: 4,
      paddingTop: 5,

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

export default Events;