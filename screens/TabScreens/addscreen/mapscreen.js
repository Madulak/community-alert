import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { useDispatch, useSelector } from 'react-redux';
import * as locationActions from '../../../store/actions/posts';

const mapscreen = ({route}) => {

    console.log(route.params.location);
    const locationState = useSelector(state => state.posts.location)
    const [mapcord, setMapcord] = useState(route.params.location);
    const dispatch = useDispatch();

    const getCoordinates = (e) => {
        console.log(e.nativeEvent.coordinate);
        setMapcord({
            lat: e.nativeEvent.coordinate.latitude,
            lng: e.nativeEvent.coordinate.longitude
        })
        dispatch(locationActions.select_location({
            lat: e.nativeEvent.coordinate.latitude,
            lng: e.nativeEvent.coordinate.longitude
        }));
    }

    console.log('[MAP LOCATION ++] ', locationState);

    useEffect(() => {

    },[mapcord])

    return (
        <View style={styles.container}>
            <MapView region={locationState.lat ? {latitude: locationState.lat, longitude: locationState.lng, latitudeDelta: 0.0922, longitudeDelta: 0.0421}: {latitude:  -26.205379217137875, longitude: 28.046106845140457, latitudeDelta: 0.0922, longitudeDelta: 0.0421}} onPress={getCoordinates} style={styles.mapStyle} > 
                {locationState.lat && <Marker coordinate={{longitude: locationState.lng, latitude: locationState.lat}} />}
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