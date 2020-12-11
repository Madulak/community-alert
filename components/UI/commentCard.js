import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Avatar from 'react-native-user-avatar';

import { ago, color } from '../../util';
import emailToName from 'email-to-name';

const commentCard = ({comment, commentBy, timestamp}) => {

    const commenter = emailToName.process(commentBy).split(' ')[0];


    return (
        <TouchableOpacity style={styles.container}>
            <Avatar name={commentBy} size={70} bgColor='blue' />
            <View style={styles.commentContainer}>
                <Text style={styles.commentText} numberOfLines={3} ellipsizeMode='tail' >{comment}</Text>
                <View style={styles.commentByContainer}>
                    <Text>commentBy {commenter} </Text>
                    <Text>{ago(new Date(timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000).toUTCString())}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 5,
        backgroundColor: color.secondary,
        padding: 10,
        borderRadius: 10,
        width: width * 0.95
    },
    commentContainer: {
        marginLeft: 15,
        flex: 1,
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