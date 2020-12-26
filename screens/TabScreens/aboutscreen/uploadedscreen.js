import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Alert } from 'react-native';
import Avatar from 'react-native-user-avatar';
import { color } from '../../../util';

import UploadedCard from '../../../components/UI/uploadedCard';

import emailToName from 'email-to-name';
import { useSelector, useDispatch } from 'react-redux';
import * as postActions from '../../../store/actions/posts';

const uploadedscreen = () => {

    
    const username = useSelector(state => state.user.user.username);
    const user = emailToName.process(username);
    const posts = useSelector(state => state.posts.uploadedPost);
    const dispatch = useDispatch();

    console.log('[POSTS] ',posts)

    const addFound = (id) => {

        const found = () => {
            const find = posts.find(el => el.id === id);
            dispatch(postActions.add_to_found(find))
            const filter = posts.filter(el => el.id !== id);
            dispatch(postActions.uploaded_post(filter))
        }

        Alert.alert(
            "Is It Found",
            "Are you sure is Found?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => found() }
            ],
            { cancelable: false }
          );
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <View>
                    <Avatar name={user}  size={100} bgColor={color.primary} />
                </View>
                <View>
                    <Text style={styles.profileText}>{user}</Text>
                </View>
            </View>

            <View style={styles.flatlistContainer}>
                <FlatList
                    showsVerticalScrollIndicator={false} 
                    data={posts}
                    keyExtractor={item => item.id}
                    renderItem={(item, index )=> (
                        <UploadedCard addFound={addFound} id={item.item.id} title={item.item.posts.title} image={item.item.posts.image} />
                    )}
                />
            </View>
        </View>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    profileHeader: {
        height: height * 0.30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d8fcf9',
    },
    profileText: {
        fontSize: 32,
    },
    flatlistContainer: {
        flex: 1,
        alignItems: 'center',
    }
})

export default uploadedscreen;