import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Notification from './notification';
import Homescreen from './homescreen/homescreen';
import Detail from './homescreen/detail';

const tabscreen = ({navigation}) => {

    const Stack = createStackNavigator();
    

    return (
        <Stack.Navigator screenOptions={{headerStyle: { backgroundColor: '#192f6a',}, headerTintColor: 'white'}}>
            <Stack.Screen name='homescreen' component={Homescreen} />
            <Stack.Screen name='detail' component={Detail} />
            <Stack.Screen name='map' component={Notification} />
        </Stack.Navigator>
    );

}

export default tabscreen;