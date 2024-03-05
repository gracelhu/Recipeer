import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { createContext, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './navigator/BottomNavigation';
import Login from './screens/Login';
import Signup from './screens/Signup';
import UploadPic from './screens/UploadPic';
import CreateEvent from './screens/CreateEvent';
import Events from './screens/Events';
import Recipes from './screens/Recipes';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import "react-native-get-random-values";
import { CONVEX_URL } from "@env";
import Settings from './screens/Settings';
import Search from './screens/Search';




const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

const Stack = createNativeStackNavigator();

export const UserContext = createContext();

export default function App() {
  const [userInfo, setUserInfo] = 
  useState({ username: '', password: '', email: '', allergies: [], ingredients: [], events: [], usernamesOfFriends: []});
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
    <ConvexProvider client={convex}>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="login">
             {(props) => <Login {...props}/>}
            </Stack.Screen>
          <Stack.Screen name="signup">
            {(props) => <Signup {...props}/>}
          </Stack.Screen>
          <Stack.Screen name="upload">
              {(props) => <UploadPic {...props}/>}
            </Stack.Screen> 
          <Stack.Screen name="dashboard">
            {(props) => <BottomNavigation {...props}/>  }
            </Stack.Screen> 
          <Stack.Screen name="createevent" component={CreateEvent} />
          <Stack.Screen name="recipes" component={Recipes} />
          <Stack.Screen name="events" component={Events} />
          <Stack.Screen name="settings" component={Settings}></Stack.Screen>
          <Stack.Screen name="search" component={Search}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </ConvexProvider>
    </UserContext.Provider>
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
