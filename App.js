import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AudioList from './screens/AudioList';
import Player from './screens/Player';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

/*screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName;
          if (route.name === "AudioList")
            iconName = "headphones"
          else if (route.name === "Player")
            iconName = "play";
          return <FontAwesome5 name={iconName} size={24} color="purple" />
        },
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray"
      })}*/

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="AudioList" component={AudioList} />
        <Tab.Screen name="Player" component={Player} />
      </Tab.Navigator>
    </NavigationContainer >

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
