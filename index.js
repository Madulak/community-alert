import React, { Fragment, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Authentication/login';
import Signup from './screens/Authentication/signup';
import Tabscreen from './screens/TabScreens/homeTab';
import Notification from './screens/TabScreens/notificationTab';
import About from './screens/TabScreens/aboutTab';
import addTab from './screens/TabScreens/addTab';
import MapTab from './screens/TabScreens/mapTab';

import { useSelector } from 'react-redux';

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const index = () => {

    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const state = useSelector(state => state.user.user);
    console.log(state);

    useEffect(() => {

    },[])

    const Auth = () => {
        return (
         <Fragment>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                  <Stack.Screen name='login' component={Login} />
                  <Stack.Screen name='signup' component={Signup} />
                </Stack.Navigator>
            </NavigationContainer>
            </Fragment>
          );
        }
        
        const FullApp = () => {
          return (
              <NavigationContainer>
                <Tab.Navigator>
                  <Tab.Screen options={{tabBarIcon: () => {
                    return <AntDesign name="home" size={24} color="black" />
                  }}} name={'home'} component={Tabscreen} />

                  <Tab.Screen options={{tabBarIcon: () => {
                    return <Ionicons name="ios-notifications-outline" size={24} color="black" />
                  }}} name={'notification'} component={Notification} />

                  {/* <Tab.Screen options={{tabBarIcon: () => {
                    return <Feather name="map-pin" size={24} color="black" />
                  }}} name='Map' component={MapTab} /> */}

                  <Tab.Screen options={{tabBarIcon: () => {
                    return <Ionicons name="ios-add-circle-outline" size={24} color="black" />
                  }}} name='add' component={addTab} />

                  <Tab.Screen options={{tabBarIcon: () => {
                    return <AntDesign name="infocirlceo" size={24} color="black" />
                  }}} name='about' component={About} />

                </Tab.Navigator>
              </NavigationContainer>
          );
        }

        return (
            <Fragment>
                {state !== null ? <FullApp />: <Auth />}
            </Fragment>
        );
}

export default index;