import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native-gesture-handler';
import { firebase } from '../../../firebase';

import MarkerComponent from '../../../components/markerComponent/markerComponent';

const map = () => {

    const [show, setShow] = useState(false);
    const [posts, setPosts] = useState([])
    const [mapcoord, setMapcoord] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })

    const [marker, setMarker] = useState({})

    useEffect(() => {
        let unsubscribe;
        unsubscribe = firebase.firestore().collection('posts').onSnapshot(snapshot => {
            // {console.log('[DATA] ',snapshot)}
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                posts: doc.data()})))
               
        })
        return () => {
            unsubscribe ();
        }
    },[mapcoord, marker, show])

    const markerSet = (lat, lng) => {
        console.log('[LAT AND LONG] ', lat, lng)
        setMapcoord({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
        setMarker({
            latitude: lat,
            longitude: lng
        }) 
    }

    // console.log('[MAP POST] ', posts)

    return (
        <View>
            {/* <StatusBar style='light' /> */}
            <MapView style={styles.mapStyle} 
                region={mapcoord? mapcoord : null}
                onPress={() => setShow(false)}
                
            >
                
                    {marker.latitude ? <Marker onPress={() => setShow(true)} coordinate={{latitude: marker.latitude, longitude: marker.longitude}} >
                        {show && <MarkerComponent show={() => setShow(false)} />}
                    </Marker>: null } 
                
            </MapView>
            <View style={styles.flatlistContainer}>
                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={posts}
                    keyExtractor={item => item.id}
                    renderItem={(item => (
                        
                        <TouchableOpacity  onPress={() => markerSet(item.item.posts.location.lat, item.item.posts.location.lng)} style={{width: 150, height: 150, backgroundColor: 'lightblue', margin: 5, padding: 10, borderRadius: 10,}}>
                            <Text  style={styles.fontText}>{item.item.posts.picker}</Text>
                            <Image source={{uri: item.item.posts.image}} style={{width: '100%', height: '70%',}} />
                        </TouchableOpacity>
                    ))}
                />
            </View>
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
    },
    flatlistContainer: {
        position:'absolute',
        bottom: Dimensions.get('window').height * 0.01,
        // height: Dimensions.get('screen').height * 0.25,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        zIndex: 10,
        backgroundColor: 'transparent',
    },
    fontText: {
        fontSize: 15,
        padding: 5,
        
    }
})

export default map;