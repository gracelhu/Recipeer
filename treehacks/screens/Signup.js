import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Formik } from 'formik'; 

function handleSubmit() {
    console.log("account created");
}

const Signup = ({navigation, updateUser}) => {

    const handleLogin = (values) => {
        console.log(values.username);
        updateUser(values);
        navigation.navigate('upload');
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
            <Formik initialValues={{username: '', password: '', ingredients: '', friends: '', recipes: ''}} 
             onSubmit={(values) => {
                handleLogin(values);
            }}>
                {({ values, handleSubmit, handleChange, isValid }) => {
                    return (
                        <>
                        <View style={{marginBottom: 50,}}>
                        <TextInput onChangeText={handleChange('email')} value={values.username} style={styles.input} placeholder={"Email address"} />
                        <TextInput onChangeText={handleChange('username')} value={values.username} style={styles.input} placeholder={"Username"} />
                        <TextInput onChangeText={handleChange('password')} value={values.password} secureTextEntry={true} style={styles.input} placeholder={"Password"} />
                        <TextInput onChangeText={handleChange('password')} value={values.password} secureTextEntry={true} style={styles.input} placeholder={"Retype Password"} />
                       </View>
                        <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit} disabled={!isValid}>
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

  });

export default Signup;
