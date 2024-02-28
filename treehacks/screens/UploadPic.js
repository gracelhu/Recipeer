import React, { useState } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { useMutation} from 'convex/react';
import { api } from "../convex/_generated/api";


const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyA6sN0PxKyoAfo58e4Kgt6WYMZL6f7CDQc";

// updateImage is a necessary argument to forward the image to any parent components.
export default function UploadPic({ navigation, user }) {

    const [image, setImage] = useState(null);

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  
    const prompt = "I want you to look at the attached image and find the ingredients in the list. Please write the list with commas in between each ingredient because I want to parse your response in code easily. Please do not have any text in your response before or after the ingredients. Separate each ingredient in the list with a comma. A good example of what I'm expecting format-wise is: apples, tomatoes, oranges";    
    const imageData = {
      inlineData: {
        data: "",
        mimeType: "image/png",
      },
    };

    const processImage = useMutation(api.users.createUser);
  let response = ["first"];



  const addImage = async () => {
    // This uses the expo image picker library to access your phone's photos.
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    if (!_image.cancelled) {
        // The uri is the link to the actual image data.
        const uri = _image.assets[0].uri;
        // This updates the image in the selector component.
        setImage(uri);
        // This converts the image to base64 format.
        content = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
        // This notifies the owner of this component to run a function.
        await handleImageUpdate(content);
        // call the database to insert 
        console.log(response);
     
        try {
            await processImage({ ...user, ingredients: response });
            console.log('Image processed and database updated.');
            navigation.navigate('dashboard');
          } catch (error) {
            console.error('Error processing image:', error);
          }


      }
  };

  const handleImageUpdate = async (base64Data) => {
    imageData.inlineData.data = base64Data;
    let result = await model.generateContent([prompt, imageData]);
    let rawresponse = result.response.text();
    console.log("hello");
    console.log(rawresponse);

    response = rawresponse.split(',');
  };

 

  return (
    // This is the component part of the image uploader
    // {flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}
    <View style= {{flex: 1}}>
      <View style = {arrowStyles.topBar}>
      <TouchableOpacity onPress={() => console.log('Left arrow pressed')}>
        <Image
          source={require('../pictures/leftarrow.png')}
          style={arrowStyles.arrowButton}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Right arrow pressed')}>
        <Image
          source={require('../pictures/rightarrow.png')}
          style={arrowStyles.arrowButton}
        />
      </TouchableOpacity>
      </View>
    <View style={{flex: 1, paddingTop: 135}}>
        <View>
        <Text style={imageUploaderStyles.titleText} >Let's get you set up!</Text>
        <Text style={imageUploaderStyles.paragraphText}> Take a picture of your pantry or fridge, and upload it below!</Text>
        
        <View style={imageUploaderStyles.uploadBtnContainer}>
            { image && <Image
                    source={{ uri: image }}
                    style={imageUploaderStyles.uploadedImage}
                    onPress={addImage}
            /> }
         
                    <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                        <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                        <AntDesign name="camera" size={20} color="black" />
                    </TouchableOpacity>
               
        </View>
        </View>
    </View>
    </View>
  );
}

const arrowStyles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 70,
    justifyContent: 'space-between',
  },
  arrowButton: {
    width: 30,
    height: 30,
    marginHorizontal: 25,
  },
})

const imageUploaderStyles=StyleSheet.create({
    baseText: {
        fontFamily: 'Cochin',
      },
      titleText: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 50,
        paddingLeft: 25,
      },
      paragraphText: {
        fontSize: 19,
        fontWeight: 'light',
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 30,
      },
    container:{
        elevation:2,
        height:200,
        width:200,
        backgroundColor:'#efefef',
        borderRadius:999,
        overflow:'hidden',
        paddingTop: 60,
    },
    uploadBtnContainer:{
        opacity:0.7,
        backgroundColor:'lightgrey',
        width: 200,
        height:200,
        borderRadius: 6,
        paddingTop: 15,
        marginLeft: 95,
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    },
    uploadedImage: {
        width: 200,
        aspectRatio: 4 / 3, // Set the aspect ratio based on your requirements
        borderRadius: 10,
      },
})


/*
      <View style={topBarStyles.topBar}>
      <TouchableOpacity onPress={() => console.log('Left arrow pressed')}>
        <Image
          source={require('../pictures/leftarrow.png')}
          style={topBarStyles.arrowButton}
        />
      </TouchableOpacity>
      <View style={{ flex: 1 }} /> 
      <TouchableOpacity onPress={() => console.log('Right arrow pressed')}>
        <Image
          source={require('../pictures/rightarrow.png')}
          style={topBarStyles.arrowButton}
        />
      </TouchableOpacity>
    </View>
*/