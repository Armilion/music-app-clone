import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { Entypo } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { TouchableOpacity } from 'react-native';
import { AudioContext } from '../AudioProvider';

const Player = ({ route }) => {
    const { audioFiles, playBackObject, soundObject: { index, duration, filename }, setSoundObject, play, setPlay, libraryLength } = useContext(AudioContext);
    const [timer, setTimer] = useState(0);

    const loadAudio = async (uri, newIndex) => {
        try {
            setSoundObject({ index: newIndex, duration: audioFiles[newIndex].duration, filename: audioFiles[newIndex].filename })
            setPlay(true);
            await playBackObject.loadAsync({ uri: uri }, { shouldPlay: true });
        } catch (e) {
            console.log("loadAudio error", e);
        }
    }

    const unloadAudio = async () => {
        setTimer(0);
        setPlay(false);
        try {
            await playBackObject.unloadAsync();
        } catch (e) {
            console.log("Unload audio error", e)
        }
    }

    const pauseAudio = async () => {
        setPlay(false);
        try {
            await playBackObject.pauseAsync();
        } catch (e) {
            console.log("playAudio error");
        }
    }

    const playAudio = async () => {
        setPlay(true)
        try {
            await playBackObject.playAsync();
        } catch (e) {
            console.log("playAudio error");
        }
    }

    const goBack = async () => {
        let time;
        if (timer > 10) {
            time = timer - 10;
            setTimer(timer - 10);
            try {
                await playBackObject.setPositionAsync(time * 1000);
            } catch (e) {
                console.log("goForward error", e);
            }
        } else {
            goPreviousSong();
        }
    };

    const goForward = async () => {
        let time;
        if (timer < duration - 10) {
            time = timer + 10;
            setTimer(timer + 10);
            try {
                await playBackObject.setPositionAsync(time * 1000);
            } catch (e) {
                console.log("goForward error", e);
            }
        } else {
            goNextSong();
        }
    }

    const goPreviousSong = () => {
        const newIndex = (index - 1 + libraryLength) % libraryLength;
        unloadAudio();
        loadAudio(audioFiles[newIndex].uri, newIndex);
    }

    const goNextSong = () => {
        const newIndex = (index + 1) % libraryLength;
        console.log(newIndex, libraryLength);
        unloadAudio();
        loadAudio(audioFiles[newIndex].uri, newIndex);
    }

    const slideSongPosition = async (value) => {
        if (playBackObject == null) return;
        try {
            console.log(value, duration)
            let newTimer = Math.floor(value * duration);
            setTimer(newTimer);
            await playBackObject.setPositionAsync(newTimer * 1000)
        } catch (e) {
            console.log("Slide position error", e);
        }
    }

    useEffect(() => {
        if (route.params) {
            loadAudio(route.params.uri, route.params.index, Math.floor(route.params.duration), route.params.filename);
        }
        return playBackObject ? unloadAudio : undefined
    }, [route.params]);


    useEffect(() => {
        let interval;
        if (play) {
            if (timer === duration) {
                setPlay(false);
                goNextSong();
            } else {
                interval = setInterval(() => {
                    setTimer(timer + 1);
                }, 1000);
            }
            return () => clearInterval(interval);
        }
    })


    const enabledButtons = (
        <View style={styles.controllers}>
            <TouchableOpacity onPress={goBack} onLongPress={goPreviousSong}>
                <Entypo name="controller-jump-to-start" size={40} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => play ? pauseAudio() : playAudio()}>
                <Entypo name={play ? "controller-paus" : "controller-play"} size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={goForward} onLongPress={goNextSong}>
                <Entypo name="controller-next" size={40} color="black" />
            </TouchableOpacity>
        </View>
    )

    const disabledButtons = (
        <View style={styles.controllers}>
            <Entypo name="controller-jump-to-start" size={40} color="lightgray" />
            <Entypo name="controller-play" size={50} color="lightgray" />
            <Entypo name="controller-next" size={40} color="lightgray" />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Avatar style={styles.avatar} source={{ uri: "https://images.squarespace-cdn.com/content/v1/5d2e2c5ef24531000113c2a4/1564770283494-NFSE37KNC9HTBH88B2MP/image-asset.png?format=500w" }} />
            </View>
            {filename !== "" ? enabledButtons : disabledButtons}
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Text ellipsizeMode="tail" style={{ alignSelf: "center" }}>{filename}</Text>
                <Slider onSlidingComplete={slideSongPosition} minimumValue={0} maximumValue={1} value={filename === "" ? 0 : (timer / duration)} style={styles.sliderContainer} thumbStyle={styles.thumbStyleSlider} />
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>{`${Math.floor(timer / 60).toString().padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`}</Text>
                    <Text>{`${Math.floor(duration / 60).toString().padStart(2, '0')}:${(Math.floor(duration) % 60).toString().padStart(2, '0')}`}</Text>
                </View>
            </View>
        </View>
    )
}

export default Player

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: 50
    },
    avatarContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        width: 250,
        height: 250
    },
    controllers: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    sliderContainer: {
        padding: 7,
    },
    thumbStyleSlider: {
        backgroundColor: "purple",
        height: 10,
        width: 10,
        borderRadius: 10
    }
})
