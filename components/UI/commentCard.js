import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Avatar from 'react-native-user-avatar';

import { ago } from '../../util';

const commentCard = ({comment, commentBy, timestamp}) => {

    return (
        <TouchableOpacity style={styles.container}>
            <Avatar name={commentBy} size={70} bgColor='blue' />
            <View style={styles.commentContainer}>
                <Text>{commentBy}</Text>
                <Text numberOfLines={1} ellipsizeMode='tail' >{comment}</Text>
                <Text>{ago(new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000).toUTCString())}</Text>
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
    }
})

export default commentCard;