import React from 'react';

import { Stack } from 'expo-router';

export default function homeFeedRouter (){
  return (
    <Stack>
      {/*
      <Stack.Screen
        name="screens/homeContainer" 
        options={{headerShown: false}}
      />*/}
      <Stack.Screen
        name="screens"
        options={{headerShown: false}}
      />
    </Stack>
  );
}
