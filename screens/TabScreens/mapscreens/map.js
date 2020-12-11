import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native-gesture-handler';
import { firebase } from '../../../firebase';

import MarkerComponent from '../../../components/markerComponent/markerComponent';
import { Picker } from '@react-native-picker/picker';

import { color } from '../../../util';

const map = ({navigation}) => {

    const [picker, setPicker] = useState('all');
    const [show, setShow] = useState(false);
    const [posts, setPosts] = useState([])
    const [mapcoord, setMapcoord] = useState({
        latitude: -26.20532657442884,
        longitude: 28.043733425438404,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })

    const [marker, setMarker] = useState({})

    useEffect(() => {
        let unsubscribe;
        if (picker === 'all') {
            unsubscribe = firebase.firestore().collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                // {console.log('[DATA] ',snapshot)}
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    posts: doc.data()})))
                    
                   
            })
        } else {
            unsubscribe = firebase.firestore().collection('posts').orderBy('timestamp', 'desc').where("picker", "==", picker).onSnapshot(snapshot => {
                // {console.log('[DATA] ',snapshot)}
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    posts: doc.data()})))
                   
            })
        }
        return () => {
            unsubscribe ();
        }
    },[mapcoord, marker, show, picker])

    const markerSet = (lat, lng, id) => {
        console.log('[LAT AND LONG] ', lat, lng)
        setMapcoord({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
        setMarker({
            latitude: lat,
            longitude: lng,
            id: id,
            color: 'lightgreen'
        }) 
    }

    const goDetail = () => {
        navigation.navigate('detail',{id: marker.id})
    }

    // console.log('[MAP POST] ', posts)

    return (
        <View>
            {/* <StatusBar style='light' /> */}
            <MapView style={styles.mapStyle} 
                region={mapcoord? mapcoord : null}
                onPress={() => setShow(false)}
                
            >
                
                    {marker.latitude ? <Marker onPress={goDetail} coordinate={{latitude: marker.latitude, longitude: marker.longitude}} >
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
                        
                        <TouchableOpacity  onPress={() => markerSet(item.item.posts.location.lat, item.item.posts.location.lng, item.item.id)} style={{...styles.cardContainer, backgroundColor: item.item.id === marker.id ? color.red : color.secondary}}>
                            <Text  style={styles.fontText}>{item.item.posts.picker}</Text>
                            <Image source={{uri: item.item.posts.image}} style={{width: '100%', height: '70%',}} />
                        </TouchableOpacity>
                    ))}
                />
            </View>

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={picker}
                    style={{height: 50, width: '90%', }}
                    onValueChange={(e) => setPicker(e) }>
                    <Picker.Item label="Recent" value="all" />
                    <Picker.Item label="Missing Person/People" value="person" />
                    <Picker.Item label="Stolen Cars" value="car" />
                    <Picker.Item label="Burglary" value="burglary" />
                    <Picker.Item label="Kidnapping" value="kidnapping" />
                    <Picker.Item label="Other" value="other" />
                </Picker>
            </View>
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
    },
    flatlistContainer: {
        position:'absolute',
        bottom: height * 0.01,
        // height: Dimensions.get('screen').height * 0.25,
        width: width,
        backgroundColor: 'white',
        zIndex: 10,
        backgroundColor: 'transparent',
    },
    fontText: {
        fontSize: 18,
        padding: 5,
        fontWeight: 'bold'
    },
    pickerContainer: {
        position: 'absolute',
        top: height * 0.03,
        backgroundColor: 'white',
        zIndex: 10,
        right: width * 0.01,
        width: width * 0.5,
    },
    cardContainer : {
        width: 150,
        height: 150, 
        margin: 5, 
        padding: 10, 
        borderRadius: 10,
    }
})

export default map;