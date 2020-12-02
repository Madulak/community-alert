import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const aboutscreen = () => {

    return (
        <View style={styles.container}>
            <Text>About The App</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})

export default aboutscreen;