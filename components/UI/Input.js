import React from 'react';
import { View, TextInput, StyleSheet, Text  } from 'react-native';

const input = ({password, name, numberOfLines, multiline, maxLength}) => {

    return (
        <View style={styles.inputBorder}>
            <Text style={styles.Textinput}>{name}</Text>
            
            <TextInput multiline={multiline} 
                numberOfLines={numberOfLines} 
                secureTextEntry={password} 
                maxLength={maxLength}
                style={styles.input}  
            />

            
        </View>
    );
}

const styles = StyleSheet.create({
    inputBorder: {
        marginVertical: 5,
    },
    Textinput: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 5,
        top: -10,
        zIndex: 10,
        left: 20,
        fontSize: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 5,
        margin: 5,
        padding: 5,
    },
})

export default input;