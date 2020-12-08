import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Button } from 'react-native';

import ModalDetail from '../../../components/modalDetail/modalDetail';
import Comments from '../../../components/comments/comments';
import { firebase } from '../../../firebase';

const detail = ({route, navigation}) => {

    console.log(route.params.id)
    const id = route.params.id;
    const [post, setPost] = useState({})
    const [modal, setModal] = useState(false);

    useEffect(() => {
        let unsubscribe;
        unsubscribe = firebase.firestore().collection('posts').doc(id).onSnapshot(snapshot => {
            setPost(snapshot.data())
        })

        return () => {
            unsubscribe();
        }
    
    },[])

    const goMap = () => {
        
        navigation.navigate('map', {
            location: post.location
        })
        setModal(false)
    }

    const modalHandler = () => {
        setModal(state => !state);
    }

    console.log(' [POST] ',post)

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image resizeMode='cover' style={styles.image} source={{uri: post.image}} />
            </View>
            
            <Button onPress={modalHandler} title='All Details' />
            <ModalDetail goMap={goMap} id={id} uploadedBy={post.uploadedBy} modal={modal} modalHandler={modalHandler} />
            <Comments />
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
        width: width,
        padding: 10,
    },
    image: {
        flex: 1,
    },
    
})

export default detail;