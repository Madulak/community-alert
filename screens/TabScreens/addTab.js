import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Addscreen from './addscreen/addscreen';
import Mapscreen from './addscreen/mapscreen';

const addTab = () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerStyle: { backgroundColor: '#192f6a',}, headerTintColor: 'white'}}>
            <Stack.Screen name='add missing' component={Addscreen} />
            <Stack.Screen name='map' component={Mapscreen} />
        </Stack.Navigator>
    );
}

export default addTab;