import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './navigator/BottomNavigation';
import Login from './screens/Login';
import UploadPic from './screens/UploadPic';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import "react-native-get-random-values";
import { CONVEX_URL } from "@env";
import Profile from './screens/Profile';
import Events from './screens/Events';
import AddEvent from './screens/AddEvent';


const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

const Stack = createNativeStackNavigator();

export default function App() {

   const [user, setUser] = useState({username: null, password: null, ingredients: null, 
   friends: "", recipes: ""});

   const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <ConvexProvider client={convex}>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="events" component={Events}  initialParams={{ username: "gracelhu"}} />
          <Stack.Screen name="login">
             {(props) => <Login {...props} updateUser={updateUser} />}
            </Stack.Screen>
          <Stack.Screen name="upload">
              {(props) => <UploadPic {...props} user={user}/>}
            </Stack.Screen> 
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="navbar" component={BottomNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
    </ConvexProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
