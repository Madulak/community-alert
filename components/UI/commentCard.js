import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Avatar from 'react-native-user-avatar';

import { ago } from '../../util';

const commentCard = ({comment, commentBy, timestamp}) => {

    return (
        <TouchableOpacity style={styles.container}>
            <Avatar name={commentBy} size={70} bgColor='blue' />
            <View style={styles.commentContainer}>
                <Text style={styles.commentText} numberOfLines={2} ellipsizeMode='tail' >{comment}</Text>
                <View style={styles.commentByContainer}>
                    <Text>commentBy {commentBy} </Text>
                    <Text>{ago(new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000).toUTCString())}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 5,
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 10,
    },
    commentContainer: {
        marginLeft: 15,
    },
    commentText: {
        fontWeight: '700',
        fontSize: 16,
    },
    commentByContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flex: 1,
    }
})

export default commentCard;