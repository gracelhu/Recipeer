import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {React, useState, FormEvent} from 'react';
import { Formik } from 'formik'; 
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { usernameAndPasswordExists, emailExists } from "../convex/convex_functions"

const Signup = ({navigation}) => {
    const users = useQuery(api.convex_functions.userList) || [];
    const createUser = useMutation(api.convex_functions.createUser);
    const [passwordMismatchErrorMessage, setPasswordMismatchErrorMessage] = useState(null); 
    const [existingAccountErrorMessage, setExistingAccountErrorMessage] = useState(null); 
    const [existingEmailErrorMessage, setExistingEmailErrorMessage] = useState(null);
    
    async function handleCreateUser(values) {
        if(values.password === values.retypedPassword) {
            if(usernameAndPasswordExists(values.username, values.password, users)) {
                console.log("account already exists");
                setExistingAccountErrorMessage("account already exists - please go back to login page");
            }
            else if(emailExists(values.emailAddress, users) && !usernameAndPasswordExists(values.username, values.password, users)) {
                console.log("email address already exists");
                setExistingEmailErrorMessage("email address is already associated with an account - please go back to login page");
            }
            else {
                //  username: '', password: '', email: '', allergies: [], ingredients: [], events: [], usernamesOfFriends: []
                await createUser({ username: values.username, password: values.password, emailAddress: values.emailAddress, 
                allergies: [], ingredients: [], events: [], usernamesOfFriends: []});
                setPasswordMismatchErrorMessage(null);
                setExistingAccountErrorMessage(null);
                navigation.navigate('upload');
            }
        }
        else {
            console.log("passwords don't match");
            setPasswordMismatchErrorMessage("passwords don't match");
        }
    }

    const leftArrowPressed = async () => {
        console.log('Left arrow pressed');
        navigation.navigate('login');
    
    };
    
    return (
        <View style={styles.bodyPage}>
            <TouchableOpacity onPress={leftArrowPressed}>
                <Image
                    source={require('../pictures/leftarrow.png')}
                    style={arrowStyles.arrowButton}
                />
            </TouchableOpacity>
            <Text style={styles.titleText}>Create an Account</Text>
            <Formik initialValues={{username: '', emailAddress: '', password: '', retypedPassword: ''}}>
                {({ values, handleChange, isValid }) => {
                    return (
                        <>
                        <View style={{marginBottom: 50,}}>
                        <TextInput onChangeText={handleChange('emailAddress')} value={values.emailAddress} style={styles.input} placeholder={"Email address"} />
                        <TextInput onChangeText={handleChange('username')} value={values.username} style={styles.input} placeholder={"Username"} />
                        <TextInput onChangeText={handleChange('password')} value={values.password} secureTextEntry={true} style={styles.input} placeholder={"Password"} />
                        <TextInput onChangeText={handleChange('retypedPassword')} value={values.retypedPassword} secureTextEntry={true} style={styles.input} placeholder={"Retype Password"} />
                       </View>
                        <Text style={styles.errorMessage}>{passwordMismatchErrorMessage}</Text>
                        <Text style={styles.errorMessage}>{existingAccountErrorMessage}</Text>
                        <Text style={styles.errorMessage}>{existingEmailErrorMessage}</Text>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => handleCreateUser(values)} disabled={!isValid}>
                            <Text style={styles.text}>Sign up</Text>
                        </TouchableOpacity>
                        </>
                    )
            
                }}
           
            </Formik>
        </View>
    )
}

const arrowStyles = StyleSheet.create({
    arrowButton: {
      width: 30,
      height: 30,
      marginHorizontal: 25,
      marginRight: 300,
      marginBottom: 50,
    },
  })

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
        marginBottom: 100,
    },
    buttonStyle: {
        width: 250,
        backgroundColor: '#a8b956',
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
    errorMessage: {
        fontSize: 16,
        color: 'red',
        padding: 0,
    }

  });

export default Signup;
