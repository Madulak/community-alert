import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import RecentFlatlist from '../../../components/homescreen/recentFlatlist';

// import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import * as authActions from '../../../store/actions/auth';

import { firebase } from '../../../firebase';

const homescreen = ({navigation}) => {

    const dispatch = useDispatch();

    const [posts, setPosts] = useState([])

    useEffect(() => {
        let unsubscribe;
        unsubscribe = firebase.firestore().collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                posts: doc.data()})))
        })
        return () => {
            unsubscribe ();
        }
    },[])

    const logoutHandler = () => {
        dispatch(authActions.logout())
    }

    const goDetail = (id) => {
        navigation.navigate('detail', {
            id: id
        })
    }

    console.log(posts);

    return (
        <View style={styles.container}>
            {/* <AntDesign style={styles.plusIcon} name="pluscircle" size={48} color="black" /> */}
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.recentContainer}>
                    <Text style={styles.recentText}>Recent</Text>
                    <TouchableOpacity>
                        <Text style={styles.moreText}>More</Text>
                    </TouchableOpacity>
                </View>
                <RecentFlatlist recentData={posts} detail={goDetail}  />

                <View style={styles.recentContainer}>
                    <Text style={styles.recentText}>Categories</Text>
                    <TouchableOpacity>
                        <Text style={styles.moreText}>More</Text>
                    </TouchableOpacity>
                </View>
                <RecentFlatlist detail={() => navigation.navigate('detail')} />

                <Button title='log out' onPress={logoutHandler} />
                
            </ScrollView>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    recentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
    },
    recentText: {
        fontSize: 20,
    },
    moreText: {
        fontSize: 20,
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 10,
        padding: 10,
    },
    plusIcon: {
        position: 'absolute',
        top: height * 0.75,
        left: width * 0.90,
        zIndex: 10,
    }
})

export default homescreen;