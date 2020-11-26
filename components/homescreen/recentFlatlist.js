import React from 'react';
import { Animated, View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

const recentFlatlist = ({detail}) => {

    const data = [1,2,3];

    return (
        <View>
            <FlatList showsHorizontalScrollIndicator={false} horizontal keyExtractor={item => item} data={data} renderItem={(item) => (
                <TouchableOpacity onPress={detail} style={styles.cardContainer}>
                    <View style={styles.imageContainer}>

                    </View>
                    <Text>Stolen Car</Text>
                    <Text>3 Hrs ago</Text>
                    <Text>Johannesburg</Text>
                </TouchableOpacity>
            )} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    cardContainer: {
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'yellow',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    imageContainer: {
        width: 200,
        height: 200,
        backgroundColor: 'lime',
        overflow: 'hidden'
        
    }
})

export default recentFlatlist;