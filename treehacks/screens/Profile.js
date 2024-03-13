import { View, Text, ScrollView, StyleSheet, Image, Button, Pressable, TouchableOpacity, Dimensions} from 'react-native';
import {React, useState, useContext} from 'react';
import { useQuery, useMutation} from "convex/react";
import { api } from "../convex/_generated/api";
import { getEvents} from '../convex/convex_functions';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { UserContext } from '../App';
import { TabView, SceneMap, TabBar} from 'react-native-tab-view';

const Profile = ({navigation}) => {
    // get the username and password 
    const { userInfo } = useContext(UserContext);
    const { username, password } = userInfo;
    console.log("username: " + username);
    console.log("password: " + password); 

    const [profilePicture, setProfilePicture] = useState(null);
    
    const users = useQuery(api.convex_functions.userList) || [];
    const events = getEvents(username, users);
    const friends = useQuery(api.convex_functions.getFriendsOfUser, {username: 'G'}) || [];
    const ingredients = useQuery(api.convex_functions.getIngredientListOfUser, {username: 'G'}) || [];
    console.log('ingredients: ' + ingredients); 

    const userID = useQuery(api.convex_functions.getUserIdByUsername, {username: 'G'});
    console.log("userID: " + userID);

    const [eventListEditable, setEventListEditable] = useState(false);
    const [friendListEditable, setFriendListEditable] = useState(false);
    const [ingredientListEditable, setIngredientListEditable] = useState(false);

    const toggleEventListEdit = () => {
        setEventListEditable(!eventListEditable);
    };

    const toggleFriendListEdit = () => {
        setFriendListEditable(!friendListEditable);
    };

    const toggleIngredientListEdit = () => {
      setIngredientListEditable(!ingredientListEditable);
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
        navigation.navigate('upload_notsetup');
      };

      const goToSearchFriends = async() => {
        navigation.navigate('search');
      };


      const renderTable = (tableElements) => {
        const tableHeight = tableElements.length > 6 ? 200 : tableElements.length * 35;
        return (
          <View style={{height: tableHeight, width: 300, justifyContent: 'center', marginBottom: 10, marginHorizontal: 40}}>
                <ScrollView style={styles.tableBox}>
                    {tableElements.map((tableElement, index) => (
                        <View key={index} style={styles.tableRow}>
                          <Text style={styles.tableText}>{tableElement}</Text>
                        </View>
                      ))}
                </ScrollView>
            </View>
        );
      }

      const Events = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.bodyText}>Upcoming Events</Text>
            <TouchableOpacity onPress={toggleEventListEdit} style={styles.tableEditButton}>
                        <Text style={{fontSize: 16, textAlign: 'center'}}>{eventListEditable ? 'Done' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>
          {renderTable(events)}
        </View>
      );
      
      const Ingredients = () => (
        <View>
           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
              <View style={{flexDirection:'row'}}>
                    <Text style={styles.bodyText}>Ingredients</Text>
                    <TouchableOpacity onPress={toggleIngredientListEdit} style={styles.tableEditButton}>
                        <Text style={{fontSize: 16, textAlign: 'center'}}>{ingredientListEditable ? 'Done' : 'Edit'}</Text>
                    </TouchableOpacity>
              </View>
              {renderTable(ingredients)}
            </View>
        </View>
      );

      const Friends = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.bodyText}>Friends</Text>
                <TouchableOpacity onPress={toggleFriendListEdit} style={styles.tableEditButton}>
                  <Text style={{fontSize: 16, textAlign: 'center'}}>{friendListEditable ? 'Done' : 'Edit'}</Text>
                </TouchableOpacity>
            </View>
            {renderTable(friends)}
        </View>
      );
      
      const [index, setIndex] = useState(0);
      
  const renderTabBar = (props) => (
    <TabBar {...props} style={{backgroundColor: 'black'}}/>
  );
  
  const [routes] = useState([
    { key: 'first', title: 'Events' },
    { key: 'second', title: 'Ingredients' },
    { key: 'third', title: 'Friends' },
  ]);

  const renderScene = SceneMap({
    first: Events,
    second: Ingredients,
    third: Friends,
  });

    return (
        <ScrollView>
            <View style={styles.header}>
                <View style={styles.topBar}>
                    <View style={{justifyContent: 'center'}}>
                      <TouchableOpacity onPress={pickImage}>
                        <Image style={styles.image} source={profilePicture ? { uri: profilePicture } : require('../pictures/user.png')}/>
                      </TouchableOpacity>
                    <Text style={styles.titleText}>@gracelhu</Text>
                    </View>
                    <View style={{justifyContent: 'center', flexDirection: 'column', padding: 20, justifyContent: 'space-between', marginLeft: 40}}>
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
                </View>
            </View>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              renderTabBar={renderTabBar}
              initialLayout={{ width: Dimensions.get('window').width }}
            />
            {/* Render individual components based on active tab */}
            {index === 0 && <Events />}
            {index === 1 && <Ingredients />}
            {index === 2 && <Friends />}
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
        borderWidth: 1.5,
        borderColor: 'black',
      },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 7.5,
        borderBottomWidth: 1.5,
        backgroundColor: 'white',
        //borderBottomColor: '#E2E9ED',
        borderBottomColor: 'black',
      },
    tableText: {
        fontSize: 16,
        color: 'black',
      },
      
    button: {
        display:'flex',
        justifyContent:'center',
        width:110,
        height:40,
        borderRadius: 12,
        margin: 10,
        //backgroundColor: '#8E59FF',
        //backgroundColor: '#74CB74',
        backgroundColor: '#52B15E',

    },
    buttonText: {
        fontSize: 15.5,
        padding: 5,
        textAlign: 'center',
        color: 'white',
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
        color: 'black',
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
        marginHorizontal: 20,
    },
    topBarDivider: {
        height: 1.5, 
        backgroundColor: '#B9D9BE',
    },
    baseText: {
      fontFamily: 'Cochin',
      color: 'white',
    },
    titleText: {
      fontSize: 27,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 20,
      marginLeft: 10,
    },
    header: {
        //backgroundColor: '#C0CD87',
        //backgroundColor: '#040B1B',
        backgroundColor: '#FAE2A5',
        height: 230,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        marginTop: 50,
        marginLeft: 10,
        height: 130,
        width: 130,
        borderRadius: 999,
        borderWidth: 3,
    },
    bodyText: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 20,
    },
  });


export default Profile;