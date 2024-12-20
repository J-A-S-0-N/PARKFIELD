import React from 'react';
import { Stack } from 'expo-router';

export default function layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="screens"
        options={{ headerShown: false }}
       />
      {/*
      <Stack.Screen 
        name="screens/LocReview"
        options={{ 
          headerShown: false,
          //headerTitle: "",
        }}
       />
      */}
    </Stack>
  );
}
