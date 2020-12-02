import React from 'react';
import { View, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Notificationscreen from './notificationscreen/notificationscreen';

const notification = () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerStyle: { backgroundColor: '#192f6a',}, headerTintColor: 'white'}}>
            <Stack.Screen name='notifications' component={Notificationscreen} />
        </Stack.Navigator>
    );
}

export default notification;