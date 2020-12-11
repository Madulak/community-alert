import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

import { color } from '../../util';

const cardList = ({image, goDetail, id, title, timestamp, place}) => {

    console.log('[KEY FOR] ++ ', id)

    return (
        <TouchableOpacity onPress={() => goDetail(id)} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image resizeMode='cover' style={styles.image} source={{uri: image}} />
            </View>
            <Text style={styles.cardText}>{title}</Text>
            <Text style={styles.cardText}>{timestamp}</Text>
            <Text style={styles.cardText}>{place}</Text>
        </TouchableOpacity>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.secondary,
        marginVertical: 10,
        width: width * 0.95,
        padding: 5,
    },
    imageContainer: {
        height: height * 0.40,
        width: '100%',
        padding: 5,
    },
    image: {
        flex: 1,
        
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
    
})

export default cardList;