import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

// updateImage is a necessary argument to forward the image to any parent components.
export default function UploadPic({ updateImage }) {
    const [image, setImage] = useState(null);
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
        updateImage(content);
      }
  };
  return (
    // This is the component part of the image uploader
    <View style={imageUploaderStyles.container}>
        { image && <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
                onPress={addImage}
        /> }
            <View style={imageUploaderStyles.uploadBtnContainer}>
                <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                    <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                    <AntDesign name="camera" size={20} color="black" />
                </TouchableOpacity>
            </View>
    </View>
  );
}

// Style formatting
const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:200,
        width:200,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})