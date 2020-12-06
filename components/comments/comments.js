import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const comments = () => {

    

    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                
                <Picker>
                    <Picker.Item label="Sort By" value="all" />
                    <Picker.Item label="Car" value="car" />
                    <Picker.Item label="Personal Items" value="personal Items" />
                    <Picker.Item label="Business Items" value="business items" />
                </Picker>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
})

export default comments;