import React from 'react';

import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import HomeFeedINDEX from '@/components/HomeFeedComponent/homeFeed';
import { useRouter } from 'expo-router';

export default function homeContainer() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <HomeFeedINDEX router={router}/>
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
