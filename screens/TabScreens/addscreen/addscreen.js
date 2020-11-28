import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Form from '../../../components/addscreen/form';

const addscreen = ({navigation}) => {

    const goMap = (location) => {
        navigation.navigate('map', {
            location: location
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>ADD MISSING </Text>
                <Form map={goMap} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})

export default addscreen;