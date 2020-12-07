import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const markerComponent = ({show}) => {

    return (
        <View >
            <Button title='full detail' />
            <Button  onPress={show} title='Done' />
        </View>
    );
}

export default markerComponent;