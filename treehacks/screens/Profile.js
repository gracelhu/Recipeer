import { View, Text, ScrollView, StyleSheet, Image, Button, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { getIngredients} from '../convex/convex_functions';
import { AntDesign } from '@expo/vector-icons';

const Profile = ({user, navigation}) => {
    const users = useQuery(api.convex_functions.userList) || [];
    const ingredients = getIngredients(user.username, users);
    //console.log(ingredients.length);
    // const userDB = useQuery(api.users.getUser, {username: user.username});
    // console.log(userDB);
    
    const logoutPressed = async () => {
        console.log('logout pressed');
        navigation.navigate('login');
    };

    const settingsPressed = async () => {
        console.log('settings pressed');
    };

    // style={{marginRight: 320, marginTop: 10}
    return (
        <ScrollView>
            <View style={styles.header}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={logoutPressed}>
                        <Image
                            source={require('../pictures/logout.png')}
                            style={styles.logout}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={settingsPressed}>
                        <Image
                            source={require('../pictures/settings.png')}
                            style={styles.settings}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Image style={styles.image} source={require("../pictures/user.png")}/>
                </TouchableOpacity>
                <Text style={styles.titleText}>@{user.username}</Text>
            </View>
            <View >
                <Text style={styles.bodyText}>Friends</Text>
                <View style={styles.divider}></View>
                <Text style={styles.bodyText}>Allergies </Text>
                <View style={styles.divider}></View>
                <View style={styles.ingredients}>
                <Text style={styles.bodyText}>Ingredients</Text>
                <TouchableOpacity style={styles.uploadBtnContainer} >
                    <Text>Upload or take a picture of your food!</Text>
                    <AntDesign name="camera" size={20} color="black" />
                </TouchableOpacity>
                <View style={styles.divider}></View>
                    {
                        /*ingredients.map((ingredient) => {
                            return (
                           <Pressable style={styles.ingredient}>
                                <Text>{ingredient}</Text>
                            </Pressable>)
        
                        }) */
                    }
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logout: {
        width: 30,
        height: 30,
        marginHorizontal: 140,
        marginTop: 20,
    }, 
    settings: {
        width: 25,
        height: 25,
        marginHorizontal: 140,
        marginTop: 20,
    }, 
    uploadBtnContainer:{
        opacity:0.7,
        backgroundColor:'lightgrey',
        width: 200,
        height:200,
        borderRadius: 6,
        paddingTop: 15,
        marginLeft: 95,
        alignItems: 'center',
    },
    divider: {
        height: 2, 
        backgroundColor: '#D6D6D6',
        marginVertical: 10, 
    },
    baseText: {
      fontFamily: 'Cochin',
    },
    titleText: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,

    },
    header: {
        //backgroundColor: '#97E0FF',
        backgroundColor: '#CCDDAA',
        height: 220,
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
        fontSize: 21,
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