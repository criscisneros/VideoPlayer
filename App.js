import { StatusBar } from 'expo-status-bar';
//import React, { useState } from 'react';
import { /*StyleSheet, Text, View, Button,*/ ScrollView, TextInput} from 'react-native';

import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import React, { Component, useState, useRef, useEffect } from  "react";
import * as ScreenOrientation from 'expo-screen-orientation';

import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Button, 
    Image, 
    Platform,
  } from "react-native";
  import * as ImagePicker from 'expo-image-picker';
  import Constants from 'expo-constants';
  //import { VideoEditorModal } from "react-native-videoeditorsdk";
  //import { ThemeProvider } from 'styled-components';
  //import appTheme from 'constants/appTheme';

export default function App() {

//  const [theme, setTheme] = useState(appTheme.getTheme());
 // const onLayout = () => {
  //  setTheme(appTheme.getTheme());
  //};

  const [videos, setVideos] = React.useState([
    {
    "name": "Welcome to Your Apt",
    'url' : 'https://storage.googleapis.com/leasemagnets-cloud-storage/girl-talking.mp4',
    "id": "c1r342c2",
    },
    {
    "name": "2 Bedroom",
    'url' : 'https://storage.googleapis.com/leasemagnets-cloud-storage/2bedroom-sample.mp4',
    "id": "c1r342d2",
    },

    {
      "name": "Awesome Pool",
      'url' : 'https://storage.googleapis.com/leasemagnets-cloud-storage/sample-intro.mp4',
      "id": "c1r342e2",
      },
])


  const [video, setVideo] = React.useState({
    "name": "Welcome to Your Apt",
    'url' : 'https://storage.googleapis.com/leasemagnets-cloud-storage/sample-intro.mp4',
    "id": "c1r342c2",
  })

  const [search, setSearch] = React.useState("")

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
       const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
       if (status !== 'granted') {
         alert('Sorry, we need camera roll permissions to make this work!');
       }
     }
   })();
 }, []);


 const pickVideo = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    setVideo({ ...video, "url": result.uri });
  }
};



  return (
    <SafeAreaView>
    <ScrollView style={styles.WebViewContainer}>
      <TextInput value={search} 
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text)=> {
              setSearch(text)
            }} 
            placeholder="Search for floor plan or amenity"
            />
      <Text style={{ color: "#fff" }}>Hi Everyone 212</Text>
      
        {videos.filter((video) => {
          return video.name.toLowerCase().includes(search.toLowerCase());
        }).map((video, idx) => {
          return (
            <>
            <View style={styles.buttonTitle}>
              <Button title={video.name} onPress={() => {
                setVideo(video)
              }} />
            </View>
            </>
          )
        }) }

            <TextInput value={video.name} 
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(title)=> {
              setVideo({...video, "name": title })
            }} 
            defaultValue="New Video"
            />
            <VideoPlayer

              videoProps={{
                //shouldPlay: false,
                resizeMode: Video.RESIZE_MODE_CONTAIN,
                source: {
                  uri: `${video.url}`,
                },
                
              }}

               //switchToLandscape={async () => 
                 //await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
               //}
               //switchToPortrait={async () => 
                 //await ScreenOrientation.unlockAsync()
               //}
              inFullscreen={false}
              height={300}
            />
            
            <Button title="Pick an video from camera roll" onPress={pickVideo} />
            <Button title="Create new video"  />

      <StatusBar style="auto" />

    </ScrollView>
    </SafeAreaView>
  );}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //fullscreen: true,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  WebViewContainer: {
    marginTop: (Platform.OS == 'android') ? 20 : 0,
  },
  buttonTitle: {
    width: 100,
    height: 100,
    backgroundColor: "#000",
  }
});