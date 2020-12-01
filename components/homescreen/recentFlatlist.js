import React from 'react';
import { Animated, View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from 'react-native';

import { ago } from '../../util';

const recentFlatlist = ({detail,recentData}) => {

    const data = ['1','2','3'];
    

    return (
        <View>
            <FlatList showsHorizontalScrollIndicator={false} horizontal keyExtractor={item => item.id} data={recentData} renderItem={(item) => (
                <TouchableOpacity onPress={() => detail(item.item.id)} style={styles.cardContainer}>
                    <View style={styles.imageContainer}>
                        {/* <Image style={styles.Image} resizeMode='cover' source={{uri: item.item.posts.image}} /> */}
                    </View>
                    {console.log('[DETAIL ITEM] ',item.item.id)}
                    <Text>{item.item.posts.title}</Text>
                    <Text>{ago(item.item.posts.timestamp)}</Text>
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
        // backgroundColor: 'yellow',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    imageContainer: {
        width: 200,
        height: 200,
        backgroundColor: 'lime',
        overflow: 'hidden'
        
    },
    Image: {
        flex:1,
    }
})

export default recentFlatlist;