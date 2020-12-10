import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native';


import CommentCard from '../UI/commentCard';

const comments = ({comments, loading}) => {

    console.log(' [LOADING] ++ ', loading)

    return (
        <View style={styles.container}>
            

            <View>
                <Text>Comments</Text>
            </View>

            {loading === true ? 
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
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