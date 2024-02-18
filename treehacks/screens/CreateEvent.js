import { View, Text, Button , StyleSheet, TextInput , Pressable } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButtonImage from './RadioButtonImage';

function handleSubmit() {
    console.log("hi");
}

const isValid = true;

const CreateEvent = ({navigation}) => {
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
    
    <Pressable style={imageUploaderStyles.buttonStyle} onPress={() => {
      navigation.navigate("recipes"); }} disabled={!isValid}>
                            <Text style={imageUploaderStyles.buttonText}>Submit Event</Text>
                        </Pressable>
    </View>
  );
};


const imageUploaderStyles=StyleSheet.create({
    buttonStyle: {
        width: 200,
        paddingVertical: 15,
        backgroundColor: '#a8b956',
        borderRadius: 5,
        top: 120,
        left: 85,
        paddingLeft: 10,
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
        top: 80,
        left: 60,

    },
    select_time:{
        fontSize: 25,
        // fontWeight: 'bold',
        top: 90,
        left: 120,
    },
    invite_friends:{
        fontSize: 25,
        // fontWeight: 'bold',
        top: 140,
        left: 115,
    },
    get_theme:{
        fontSize: 25,
        // fontWeight: 'bold',
        top: 50,
        left: 110,
    },
      datePicker: {
        fontSize: 35,
        fontWeight: 'bold',
        top: 110,
        left: 60,
      },
      themeInput: {
        fontSize: 20,
        // fontWeight: 'bold',
        top: 80,
        left: 110,
      },
})



export default CreateEvent;