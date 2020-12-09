import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const cardList = ({image, goDetail, id}) => {

    console.log('[KEY FOR] ++ ', id)

    return (
        <TouchableOpacity onPress={() => goDetail(id)} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image resizeMode='cover' style={styles.image} source={{uri: image}} />
            </View>
            <Text>Hello</Text>
            <Text>hello</Text>
            <Text>ello</Text>
        </TouchableOpacity>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightblue',
        marginVertical: 10,
        width: width * 0.95,
    },
    imageContainer: {
        height: height * 0.40,
        width: '100%',
        padding: 5,
    },
    image: {
        flex: 1,
        
    },
    
})

export default cardList;