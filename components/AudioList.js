import React, { useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native';
import { AudioContext } from '../AudioProvider';
import { StatusBar } from 'react-native';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';

const AudioList = (props) => {
    const audioContext = useContext(AudioContext);

    return (
        <View>
            <StatusBar theme="light" />
            {/* <ScrollView>
                {audioContext && !audioContext.isLoading && audioContext.playlists[props.indexPlaylist].list.map((file, index) => (
                    <ListItem key={index} bottomDivider onPress={() => props.navigation.navigate("Player", { index: index, uri: file.uri })}>
                        <Avatar rounded source={{ uri: "https://images.squarespace-cdn.com/content/v1/5d2e2c5ef24531000113c2a4/1564770283494-NFSE37KNC9HTBH88B2MP/image-asset.png?format=500w" }} />
                        <ListItem.Content>
                            <ListItem.Title>{file.filename}</ListItem.Title>
                            <ListItem.Subtitle>{Math.floor(file.duration / 60)}:{Math.floor(file.duration % 60).toString().padStart(2, '0')}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView> */}
        </View>
    )
}

export default AudioList

const styles = StyleSheet.create({})
