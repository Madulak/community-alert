import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const notificationscreen = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.notificationText}>No Notifications Yet</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationText: {
        fontSize: 24,
    }
})

export default notificationscreen;