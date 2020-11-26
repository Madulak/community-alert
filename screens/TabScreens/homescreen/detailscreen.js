import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const detail = () => {

    return (
        <View style={styles.container}>
            <Text>Details</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})

export default detail;