import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Form from '../../../components/addscreen/form';

import { useDispatch } from 'react-redux';
import * as postActions from '../../../store/actions/posts';

const addscreen = ({navigation}) => {

    const dispatch = useDispatch();

    const goMap = (location) => {
        navigation.navigate('map', {
            location: location
        })
    }

    const uploadHandler = (data) => {
        dispatch(postActions.create_post(data))
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>ADD MISSING </Text>
                <Form upload={uploadHandler} map={goMap} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})

export default addscreen;