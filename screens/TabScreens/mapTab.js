import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native-gesture-handler';
import { firebase } from '../../firebase';

const mapTab = () => {

    const [posts, setPosts] = useState([])
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
    },[])

    console.log('[MAP POST] ', posts)

    return (
        <View>
            <StatusBar style="dark" />
            <MapView style={styles.mapStyle} >
                {/* {posts.map(el => (
                    <Marker coordinate={{latitude: po}} />
                ))} */}
            </MapView>
            <View style={styles.flatlistContainer}>
                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={posts}
                    keyExtractor={item => item.id}
                    renderItem={(item => (
                        
                        <View style={{width: 150, height: 150, backgroundColor: 'lightblue', margin: 5, padding: 10, borderRadius: 10,}}>
                            <Text>{item.item.posts.picker}</Text>
                            <Image source={{uri: item.item.posts.image}} style={{width: '100%', height: '70%',}} />
                            {console.log(item)}
                        </View>
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
        bottom: Dimensions.get('window').height * 0.05,
        height: Dimensions.get('screen').height * 0.25,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        zIndex: 10,
        backgroundColor: 'transparent',
    }
})

export default mapTab;