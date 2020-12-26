import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ProfileHeader from '../../../components/profileHeader/profileHeader';
import { firebase } from '../../../firebase';

import { useSelector } from 'react-redux';
import emailToName from 'email-to-name';

import { useDispatch,  } from 'react-redux';
import * as postsActions from '../../../store/actions/posts';

const aboutscreen = ({navigation}) => {

    const username = useSelector(state => state.user.user.username);
    const [posts, setPosts] = useState([])
    const user = emailToName.process(username);
    const dispatch = useDispatch()
    console.log(' [USER] ', username);

    useEffect(() => {
        let unsubscribe;
        unsubscribe = firebase.firestore().collection('posts').orderBy('timestamp', 'desc').where("uploadedBy.username", "==", username).onSnapshot(snapshot => {
            // {console.log('[DATA] ',snapshot)}
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                posts: doc.data()})))
               
        })


        
        return () => {
            unsubscribe ();
        }
    }, [])

    console.log('[POST LENGTH] ', posts);
    if (posts.length > 0) {
        dispatch(postsActions.uploaded_post(posts));
    }

    const goUploaded = () => {
        navigation.navigate('Uploaded List');
    }

    return (
        <View style={styles.container}>
            <ProfileHeader goUploaded={goUploaded} uploaded={posts.length} user={user} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',

    }
})

export default aboutscreen;