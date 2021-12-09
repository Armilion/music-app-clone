import React, { useState, useEffect, createContext } from 'react'
import { Alert } from 'react-native';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';

export const AudioContext = createContext(); // context allows to give access to specific data across all of the components, no matter how deep they are

const AudioProvider = (props) => {
    const [permissionError, setpermissionError] = useState(false)
    const [playBackObject, setPlayBackObject] = useState(new Audio.Sound);
    const [soundObject, setSoundObject] = useState({ index: 0, duration: 0, filename: "" });
    const [play, setPlay] = useState(false);
    const [libraryLength, setLibraryLength] = useState(0);
    const [playlists, setPlaylists] = useState({ name: "", list: [] });
    const [isLoading, setLoading] = useState(true);

    const getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync(); // get current permissions authorized and unauthorized from device
        if (permission.granted) {
            await getAudioFiles();
        } else if (!permission.granted && permission.canAskAgain) {
            const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync(); // request to give permission
            if (status === "denied" && canAskAgain) {
                permissionAlert();
            }
            if ("status" === "granted") {
                getAudioFiles();
            }
            if (status === "denied" && !canAskAgain) {
                setpermissionError(true)
            }
        }
    }

    const permissionAlert = () => {
        Alert.alert("Permission required", "This app needs access to your storage to play audio files", [{
            text: "Give access to storage",
            onPress: () => getPermission()
        }, {
            text: "Cancel",
            onPress: () => permissionAlert()
        }])
    }

    const getAudioFiles = async () => {
        let media = await MediaLibrary.getAssetsAsync({
            first: 5,
            mediaType: [MediaLibrary.MediaType.audio]
        });
        setPlaylists([{ name: "Audio", list: media.assets }])
        setLibraryLength(media.assets.length);
    }

    useEffect(() => {
        getPermission();
    }, []);

    useEffect(() => {
        if (playlists.length > 0) setLoading(false);
    }, [playlists]);

    if (permissionError)
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 16, textAlign: "center" }}>Cannot access local storage</Text>
            </View>)
    else
        return (
            <AudioContext.Provider value={{ /* audioFiles, */ playBackObject, soundObject, setSoundObject, play, setPlay, libraryLength, playlists, setPlaylists, isLoading }}>
                {props.children}
            </AudioContext.Provider>
        )
}

export default AudioProvider
