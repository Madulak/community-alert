import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';


import CommentCard from '../UI/commentCard';

const comments = ({comments}) => {

    

    return (
        <View style={styles.container}>
            

            <View>
                <Text>Comments</Text>
            </View>

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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    
})

export default comments;