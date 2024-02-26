import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Button } from 'react-native';

const AddEvent = ({ username }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [cuisine, setCuisine] = useState(''); // Added for cuisine

  const handleEventNameChange = (text) => setEventName(text);
  const handleEventDateChange = (text) => setEventDate(text);
  const handleEventTimeChange = (text) => setEventTime(text);
  const handleCuisineChange = (text) => setCuisine(text); // Added for cuisine

  const submitEvent = () => {
    // Add your function to handle event submission here
    // Example:
    console.log('Event details:', { eventName, eventDate, eventTime, cuisine });
    // Send data to API, save to local storage, etc.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Event</Text>

      <TextInput
        style={styles.input}
        onChangeText={handleEventNameChange}
        value={eventName}
        placeholder="Enter event name"
      />

      <TextInput
        style={styles.input}
        onChangeText={handleEventDateChange}
        value={eventDate}
        placeholder="Enter event date (YYYY-MM-DD)"
        keyboardType="datetime-local" // Date and time picker on some platforms
      />

      <TextInput
        style={styles.input}
        onChangeText={handleEventTimeChange}
        value={eventTime}
        placeholder="Enter event time (HH:MM)"
        keyboardType="numeric" // Time picker on some platforms
      />

      <TextInput
        style={styles.input}
        onChangeText={handleCuisineChange}
        value={cuisine} // Added for cuisine
        placeholder="Enter cuisine (e.g., Italian, Mexican)"
      />

      <Button title="Submit Event" onPress={submitEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default AddEvent;



// so an addEvent has:
// event name
// event date
// event time 
// Invite who (for now, maybe we can skip this, bc we're running low on time, just include all your friends
// in the event)
// Cuisine 