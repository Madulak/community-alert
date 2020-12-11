import React from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { color } from '../../util';

const successModal = ({modal, modalHandler}) => {

    return (
        <Modal
            animationType="slide"
            transparent={false}
            style={styles.container}
            visible={modal}
        >
            <View style={styles.successContainer}>
                <Ionicons name="ios-cloud-done" size={48} color={color.primary} />
                <Text style={styles.modalText}>Thank you For uploading</Text>
                <Text style={styles.modalText}>We hope Is going to be found!</Text>
                <View style={styles.modalButton}>
                    <Button color={color.primary} onPress={modalHandler} title='Done' />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        color: color.primary,
        fontSize: 20,
    },
    modalButton: {
        marginVertical: 10,
    }
})

export default successModal;