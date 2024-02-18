import { View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {getEvents} from '../convex/getters';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

const Events = () => {
    const users = useQuery(api.users.userList) || [];
    const events = getEvents("gracelhu", users);
  return (
    <View style={{backgroundColor: 'white', }}>
      <Text style={styles.titleText}>Events</Text>
      {events.map((event, index) => (
            <Text key={index}>{event.name}</Text>,
            <Text key={index}>{event.date}</Text>,
            <Text key={index}>{event.time}</Text>
        ))}
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
        borderColor: 'black',
        width: 290,
        height: 150,
        backgroundColor: 'blue',
        borderRadius: 5,

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




export default Events;