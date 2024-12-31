import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack initialRouteName="LocSearch" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="innerScreenComponents_LocSearch/searchLocationPage"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
