import { View, Text, TextInput, Button, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Formik } from 'formik'; 

function handleSubmit() {
    console.log("hi");
}

const Login = ({navigation, updateUser}) => {

    const handleLogin = (values) => {
        console.log(values.username);
        updateUser(values);
        navigation.navigate('upload');
    }
    return (
        <View style={styles.bodyPage}>
            <Text style={styles.titleText}>Get Started</Text>
            <Formik initialValues={{username: '', password: '', ingredients: '', friends: '', recipes: ''}} 
             onSubmit={(values) => {
                handleLogin(values);
            }}>
                {({ values, handleSubmit, handleChange, isValid }) => {
                    return (
                        <>
                        <View >
                        <TextInput onChangeText={handleChange('username')} value={values.username} style={styles.input} placeholder={"Username"} />
                        <TextInput onChangeText={handleChange('password')} value={values.password} secureTextEntry={true} style={styles.input} placeholder={"Password"} />
                       </View>

                        <Pressable style={styles.buttonStyle} onPress={handleSubmit} disabled={!isValid}>
                            <Text style={styles.text}>Sign up</Text>
                        </Pressable>
                        </>
                    )
            
                }}
           
            </Formik>
          
            
        </View>
    )
}

const styles = StyleSheet.create({
    baseText: {
      fontFamily: 'Cochin',
    },
    titleText: {
      fontSize: 35,
      fontWeight: 'bold',
      marginBottom: 50,

    },
    bodyPage: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    buttonStyle: {
        width: 250,
        backgroundColor: 'lightblue',
        paddingVertical: 25,
        paddingHorizontal: 32,
        borderRadius: 5,
        marginTop: 20,
        
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        width: 250,
        height: 50,
        paddingHorizontal: 10,
        marginBottom: 15,
    },

  });

export default Login;

