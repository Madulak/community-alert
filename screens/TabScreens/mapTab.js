import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Mapscreen from './mapscreens/map';

const mapTab = () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerStyle: { backgroundColor: '#192f6a',}, headerTintColor: 'white'}}>
            <Stack.Screen name='Map' component={Mapscreen} />
        </Stack.Navigator>
    );
}

export default mapTab;