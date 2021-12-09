import React from 'react'
import { StyleSheet, View } from 'react-native';

import AudioList from '../components/AudioList';

const AudioMenu = ({ navigation, route }) => {
    return (
        <View>
            <AudioList indexPlaylist={0} navigation={navigation} />
        </View>
    )
}

export default AudioMenu

const styles = StyleSheet.create({})
