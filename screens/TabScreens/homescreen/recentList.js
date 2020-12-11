import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import CardList from '../../../components/UI/cardList';
import { firebase } from '../../../firebase';

import { Picker } from '@react-native-picker/picker';
import { ago } from '../../../util';

const recentList = ({navigation}) => {

    const [posts, setPosts] = useState([]);
    const [picker, setPicker] = useState('all')

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
    },[picker])

    const goDetail = (id) => {
        navigation.navigate('detail', {
            id: id
        });
    }

    console.log('[Posts] ++++ ', posts);

    return (
        <View style={styles.container}>
                
                <Picker
                    selectedValue={picker}
                    style={{height: 50, width: '90%', }}
                    onValueChange={(e) => setPicker(e) }>
                    <Picker.Item label="Sort" value="all" />
                    <Picker.Item label="Missing Person/People" value="person" />
                    <Picker.Item label="Stolen Cars" value="car" />
                    <Picker.Item label="Burglary" value="burglary" />
                    <Picker.Item label="Kidnapping" value="kidnapping" />
                    <Picker.Item label="Other" value="other" />
                </Picker>
            <FlatList showsVerticalScrollIndicator={false}  keyExtractor={item => item.id} data={posts} renderItem={(item) => (
               
                <CardList goDetail={goDetail} title={item.item.posts.title} id={item.item.id} image={item.item.posts.image} title={item.item.posts.title} place={'Johannesburg'} timestamp={ago(new Date(item.item.posts.timestamp?.seconds * 1000 + item.item.posts.timestamp?.nanoseconds / 1000).toUTCString())} />
            )} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingVertical: 10,
    }
})

export default recentList;