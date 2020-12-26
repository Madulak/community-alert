import React, { useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity,  ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

import { useSelector } from 'react-redux';

const logincomponent = ({signup, login}) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const loading = useSelector(state => state.user.loading);
    const error = useSelector(state => state.user.error);

    const loginHandler = () => {
        if(email !== '' && password !== '') {
            
            login(email, password);
            setEmail('');
            setPassword('');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.login__text}>Login</Text>
            <View style={styles.inputBorder}>
                <Text style={styles.Textinput}>Email</Text>
                <TextInput value={email} onChangeText={e => setEmail(e)} style={styles.input}  />
            </View>
            <View style={styles.inputBorder}>
                <Text style={styles.Textinput}>Password</Text>
                <TextInput secureTextEntry value={password} onChangeText={e => setPassword(e)} style={styles.input}  />
            </View>
            {loading === true && 
                <View>
                    <ActivityIndicator size="small" color="#0000ff" />
                </View>
            }
            {error && <Text style={styles.errorText}>{error}</Text>}
            <Button title='Login' color='#192f6a' onPress={loginHandler} />
            <Text style={styles.text_or}>OR</Text>
            <TouchableOpacity style={styles.googleContainer} >
                <AntDesign style={styles.googleIcon} name="google" size={34} color="blue" />
            </TouchableOpacity>
            
            <View style={styles.signupContainer}>
                <Text style={styles.dontaccount}> Don't have an account? </Text>
                    <TouchableOpacity  onPress={() => signup()} >
                        <Text style={styles.signup}> Sign up </Text>
                    </TouchableOpacity>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'white',
        paddingVertical: 10,
    },
    login__text: {
        fontSize: 20,
        color: '#192f6a',
        margin: 5,
        
    },
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
        color: '#192f6a',
        fontSize: 16
    },
    input: {
        borderWidth: 2,
        borderColor: '#192f6a',
        borderRadius: 5,
        margin: 5,
        padding: 5,
    },
    text_or: {
        fontSize: 20,
        color: 'gray',
        textAlign: 'center',
        margin: 5,
    },
    googleIcon: {
        borderWidth: 2,
        borderRadius: 40,
        borderColor: 'grey',
        textAlign: 'center',
        padding: 10,
        borderColor: 'blue',
        
    },
    googleContainer: {
        marginHorizontal: '40%', 
        
    },
    dontaccount: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        textAlign: 'center',
        // marginTop: -10,
    },
    signup: {
        justifyContent: 'center',
        fontSize: 20,
        color: 'blue',
        // marginTop: 10,
        bottom: 0,
    },
    signupContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10,
    },
    errorText: {
        color: 'red',
        
    }
})

export default logincomponent;