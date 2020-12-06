import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, TextInput } from 'react-native';

const modalDetail = ({modal, modalHandler, title, description, picker, uploadedBy, goMap}) => {

    const [comment, setComment] = useState('');

    const modalfunction = () => {
        modalHandler();
    }

    return (
        <Modal 
            animationType="slide"
            transparent={false}
            visible={modal}
            onRequestClose={() => modalHandler()}
        >   
            <View>
                <Text style={styles.title}>Title: {title}</Text>
                <Text style={styles.description}>Description: {description} In incididunt ea mollit occaecat est cupidatat consectetur sunt.</Text>
                <Text style={styles.category}>category: {picker}</Text>
                <Text>postedBy {uploadedBy}</Text>
                <Button title='Map' onPress={goMap} />
            </View>
            <View style={styles.inputBorder}>
                    <Text style={styles.Textinput}>{'Comment'}</Text>
                    <TextInput value={comment} onChangeText={e => setComment(e)} maxLength={30} style={styles.input} />
            </View>
            <Button onPress={modalfunction} title='Close Modal' />
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    image: {
        flex: 1,
    },
    title: {
        fontSize: 15,
    },
    description: {
        fontSize: 15,
    },
    category: {
        fontSize: 15,
    },
    
    textInputContainer: {
        width: '100%',
    },
    inputBorder: {
        marginVertical: 5,
    },
    Textinput: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 5,
        top: -10,
        zIndex: 10,
        left: 20,
        fontSize: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 5,
        margin: 5,
        padding: 5,
    },

})

export default modalDetail;

