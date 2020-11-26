import React, { Fragment, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Authentication/login';
import Signup from './screens/Authentication/signup';
import Tabscreen from './screens/TabScreens/tabscreen';
import Notification from './screens/TabScreens/notification';
import About from './screens/TabScreens/about';

import { useSelector } from 'react-redux';

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
                  <Tab.Screen name={'home'} component={Tabscreen} />
                  <Tab.Screen name={'notification'} component={Notification} />
                  <Tab.Screen name='about' component={About} />
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