import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity} from 'react-native';
import React from 'react'

const Settings = ({navigation}) => {
    const leftArrowPressed = async () => {
        console.log('Left arrow pressed');
        navigation.navigate('dashboard');
      };

    return (
        <View style={{ flex: 1, alignItems: 'center', gap: 15, marginTop: 100}}>
            <TouchableOpacity onPress={leftArrowPressed}>
                <Image
                    source={require('../pictures/leftarrow.png')}
                    style={styles.arrowButton}
                />
            </TouchableOpacity>
            <Text style={styles.titleText}>Settings</Text>
        </View>
    ) 
}

const styles = StyleSheet.create({
    arrowButton: {
        width: 30,
        height: 30,
        marginHorizontal: 25,
      },

    titleText: {
      fontSize: 35,
      fontWeight: 'bold',
      marginBottom: 10,

    },
})

export default Settings;