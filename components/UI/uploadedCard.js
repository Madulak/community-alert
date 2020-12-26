import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Button } from 'react-native';
import { color } from '../../util';

const uploadedCard = ({ id, title, image, date, addFound}) => {

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.imageContainer}>
                <Image resizeMode='cover' style={styles.image} source={{uri: image}} />
            </View>

            <View style={styles.textContainer}>
                <Text>{title}</Text>
                <View style={styles.buttonContainer}>
                    <Button title='Details' />
                </View>
                <View style={styles.buttonContainer}>
                    <Button onPress={() => addFound(id)} title='Found' />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width * 0.90,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: color.secondary
    },
    imageContainer: {
        width: '60%',
    },
    image: {
        width: '100%',
        height: 200
    },
    textContainer: {
        padding: 15,
    },
    buttonContainer: {
        marginVertical: 10,
    }
})

export default uploadedCard;