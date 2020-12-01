import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const mapscreen = ({route}) => {

    console.log(route.params.location);
    const [mapcord, setMapcord] = useState(route.params.location)

    const getCoordinates = (e) => {
        console.log(e.nativeEvent.coordinate);
        setMapcord({
            lat: e.nativeEvent.coordinate.latitude,
            lng: e.nativeEvent.coordinate.longitude
        })
    }

    return (
        <View style={styles.container}>
            <MapView region={route.params.location.lat && {latitude: route.params.location.lat, longitude: route.params.location.lng, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}  style={styles.mapStyle} > 
                {mapcord.lat && <Marker title='picked location' coordinate={{longitude: mapcord.lng, latitude: mapcord.lat}} />}
            </MapView>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapStyle: {
        width: width,
        height: height,
    }
})

export default mapscreen;