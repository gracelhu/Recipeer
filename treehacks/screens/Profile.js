import { View, Text, ScrollView, StyleSheet, Image, Button, Pressable, TouchableOpacity} from 'react-native';
import {React, useState, useContext} from 'react';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { getEvents, getFriends, getIngredients, getAllergies } from '../convex/convex_functions';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { UserContext } from '../App';

const Profile = ({navigation}) => {
    // get the username and password 
    const { userInfo } = useContext(UserContext);
    const { username, password } = userInfo;
    console.log("username: " + username);
    console.log("password: " + password); 

    const [profilePicture, setProfilePicture] = useState(null);
    
    const users = useQuery(api.convex_functions.userList) || [];
    const events = getEvents(username, users);
    const friends = getFriends(username, users);
    const ingredients = getIngredients(username, users);
    const allergies = getAllergies(username, users);

    const [eventListEditable, setEventListEditable] = useState(false);
    const [friendListEditable, setFriendListEditable] = useState(false);
    const [ingredientListEditable, setIngredientListEditable] = useState(false);
    const [allergyListEditable, setAllergyListEditable] = useState(false);

    const toggleEventListEdit = () => {
        setEventListEditable(!eventListEditable);
    };

    const toggleFriendListEdit = () => {
        setFriendListEditable(!friendListEditable);
    };

    const toggleIngredientListEdit = () => {
      setIngredientListEditable(!ingredientListEditable);
    };

    const toggleAllergyListEdit = () => {
        setAllergyListEditable(!allergyListEditable);
    };


    const imageData = {
        inlineData: {
          data: "",
          mimeType: "image/png",
        },
    };
    
    const logoutPressed = async () => {
        console.log('logout pressed');
        navigation.navigate('login');
    };

    const settingsPressed = async () => {
        console.log('settings pressed');
        navigation.navigate('settings');
    };

    const pickImage = async () => {
        // This uses the expo image picker library to access your phone's photos.
        let _image = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4,3],
          quality: 1,
        });
        if (!_image.cancelled) {
            const uri = _image.assets[0].uri;
            setProfilePicture(uri);
            content = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
            await handleImageUpdate(content);
          }
      };

      const handleImageUpdate = async (base64Data) => {
        imageData.inlineData.data = base64Data;
      };

      const goToCreateEvent = async() => {
        navigation.navigate('createevent');
      };

      const goToUploadPicture = async() => {
        navigation.navigate('upload');
      };

      const goToSearchFriends = async() => {
        navigation.navigate('search');
      };

      const renderEvents = () => {
        return events.map((event, index) => (
          <View key={index} style={styles.eventRow}>
            <Text style={styles.eventText}>{event}</Text>
          </View>
        ));
      };

      const renderFriends = () => {
        return friends.map((friend, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableText}>{friend}</Text>
          </View>
        ));
      };

      const renderIngredients = () => {
        return ingredients.map((ingredient, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableText}>{ingredient}</Text>
          </View>
        ));
      };

      const renderAllergies = () => {
        return allergies.map((allergy, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableText}>{allergy}</Text>
          </View>
        ));
      };

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
                    <TouchableOpacity onPress={pickImage}>
                    <Image style={styles.image} source={profilePicture ? { uri: profilePicture } : require('../pictures/default-profile-pic.jpg')}/>
                </TouchableOpacity>
                    <TouchableOpacity onPress={settingsPressed}>
                        <Image
                            source={require('../pictures/settings.png')}
                            style={styles.settings}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.titleText}>@{username}</Text>
            </View>
            <View style={styles.topBarDivider}></View>
            <View style={{justifyContent: 'center', flexDirection: 'row', padding: 20, justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.button} onPress={goToCreateEvent}>
                    <Text style={styles.buttonText}>Create Event</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={goToUploadPicture}>
                    <Text style={styles.buttonText}>Scan Food</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={goToSearchFriends}>
                    <Text style={styles.buttonText}>Add Friend</Text>
                </TouchableOpacity>
            </View>
            <View >
                <Text style={styles.bodyText}>Upcoming Events</Text>
                <View style={styles.divider}></View>
                
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.bodyText}>Friends</Text>
                    <TouchableOpacity onPress={toggleFriendListEdit} style={styles.tableEditButton}>
                        <Text style={{fontSize: 16, textAlign: 'center'}}>{friendListEditable ? 'Done' : 'Edit'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.tableContainer}>
                    <ScrollView style={styles.tableBox}>
                        {renderFriends()}
                    </ScrollView>
                </View>
                <View style={styles.divider}></View>
                
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.bodyText}>Ingredients</Text>
                    <TouchableOpacity onPress={toggleIngredientListEdit} style={styles.tableEditButton}>
                        <Text style={{fontSize: 16, textAlign: 'center'}}>{ingredientListEditable ? 'Done' : 'Edit'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.tableContainer}>
                    <ScrollView style={styles.tableBox}>
                        {renderIngredients()}
                    </ScrollView>
                </View>
                <View style={styles.divider}></View>
                
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.bodyText}>Allergies</Text>
                    <TouchableOpacity onPress={toggleAllergyListEdit} style={styles.tableEditButton}>
                        <Text style={{fontSize: 16, textAlign: 'center'}}>{allergyListEditable ? 'Done' : 'Edit'}</Text>
                    </TouchableOpacity>
                </View>
                    <View style={styles.tableContainer}>
                        <ScrollView style={styles.tableBox}>
                            {renderAllergies()}
                        </ScrollView>
                    </View>
                <View style={styles.divider}></View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    tableEditButton: {
        height: 35,
        width: 60,
        borderWidth: 1.5,
        padding: 5,
        marginTop: 10,
        marginLeft: 120,
        borderRadius: 12,
      },
    tableContainer: {
        height: 200,
        width: 300,
        justifyContent: 'center',
        marginBottom: 10,
        marginHorizontal: 40,
      },
    tableBox: {
        flex: 1,
        borderRadius: 12,
      },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 7.5,
        borderBottomWidth: 1.5,
        backgroundColor: 'white',
        borderBottomColor: '#E2E9ED',
      },
    tableText: {
        fontSize: 16,
      },
      
    button: {
        display:'flex',
        justifyContent:'center',
        width:90,
        height:55,
        //backgroundColor: '#B4D196',
        borderRadius: 12,
        borderWidth: 2,
        //borderColor: '#4D6B2E',

    },
    buttonText: {
        //color:'#4D6B2E', 
        //fontWeight: 'bold', 
        fontSize: 16,
        padding: 5,
        textAlign: 'center',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logout: {
        width: 30,
        height: 30,
        marginHorizontal: 90,
        marginTop: -40,
    }, 
    settings: {
        width: 25,
        height: 25,
        marginHorizontal: 90,
        marginTop: -40,
    }, 
    divider: {
        height: 1.5, 
        width: 350,
        backgroundColor: '#D6D6D6',
        marginVertical: 10, 
        marginHorizontal: 20,
    },
    topBarDivider: {
        height: 1.5, 
        backgroundColor: '#B9D9BE',
    },
    baseText: {
      fontFamily: 'Cochin',
    },
    titleText: {
      fontSize: 27,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 20,

    },
    header: {
        //backgroundColor: '#F3EACB',
        //backgroundColor: '#D2E8D7',
        backgroundColor: '#DDECDF',
        height: 180,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        marginTop: 30,
        height: 100,
        width: 100,
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