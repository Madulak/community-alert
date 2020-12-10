import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Button } from 'react-native';

import ModalDetail from '../../../components/modalDetail/modalDetail';
import Comments from '../../../components/comments/comments';
import { firebase } from '../../../firebase';


import { useDispatch } from 'react-redux';
import * as commentActions from '../../../store/actions/posts';

const detail = ({route, navigation}) => {

    console.log(route.params.id)
    const id = route.params.id;
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        
        let unsubscribe;
        unsubscribe = firebase.firestore().collection('posts').doc(id).onSnapshot(snapshot => {
            setPost(snapshot.data())
        })
        

        return () => {
            unsubscribe();
        }
    
    },[])

    useEffect(() => {
        setLoading(true);
        let unsubscribe;
        unsubscribe = firebase.firestore().collection('posts').doc(id).collection('comments').orderBy('timestamp','desc').onSnapshot(snapshot => {
            setComments(snapshot.docs.map(doc => ({
                id: doc.id,
                comments: doc.data()})))
        })
        
        setLoading(false);
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

    const commentHandler = (data) => {
        dispatch(commentActions.create_comment(data));
    }

    // console.log(' [POST] ',post)
    console.log('[COMMENTS] +++ ',  comments)

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image resizeMode='cover' style={styles.image} source={{uri: post.image}} />
            </View>
            
            <Button onPress={modalHandler} color='#192f6a' title='All Details' />
            <ModalDetail commentHandler={commentHandler} goMap={goMap} id={id} uploadedBy={post.uploadedBy} modal={modal} modalHandler={modalHandler} />
            <Comments loading={loading} comments={comments} />
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