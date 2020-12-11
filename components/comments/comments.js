import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native';

import { useSelector } from 'react-redux';

import CommentCard from '../UI/commentCard';

const comments = ({comments, loading}) => {

    
    const loadingState = useSelector(state => state.posts.loading);
    console.log(' [LOADING] ++ ', loadingState);

    return (
        <View style={styles.container}>
            

            <View>
                <Text>Comments</Text>
            </View>

            {loadingState === true ? 
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="black" />
                </View> :
                 <FlatList 
                 data={comments}
                 keyExtractor={item => item.id}
                 showsVerticalScrollIndicator={false}
                 renderItem={item => {
                     return (
                         <CommentCard comment={item.item.comments.comment} commentBy={item.item.comments.commentBy} timestamp={item.item.comments.timestamp} />
                         
                     )
                 }}
             />
            }
            
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    loadingContainer: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    }
    
})

export default comments;