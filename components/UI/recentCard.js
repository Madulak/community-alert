import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { color } from '../../util';

const recentCard = ({ image, title, timestamp, place, detail }) => {

    return (
        <TouchableOpacity onPress={detail} style={styles.cardContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.Image} resizeMode='cover' source={{uri: image}} />
            </View>
            <Text style={styles.cardText}>{title}</Text>
            <Text style={styles.cardText}>{timestamp}</Text>
            <Text style={styles.cardText}>{place}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    cardContainer: {
        margin: 10,
        borderRadius: 10,
        // backgroundColor: 'yellow',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: 10,
        backgroundColor: color.secondary
    },
    imageContainer: {
        width: 200,
        height: 200,
        overflow: 'hidden'
        
    },
    Image: {
        flex:1,
    },
    cardText: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold'
    }
})

export default recentCard;