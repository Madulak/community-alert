import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity, Image, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Logincomponent from '../../components/Auth/logincomponent';

import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const loginscreen = ({navigation}) => {

    const dispatch = useDispatch();

    const loginRoute = (email, password) => {
        navigation.navigate('signup');
    }

    const loginHandler = (email, password) => {
        dispatch(authActions.login(email, password))
    }

    return (
        <KeyboardAwareScrollView onPress={() => Keyboard.dismiss()}  style={styles.container}>
            <LinearGradient
                 onPress={() => Keyboard.dismiss()} 
                // Button Linear Gradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                start={{ x: 7.9, y: 1.9 }}
                style={styles.linearGradient}>
                
                <Image source={require('../../assets/images/community.png')} />
            </LinearGradient>
            <View style={styles.loginContainer}>
                <Logincomponent login={loginHandler} signup={loginRoute} />
                
            </View>
        </KeyboardAwareScrollView>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    },
    linearGradient: { 
        padding: 15, 
        alignItems: 'center', 
        borderRadius: 5, 
        height: height * 0.40 
    }
    ,
    loginContainer: {
        paddingHorizontal: width * 0.10,
    }
})

export default loginscreen;