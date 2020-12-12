import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Button, TextInput, Image, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../../firebase';



const modalDetail = ({modal, modalHandler, id, title, description, picker, uploadedBy, goMap, commentHandler}) => {

    const [comment, setComment] = useState('');
    const [post, setPost] = useState({})

    const modalfunction = () => {
        modalHandler();
    }

    useEffect(() => {
        let unsubscribe;
        unsubscribe = firebase.firestore().collection('posts').doc(id).onSnapshot(snapshot => {
            setPost(snapshot.data())
        })

        return () => {
            unsubscribe();
        }
    
    },[])

    const addComment = () => {
        const data = {
            id: id,
            comment: comment
        }
        commentHandler(data);
        setComment('');
    }

    return (
        
        <Modal 
            animationType="slide"
            transparent={false}
            visible={modal}
            onRequestClose={() => modalHandler()}
        >   
        <KeyboardAwareScrollView>
                <View style={styles.imageContainer}>
                    <Image resizeMode='cover' style={styles.image} source={{uri: post.image}} />
                </View>
                <View>
                    <Text style={styles.title}>Title: <Text style={styles.textInside}>{post.title}</Text></Text>
                    <Text style={styles.title}>Description: <Text style={styles.textInside}>{post.description} </Text></Text>
                    <Text style={styles.title}>category: <Text style={styles.textInside}>{post.picker}</Text></Text>
                    
                </View>
                <View style={styles.commentContainer}>
                    <View style={styles.inputBorder}>
                        <Text style={styles.Textinput}>{'Comment'}</Text>
                        <TextInput value={comment} onChangeText={e => setComment(e)} maxLength={120} style={styles.input} />
                    </View>
                    <View>
                        <Button onPress={addComment} title='Send' />
                    </View>
                </View>
                
                <View style={styles.buttons}>
                    <Button color='#192f6a' title='See on Map' onPress={goMap} />
                    <Button color='#192f6a' onPress={modalfunction} title='Back' />
                </View>
           
                </KeyboardAwareScrollView>
        </Modal>
    );
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        color: 'grey',
        marginVertical: 5,
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
        fontSize: 20,
        color: '#192f6a'
    },
    input: {
        borderWidth: 3,
        borderColor: '#192f6a',
        borderRadius: 5,
        margin: 5,
        padding: 5,
        width: width * 0.80,
        height: height * 0.10,
    },
    imageContainer: {
        height: height * 0.40,
        width: width,
        padding: 10,
    },
    image: {
        flex: 1,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: width,
    },
    textInside: {
        fontSize: 20,
        color: 'black',
    },
    commentContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    }

})


export default modalDetail;

