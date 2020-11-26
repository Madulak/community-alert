import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Form from '../../../components/addscreen/form';

const addscreen = () => {

    return (
        <View style={styles.container}>
            <Text>ADD MISSING </Text>
            <Form />
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