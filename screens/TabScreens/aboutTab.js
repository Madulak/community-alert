import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Aboutscreen from './aboutscreen/aboutscreen';
import UploadedScreen from './aboutscreen/uploadedscreen';

const aboutTab = () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerStyle: { backgroundColor: '#192f6a',}, headerTintColor: 'white'}}>
            <Stack.Screen name='Profile' component={Aboutscreen} />
            <Stack.Screen name='Uploaded List' component={UploadedScreen} />
        </Stack.Navigator>
    );
}

export default aboutTab;