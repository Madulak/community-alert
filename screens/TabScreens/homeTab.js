import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from './homescreen/homescreen';
import Detail from './homescreen/detailscreen';
import CategoryDetail from './homescreen/categoryDetail';
import Mapscreen from './homescreen/mapscreen';
import recentList from './homescreen/recentList';

import { AntDesign } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';

const tabscreen = ({navigation}) => {

    const dispatch = useDispatch();
    const Stack = createStackNavigator();

    const logoutHandler = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to Logout?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => dispatch(authActions.logout()) }
            ],
            { cancelable: false }
          );
    }

    return (
        <Stack.Navigator screenOptions={{headerStyle: { backgroundColor: '#192f6a',}, headerTintColor: 'white'}}>
            <Stack.Screen name='Community alert' component={Homescreen}  options={{
                // headerTitle: props => <LogoTitle {...props} />,
                headerRight: () => (
                    <TouchableOpacity onPress={logoutHandler}>
                        <AntDesign style={{marginRight: 20}} name="logout" size={24} color="white" />
                    </TouchableOpacity>
                ),
                }} />
            <Stack.Screen name='detail' component={Detail} />
            <Stack.Screen name='Category Detail' component={CategoryDetail} />
            <Stack.Screen name='map' component={Mapscreen} />
            <Stack.Screen name='Stolen Items' component={recentList} />
        </Stack.Navigator>
    );

}

export default tabscreen;