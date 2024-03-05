import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { Formik } from 'formik'; 
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { usernameAndPasswordExists} from "../convex/convex_functions"

const Login = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const users = useQuery(api.convex_functions.userList) || [];
    const [errorMessage, setErrorMessage] = useState(null); 
    const [inputBoxStyle, setInputBoxStyle] = useState(styles.input); 

    const handleLogin = (values) => {
        if(usernameAndPasswordExists(username, password, users)) {
            console.log("username " + username + " and password " + password + " is valid");
            setErrorMessage(null);
            setInputBoxStyle(styles.input);
            //const user = {username, password};
            //navigation.navigate('dashboard', {user, navigation});
            const user = { username: username, password: password };
            console.log(user.username);
            console.log(user.password);
            navigation.navigate('dashboard', {user});
        }
        else {
            setErrorMessage("username or password is not valid");
            setInputBoxStyle(styles.inputError);
            console.log("username " + values.username + " and password " + values.password + "is NOT valid");
        }
    }

    const handleSignUpPress = () => {
        console.log("sign up pressed");
        navigation.navigate('signup');
    }
    
    return (
        <View style={styles.bodyPage}>
             <Image style={{width: 150, height: 150,}}
        source={require('./img/recipeer_icon.png')}
      />
            <Text style={styles.titleText}>Get Started</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <Formik initialValues={{username: '', password: '', ingredients: '', friends: '', recipes: ''}} 
             onSubmit={(values) => {
                handleLogin(values);
            }}>
                {({ values, handleSubmit, handleChange, isValid }) => {
                    return (
                        <>
                        <View style={{marginBottom: 50,}}>
                        <TextInput onChangeText={text => setUsername(text)} value={username} style={inputBoxStyle} placeholder={"Username"} />
                        <TextInput onChangeText={text => setPassword(text)} value={password} secureTextEntry={true} style={inputBoxStyle} placeholder={"Password"} />
                       </View>

                        <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit} disabled={!isValid}>
                            <Text style={styles.boldText}>Sign in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSignUpPress}> 
                            <Text style={{paddingTop: 20,}}>
                                <Text style={styles.text}> Don't have an account? </Text>
                                <Text style={styles.boldText}> Sign up!</Text>
                            </Text>
                        </TouchableOpacity>
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
      marginBottom: 40,

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
        backgroundColor: '#a8b956',
        paddingVertical: 25,
        paddingHorizontal: 32,
        borderRadius: 5,
        marginTop: 20,
        
    },
    boldText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        fontSize: 18,
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
    inputError: {
        borderRadius: 5,
        borderColor: 'red',
        borderWidth: 1,
        width: 250,
        height: 50,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        padding: 0,
    }

  });

export default Login;

