import { ConvexProvider, ConvexReactClient, useConvex} from "convex/react";
import "react-native-get-random-values";
import { Button, View, Text, FlatList} from 'react-native';
import { useMutation, useQuery } from "convex/react";
import { api } from "./convex/_generated/api";
import React, { useState, useEffect } from 'react';
import {getIngredients, getEvents, getFriends} from './convex/ConvexGetters';

const convex = new ConvexReactClient("https://merry-elk-527.convex.cloud", {
  unsavedChangesWarning: false,
});

function InnerApp() {
  const createUser = useMutation(api.tasks.createUser);
  const users = useQuery(api.tasks.userList) || [];

  async function handleCreateUser() {
    const user = {
      username: "lindseeyyy", 
      password: "caspo", 
      ingredients: ["juice"], 
      usernamesOfFriends: ["nancylhu", "camiii"],
      events: [{name: "Taco Tuesday", date: "2/17/24", time: "5:00pm", peopleAttending: ["nancylhu"], 
      recipes: "some awesome recipes ..."}]
    }
    await createUser(user);
  }
  
  const gracelhuIngredients = getIngredients("gracelhu", users);
  const gracelhuEvents = getEvents("gracelhu", users);
  const gracelhuFriends = getFriends("gracelhu", users);

  return (<View>
  <Button title="Create User" onPress={handleCreateUser}/>
  <Text>{gracelhuIngredients.length}</Text>
  <Text>{gracelhuEvents.length}</Text>
  <Text>{gracelhuFriends.length}</Text>
  <Button title="Create User" onPress={handleCreateUser}/>
  </View>
  );
}

const App = () => {
  return (
    <ConvexProvider client={convex}>
      <InnerApp></InnerApp>
    </ConvexProvider>
  );
};

export default App;