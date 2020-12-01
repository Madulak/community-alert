import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Button } from 'react-native';

import { firebase } from '../../../firebase';

const detail = ({route}) => {

    console.log(route.params.id)
    const id = route.params.id;
    const [post, setPost] = useState({})

    useEffect(() => {
        let unsubscribe;
        unsubscribe = firebase.firestore().collection('posts').doc(id).onSnapshot(snapshot => {
            setPost(snapshot.data())
        })

        return () => {
            unsubscribe();
        }
    
    },[])

    console.log(' [POST] ',post)

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image resizeMode='cover' style={styles.image} source={{uri: post.image}} />
            </View>
            <View>
                <Text>Title {post.title}</Text>
                <Text>Description {post.description}</Text>
                <Text>category {post.picker}</Text>
                {/* <Text>postedBy {post.uploadedBy}</Text> */}
                <Button title='Map' />
            </View>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageContainer: {
        height: height * 0.40,
        width: width
    },
    image: {
        flex: 1,
    }

})

export default detail;