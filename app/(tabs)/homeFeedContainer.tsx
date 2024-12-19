//this returns the HomeFeed to the 
import React from 'react';

import { StyleSheet } from 'react-native';

//import EditScreenInfo from '@/components/EditScreenInfo';
import { View } from '@/components/Themed';
import { TouchableOpacity } from 'react-native';

import HomeFeedINDEX from '@/components/HomeFeedComponent/homeFeed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      {/*
      <TouchableOpacity
        activeOpacity={0.93}
        onPress={() => console.log("pressed")}
      >
      */}
      <HomeFeedINDEX/>
      {/*
      </TouchableOpacity>
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
