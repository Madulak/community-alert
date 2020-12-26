import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Avatar from 'react-native-user-avatar';

import { color } from '../../util';

const profileHeader = ({user,uploaded, goUploaded}) => {

    return (
        <View style={styles.container}>
            <View>
                <Avatar name={user}  size={100} bgColor={color.primary} />
            </View>
            <View>
                <Text style={styles.profileText}>{user}</Text>
            </View>
            <View style={styles.statsContainer}>
                <TouchableOpacity onPress={goUploaded} style={styles.button}>
                    <Text style={{...styles.uploadedText, color: 'red'}}>Uploaded</Text>
                    <Text style={{...styles.numbers, color: 'red'}}>{uploaded}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={{...styles.uploadedText, color: 'green'}}>Found</Text>
                    <Text style={{...styles.numbers, color: 'green'}}>0</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width * 0.95,
        height: height * 0.79,
        backgroundColor: '#d8fcf9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 10,
    },
    profileText: {
        fontSize: 32,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent:'space-evenly',
        width: '100%',
        margin: 10,
    },
    uploadedText: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    numbers: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 25,
    }
})

export default profileHeader;
