import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from './homescreen/homescreen';
import Detail from './homescreen/detailscreen';
import CategoryDetail from './homescreen/categoryDetail';

const tabscreen = ({navigation}) => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerStyle: { backgroundColor: '#192f6a',}, headerTintColor: 'white'}}>
            <Stack.Screen name='homescreen' component={Homescreen} />
            <Stack.Screen name='detail' component={Detail} />
            <Stack.Screen name='Category Detail' component={CategoryDetail} />
        </Stack.Navigator>
    );

}

export default tabscreen;