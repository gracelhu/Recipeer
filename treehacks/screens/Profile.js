import { View, Text, ScrollView, StyleSheet, Image, Button, Pressable} from 'react-native';
import React from 'react';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { getIngredients} from '../convex/getters'

const Profile = ({user}) => {


    const users = useQuery(api.users.userList) || [];
    const ingredients = getIngredients(user.username, users);
    console.log(ingredients.length);
    // const userDB = useQuery(api.users.getUser, {username: user.username});
    // console.log(userDB);
    

    return (
        <ScrollView>
            <View style={styles.header}>
                <Image style={styles.image} source={require("../pictures/user.png")}/>
                <Text style={styles.titleText}>@{user.username}</Text>
            </View>
            <View >
                <Text style={styles.bodyText}>Ingredients</Text>
                <View style={styles.ingredients}>
                    {
                        ingredients.map((ingredient) => {
                            return (
                           <Pressable style={styles.ingredient}>
                                <Text>{ingredient}</Text>
                            </Pressable>)
        
                        })
                    }
                    
                </View>
                <Text style={styles.bodyText}>Friends</Text>
                <Text style={styles.friends}>Add friends..</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    baseText: {
      fontFamily: 'Cochin',
    },
    titleText: {
      fontSize: 35,
      fontWeight: 'bold',
      marginBottom: 10,

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
        height: 100,
        width: 100,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: 'black',
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
    bodyText: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 20,
    },
    ingredients: {
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8,
    },
    friends: {
         color: 'blue',
         fontSize: 20,
         paddingLeft: 15,
    }
  });


export default Profile;