import { View, Text, Button , StyleSheet, TextInput, Pressable, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

const isValid = true;

const CreateEvent = ({navigation}) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [friendsInvited, setFriendsInvited] = useState('');
  const [dishes, setDishes] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [extraNotes, setExtraNotes] = useState('');

  const leftArrowPressed = async () => {
    console.log('Left arrow pressed');
    navigation.navigate('dashboard');

  };

  return (
    <View>
        <TouchableOpacity onPress={leftArrowPressed}>
        <Image
          source={require('../pictures/leftarrow.png')}
          style={arrowStyles.arrowButton}
        />
        </TouchableOpacity>
        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <Text style={styles.header}>Create an Event!</Text>
          <TextInput onChangeText={text => setEventName(text)} style={[styles.input, {height: 45, width: 250}]} placeholder={"Event name (Ex: Taco Tuesday)"} />
          <View style={{flexDirection: 'row'}}>
            <TextInput onChangeText={text => setEventDate(text)} style={[styles.input, {height: 45, width: 150}]} placeholder={"mm/dd/yyyy"} />
            <TextInput onChangeText={text => setEventTime(text)} style={[styles.input, {height: 45, width: 150}]} placeholder={"Time (Ex: 6:00 pm)"} />
          </View>
          <TextInput onChangeText={text => setFriendsInvited(text)} style={[styles.input, {height: 45, width: 250}]} placeholder={"Friends Invited"} />
          <TextInput onChangeText={text => setDishes(text)} style={[styles.input, {height: 45, width: 250}]} placeholder={"Dishes"} />
          <TextInput onChangeText={text => setIngredients(text)} style={[styles.input, {height: 90, width: 250}]} placeholder={"Ingredients needed"} />
          <TextInput onChangeText={text => setExtraNotes(text)} style={[styles.input, {height: 90, width: 250}]} placeholder={"extra notes"} />
          <Pressable style={styles.buttonStyle} onPress={() => {
            navigation.navigate("recipes"); }} disabled={!isValid}>
              <Text style={styles.buttonText}>Submit Event</Text>
          </Pressable>
        </View>
    </View>
  );
};

const arrowStyles = StyleSheet.create({
  arrowButton: {
    width: 30,
    height: 30,
    marginHorizontal: 25,
    marginRight: 300,
    marginTop: 50,
  },
})

const styles = StyleSheet.create({
    input: {
      borderRadius: 5,
      borderColor: 'gray',
      borderWidth: 1,
      margin: 10,
      paddingHorizontal: 10,
    },
    extranotes: {
      borderRadius: 5,
      borderColor: 'gray',
      borderWidth: 1,
      width: 250,
      height: 100,
      margin: 10,
      paddingHorizontal: 10,
    },
    buttonStyle: {
        width: 200,
        paddingVertical: 15,
        backgroundColor: '#a8b956',
        borderRadius: 5,
        margin: 20,
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        width: 250,
        borderRadius: 5,
        top: 0,
        left: 20,
        
    },
    header:{
        fontSize: 35,
        fontWeight: 'bold',
        padding: 40,
        textAlign: 'center',
    },
})



export default CreateEvent;