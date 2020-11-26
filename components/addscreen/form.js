import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import Input from '../UI/Input';

const form = (props) => {

    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }

        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }

      })();
    }, [location]);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

    console.log(location)

    const getLocation = async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }

    return (
        <View style={styles.container}>
            <Text>Form</Text>
            <Input maxLength={20}  name='Title' />
            <Input style={{color: 'red'}} multiline={true} numberOfLines={3} name='Description' maxLength={200} />
            
            <View style={styles.mapPic}>
                <Text>No Image Selected</Text>
            </View>
            <View style={styles.mapButtons}>
                <Button onPress={getLocation} title='Get Current location' />
                <Button title='Get on Map' />
                <Button onPress={pickImage} title='Pic image' />
            </View>
            {/* {location && <Text>{location}</Text>} */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
    },
    mapPic: {
        width: '80%',
        height: 100,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapButtons: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    }
})

export default form;