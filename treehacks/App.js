import { ConvexProvider, ConvexReactClient, useConvex} from "convex/react";
import "react-native-get-random-values";
import React, { useState } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { useMutation } from "convex/react";
import { api } from "./convex/_generated/api";

const convex = new ConvexReactClient("https://merry-elk-527.convex.cloud", {
  unsavedChangesWarning: false,
});

function InnerApp() {
  const createUser = useMutation(api.tasks.createUser);
  async function handleCreateUser() {
    await createUser({username: "meow", password: "caspo", ingredients: ["milk", "butter"], usernamesOfFriends: ["nancylhu", "camiii"]});
  }
  return (<View><Button title="Create User" onPress={handleCreateUser}/>
  <Button title="Create User" onPress={handleCreateUser}/>
  <Button title="Create User" onPress={handleCreateUser}/></View>
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