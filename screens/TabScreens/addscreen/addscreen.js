import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Form from '../../../components/addscreen/form';
import Modal from '../../../components/successModal.js/successModal';

import { useDispatch } from 'react-redux';
import * as postActions from '../../../store/actions/posts';

const addscreen = ({navigation}) => {

    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    const goMap = (location) => {
        navigation.navigate('map', {
            location: location
        })
    }

    const uploadHandler = (data) => {
        dispatch(postActions.create_post(data))
    }

    const modalHandler = () => {
        setModal(state => !state);
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Form modalHandler={modalHandler} upload={uploadHandler} map={goMap} />
            </ScrollView>
            <Modal modalHandler={modalHandler} modal={modal} />
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