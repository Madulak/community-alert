import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const mapTab = () => {

    return (
        <View>
            <MapView style={styles.mapStyle} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})

export default mapTab;