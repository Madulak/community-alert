import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Platform, Keyboard, Dimensions, Image, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';

import Input from '../UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import * as locationActions from '../../store/actions/posts';
import { color } from '../../util';

const form = ({map, upload, modalHandler}) => {

    const dispatch = useDispatch();
    const locationState = useSelector(state => state.posts.location);
    // const loading = useSelector(state => state.posts.loading);

    const [image, setImage] = useState(null);
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
    const [picker, setPicker] = useState('java');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(''); 
    const [timeDate, setTimeDate] = useState(null);
    const [place, setPlace] = useState('');

    const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${locationState.lng},${locationState.lat},14.25,0,60/600x600?access_token=pk.eyJ1IjoicGFsYXpvIiwiYSI6ImNraHJ2bTF6MTBlOXQyeGxoamJtZHY5bzIifQ.JbJRVoUD3o1YKFciSPwp2g`

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
    }, []);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setImage(result.uri);
        console.log(result)
      }
    };

    const getLocation = async () => {
        let location = await Location.getCurrentPositionAsync({});
        
        setLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
        dispatch(locationActions.select_location({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        }))
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
      setTimeDate(date);
      hideDatePicker();
    };

    console.log( ' [Title] ',title);
    console.log( ' [DESCRIPTION] ', description);
    console.log( ' [PICKER] ', picker);
    console.log( ' [TIMEDATE] ', timeDate);
    console.log( ' [IMAGE ] ', image)
    console.log(locationState);
    console.log(' [PLACE] ', place)

    console.log('[LOCATION FROM THE STATE] ', locationState)

    const uploadHandler = () => {
      const data = {
        title: title,
        description: description,
        picker: picker,
        image: image,
        location: locationState,
        timeDate: timeDate,
        place: place
      }
      if (title !== '' && description !== '') {
        upload(data);
        setTitle('');
        setDescription('');
        setPlace('');
        dispatch(locationActions.select_location({}));
        setImage(null);
        modalHandler()
      }
    }

    return (
        <View onPress={Keyboard.dismiss} style={styles.container}>
            <ScrollView>
                {/* <Input maxLength={20}  name='Title' /> */}
                <View style={styles.inputBorder}>
                    <Text style={styles.Textinput}>{'Title'}</Text>
                    <TextInput value={title} onChangeText={e => setTitle(e)} maxLength={30} style={styles.input} />
                </View>
                {/* <Input style={{color: 'red'}} multiline={true} numberOfLines={3} name='Description' maxLength={200} /> */}

                <View style={styles.inputBorder}>
                    <Text style={styles.Textinput}>{'Description'}</Text>
                    
                    <TextInput multiline 
                        numberOfLines={3} 
                        secureTextEntry
                        maxLength={200}
                        style={{...styles.input, height: Dimensions.get('window').height * 0.10}}  
                        value={description}
                        onChangeText={e => setDescription(e)}
                    />
                </View>

                <View style={styles.inputBorder}>
                    <Text style={styles.Textinput}>{'Place'}</Text>
                    <TextInput value={place} onChangeText={e => setPlace(e)} maxLength={30} style={styles.input} />
                </View>
                
                <View style={styles.mapPic}>
                    {image ? <Image resizeMode='cover' style={styles.imagePic} source={{ uri: image}} /> : <Text>No Image Selected</Text> }
                </View>
                <View style={styles.mapButtons}>
                    <View style={styles.getButtons}><Button color={color.primary} onPress={getLocation} title='Current location' /></View>
                    <View style={styles.getButtons}><Button color={color.primary} onPress={() => map(location)} title='Get on Map' /></View>
                    <View style={styles.getButtons}><Button color={color.primary} onPress={pickImage} title='Pick image' /></View>
                </View>
                <View style={styles.getButtons}><Button color={color.primary} style={styles.Button} title="Pick Date" onPress={showDatePicker} /></View>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="datetime"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
                <View style={styles.mapPic}>
                    {locationState.lat ? <Image resizeMode='cover' style={styles.imagePic} source={{ uri: imageUrl}} /> : <Text>Not Selected on Map</Text> }
                </View>
                <Picker
                    itemStyle={{backgroundColor: 'blue'}}
                    selectedValue={picker}
                    style={{height: 50,  marginVertical: 10,}}
                    onValueChange={(e) => setPicker(e) }>
                    <Picker.Item label="Missing Person/People" value="person" />
                    <Picker.Item label="Stolen Car" value="car" />
                    <Picker.Item label="Burglary" value="burglary" />
                    <Picker.Item label="Kidnapping" value="kidnapping" />
                    <Picker.Item label="Other" value="other" />
                </Picker>
                {/* {location && <Text>{location}</Text>} */}
                {/* {loading === true && 
                    <View>
                        <ActivityIndicator size="small" color="#0000ff" />
                    </View>
                } */}
                <Button onPress={uploadHandler} color={color.primary} title='submit' />
            </ScrollView>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: width * 0.05,
      paddingVertical: height * 0.02
    },
    imagePic: {
      width: '100%',
      height: '100%',
    },
    mapPic: {
        margin: 'auto',
        height: 150,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: color.primary,
    },
    mapButtons: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    getButtons: {
      marginVertical: 10,
      backgroundColor: 'red',
      color: 'red',
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
        color: color.primary
    },
    input: {
        borderWidth: 1,
        borderColor: color.primary,
        borderRadius: 5,
        margin: 5,
        padding: 5,
        fontSize: 16,
        height: height * 0.07,
        fontWeight: 'bold',
    },
    
})

export default form;