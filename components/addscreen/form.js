import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Platform, Keyboard, Dimensions, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';

import Input from '../UI/Input';

const form = ({map}) => {

    const [image, setImage] = useState(null);
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
    const [picker, setPicker] = useState('java');

    const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${location.lng},${location.lat},14.25,0,60/600x600?access_token=pk.eyJ1IjoicGFsYXpvIiwiYSI6ImNraHJ2bTF6MTBlOXQyeGxoamJtZHY5bzIifQ.JbJRVoUD3o1YKFciSPwp2g`

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
    }, [location, image]);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

    const getLocation = async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
 
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      console.log("A date has been picked: ", date);
      hideDatePicker();
    };

    console.log(image)
    console.log(location);

    return (
        <View onPress={Keyboard.dismiss} style={styles.container}>
            <ScrollView>
                <Text>Form</Text>
                <Input maxLength={20}  name='Title' />
                <Input style={{color: 'red'}} multiline={true} numberOfLines={3} name='Description' maxLength={200} />
                
                <View style={styles.mapPic}>
                    {image ? <Image resizeMode='cover' style={styles.imagePic} source={{ uri: image}} /> : <Text>No Image Selected</Text> }
                </View>
                <View style={styles.mapButtons}>
                    <Button onPress={getLocation} title='Get Current location' />
                    <Button onPress={() => map(location)} title='Get on Map' />
                    <Button onPress={pickImage} title='Pic image' />
                </View>
                <Button title="Show Date Picker" onPress={showDatePicker} />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="datetime"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
                <View style={styles.mapPic}>
                    {location.lat ? <Image resizeMode='cover' style={styles.imagePic} source={{ uri: imageUrl}} /> : <Text>Not Selected on Map</Text> }
                </View>
                <Picker
                    selectedValue={picker}
                    // style={{height: 50, width: 100}}
                    onValueChange={(e) => setPicker(e) }>
                    <Picker.Item label="Person" value="person" />
                    <Picker.Item label="Car" value="car" />
                    <Picker.Item label="Personal Items" value="personal Items" />
                    <Picker.Item label="Business Items" value="business items" />
                </Picker>
                {/* {location && <Text>{location}</Text>} */}
                <Button title='submit' />
            </ScrollView>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: width * 0.05
    },
    imagePic: {
      width: '100%',
      height: '100%',
    },
    mapPic: {
        margin: 'auto',
        height: 150,
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