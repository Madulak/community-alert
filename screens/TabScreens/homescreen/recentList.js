import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import CardList from '../../../components/UI/cardList';
import { firebase } from '../../../firebase';

import { Picker } from '@react-native-picker/picker';

const recentList = ({navigation}) => {

    const [posts, setPosts] = useState([]);
    const [picker, setPicker] = useState('')

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
                    <Picker.Item label="Car" value="car" />
                    <Picker.Item label="Personal Items" value="personal Items" />
                    <Picker.Item label="Business Items" value="business items" />
                </Picker>
            <FlatList showsVerticalScrollIndicator={false}  keyExtractor={item => item.id} data={posts} renderItem={(item) => (
               
                <CardList goDetail={goDetail} title={item.item.posts.title} description={item.item.posts.description} id={item.item.id} image={item.item.posts.image} />
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