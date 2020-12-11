import React, { useEffect, useState } from 'react';
import { Alert, View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import RecentFlatlist from '../../../components/homescreen/recentFlatlist';

// import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import * as authActions from '../../../store/actions/auth';

import { firebase } from '../../../firebase';
import emailToName from 'email-to-name';



const homescreen = ({navigation}) => {
    
    const dispatch = useDispatch();

    

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        let unsubscribe;
        unsubscribe = firebase.firestore().collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            // {console.log('[DATA] ',snapshot)}
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                posts: doc.data()})))
               
        })
        setLoading(false);
        return () => {
            unsubscribe ();
        }
    },[loading])

    const goDetail = (id) => {
        navigation.navigate('detail', {
            id: id
        })
    }

    const goMore = () => {
        navigation.navigate('Stolen Items')
    }
    console.log('[POSTS] ',posts);
    
    // {posts && console.log(' [Timestamps] ',posts);}

    return (
        <View style={styles.container}>
            {/* <AntDesign style={styles.plusIcon} name="pluscircle" size={48} color="black" /> */}
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.recentContainer}>
                    <Text style={styles.recentText}>Recent</Text>
                    <TouchableOpacity onPress={goMore}>
                        <Text style={styles.moreText}>More</Text>
                    </TouchableOpacity>
                </View>
                <RecentFlatlist recentData={posts} detail={goDetail}  />

                {/* <View style={styles.recentContainer}>
                    <Text style={styles.recentText}>Categories</Text>
                    <TouchableOpacity>
                        <Text style={styles.moreText}>More</Text>
                    </TouchableOpacity>
                </View>
                <RecentFlatlist detail={() => navigation.navigate('detail')} />

                <Button color='red' title='log out' onPress={logoutHandler} /> */}
                
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
    },
    Button: {
        backgroundColor: 'red',
    }
})

export default homescreen;