import { View, Text} from 'react-native';
import React from 'react';
import {getEvents} from '../convex/ConvexGetters';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

const Events = ({ username }) => {
    const users = useQuery(api.tasks.userList) || [];
    const events = getEvents("gracelhu", users);
  return (
    <View>
      <Text>Events</Text>
      {events.map((event, index) => (
            <Text key={index}>{event.name}</Text>,
            <Text key={index}>{event.date}</Text>,
            <Text key={index}>{event.time}</Text>
        ))}
    </View>
  );
};

export default Events;