import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AudioList from './screens/AudioList';
import Player from './screens/Player';
import { FontAwesome5 } from '@expo/vector-icons';
import AudioProvider from './AudioProvider';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <AudioProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: () => {
            let iconName;
            if (route.name === "AudioList")
              iconName = "itunes-note"
            else if (route.name === "Player")
              iconName = "play";
            return <FontAwesome5 name={iconName} size={20} color="purple" />
          },
          tabBarActiveTintColor: "purple",
          tabBarInactiveTintColor: "gray"
        })}>
          <Tab.Screen name="AudioList" component={AudioList} options={{ title: "Audio" }} />
          <Tab.Screen name="Player" component={Player} />
        </Tab.Navigator>
      </NavigationContainer >
    </AudioProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
