import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input, Overlay } from 'react-native-elements';
import { AudioContext } from '../AudioProvider';

const Playlist = ({ navigation }) => {
    const { playlists, setPlaylists } = useContext(AudioContext);
    const [overlayVisibility, setOverlayVisibility] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [error, setError] = useState("");

    const addPlaylist = () => {
        if (playlists.findIndex((playlist) => playlist.name === newPlaylistName) !== -1)
            setError("Playlist already exists");
        else {
            setPlaylists([...playlists, { name: newPlaylistName, list: [] }]);
            setOverlayVisibility(false);
            setNewPlaylistName("");
            setError("");
        }
    }

    return (
        <View>
            <Button title="+ Add playlist" buttonStyle={{ backgroundColor: "purple" }} onPress={() => setOverlayVisibility(true)} />
            {playlists.map((playlist, index) => {
                if (index !== 0)
                    return (
                        <View key={playlist.name}>
                            <Text>{playlist.name}</Text>
                        </View>
                    )
            })}
            <Overlay isVisible={overlayVisibility} /* overlayStyle={{ width: 300, height: 150, justifyContent: "center" }} */ onBackdropPress={() => { setNewPlaylistName(""); setOverlayVisibility(false) }}>
                <Input containerStyle={{ width: 300, height: 100, justifyContent: "center" }} placeholder="Playlist name" onChangeText={(value) => setNewPlaylistName(value)} value={newPlaylistName} onEndEditing={addPlaylist} errorMessage={error} />
            </Overlay>
        </View >
    )
}

export default Playlist

const styles = StyleSheet.create({})
