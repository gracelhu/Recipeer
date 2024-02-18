import { View, Text, Button , StyleSheet, TextInput , Pressable } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButtonImage from './RadioButtonImage';

function handleSubmit() {
    console.log("hi");
}

const isValid = true;

const CreateEvent = () => {
    const [usertheme, setUserTheme] = useState(null);

    const [selectedChoice, setSelectedChoice] = useState(null);
  const handleSelect = (value) => setSelectedChoice(value);

  const setDate = (event, date) => {
    console.log(date);
    const type = event.type;
    const timestamp = event.nativeEvent.timestamp;
    const utcOffset = event.nativeEvent.utcOffset;
  };

  const setTime = (event, time) => {
    console.log(time);
    const type = event.type;
    const timestamp = event.nativeEvent.timestamp;
    const utcOffset = event.nativeEvent.utcOffset;
  };

  return (
    <View>
        <Text style={imageUploaderStyles.header}>Schedule Event!</Text>
        <Text style={imageUploaderStyles.select_time}>Select time:</Text>
      <Text style={imageUploaderStyles.datePicker}>
        <DateTimePicker onChange={setDate} mode="date" value={new Date()} />
        <DateTimePicker onChange={setTime} mode="time" value={new Date()} />
        
      </Text>
      <Text style={imageUploaderStyles.invite_friends}>Invite friends:</Text>
      <RadioButtonImage
        imageUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s"}
        selectedValue={selectedChoice}
        onPress={handleSelect}
        imageStyle={{ top:180, left:70, width: 50, height: 50, marginLeft: 10 }}/>
        <RadioButtonImage
        imageUrl={"https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg"}
        selectedValue={selectedChoice}
        onPress={handleSelect}
        imageStyle={{ top:130, left:130, width: 50, height: 50, marginLeft: 10 }}/>
        <RadioButtonImage
        imageUrl={"https://www.heart.org/-/media/AHA/H4GM/Article-Images/healthy-cooking.jpg"}
        selectedValue={selectedChoice}
        onPress={handleSelect}
        imageStyle={{ top:80, left:190, width: 50, height: 50, marginLeft: 10 }}/>
        <RadioButtonImage
        imageUrl={"https://i.etsystatic.com/7384205/r/il/f2b375/3859193465/il_fullxfull.3859193465_nlby.jpg"}
        selectedValue={selectedChoice}
        onPress={handleSelect}
        imageStyle={{ top:30, left:250, width: 50, height: 50, marginLeft: 10 }}/>

      <Text style={imageUploaderStyles.get_theme}>Select theme:</Text>
      <TextInput
        // onChangeText={setUserTheme()}
        // value={values.password}
        // secureTextEntry={true}
        style={imageUploaderStyles.themeInput}
        placeholder={"Enter theme here"}
    />
    
    <Pressable style={imageUploaderStyles.buttonStyle} onPress={handleSubmit} disabled={!isValid}>
                            <Text style={imageUploaderStyles.buttonText}>Submit Event</Text>
                        </Pressable>
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




export default CreateEvent;