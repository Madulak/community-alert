import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Mapscreen from './mapscreens/map';
import DetailsScreen from './mapscreens/detailscreen';

const mapTab = () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerStyle: { backgroundColor: '#192f6a',}, headerTintColor: 'white'}}>
            <Stack.Screen name='Map' options={{headerShown: false}} component={Mapscreen} />
            <Stack.Screen name='detail' component={DetailsScreen} />
        </Stack.Navigator>
    );
}

export default mapTab;