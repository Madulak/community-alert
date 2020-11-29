import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import Signupcomponent from '../../components/Auth/signupcomponent';

import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';

const signup = ({navigation}) => {

    const dispatch = useDispatch();

    const loginRoute = () => {
        navigation.navigate('login');
    }

    const signupHandler = (email, password) => {
        dispatch(authActions.signup(email, password))
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.linearGradient}>
                {/* <Text
                style={{
                    backgroundColor: 'transparent',
                    fontSize: 15,
                    color: '#fff',
                }}>
                Sign up Screen
                </Text> */}
                <Image source={require('../../assets/images/community.png')} />
            </LinearGradient>
            <View style={styles.signupContainer}>
                <Signupcomponent signup={signupHandler} login={loginRoute} />
            </View>
        </View>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    linearGradient: { 
        padding: 15, 
        justifyContent: 'center', 
        borderRadius: 5, 
        height: height * 0.40 
    },
    signupContainer: {
        paddingHorizontal: width * 0.10,
    }
})

export default signup;