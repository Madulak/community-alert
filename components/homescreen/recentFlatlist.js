import React from 'react';
import { Animated, View, StyleSheet, FlatList  } from 'react-native';

import { ago } from '../../util';
import RecentCard from '../../components/UI/recentCard';

const recentFlatlist = ({detail,recentData}) => {

    
    
    return (
        <View>

            <FlatList showsHorizontalScrollIndicator={false} horizontal keyExtractor={item => item.id} data={recentData} renderItem={(item) => (
                <RecentCard detail={() => detail(item.item.id)} image={item.item.posts.image} title={item.item.posts.title} place={'Johannesburg'} timestamp={ago(new Date(item.item.posts.timestamp.seconds * 1000 + item.item.posts.timestamp.nanoseconds / 1000).toUTCString())}  />
            )} />
        </View>
    );
}

const styles = StyleSheet.create({
    
})

export default recentFlatlist;