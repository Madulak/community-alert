import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import RecentFlatlist from '../../../components/homescreen/recentFlatlist';

const homescreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.recentContainer}>
                    <Text style={styles.recentText}>Recent</Text>
                    <TouchableOpacity>
                        <Text style={styles.moreText}>More</Text>
                    </TouchableOpacity>
                </View>
                <RecentFlatlist detail={() => navigation.navigate('detail')} />

                <View style={styles.recentContainer}>
                    <Text style={styles.recentText}>Categories</Text>
                    <TouchableOpacity>
                        <Text style={styles.moreText}>More</Text>
                    </TouchableOpacity>
                </View>
                <RecentFlatlist />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    recentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
    },
    recentText: {
        fontSize: 20,
    },
    moreText: {
        fontSize: 20,
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 10,
        padding: 10,
    }
})

export default homescreen;