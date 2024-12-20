import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack 
      initialRouteName="LocSearch"
      screenOptions={{ headerShown: false}} />
  );
}

