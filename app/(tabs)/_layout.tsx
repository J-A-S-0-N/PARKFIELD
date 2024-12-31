import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function mainLayoutRouter() {
  return (
    <Tabs
      screenOptions={{
        //tabBarActiveTintColor: '#19C201',
        tabBarActiveTintColor: "grey",
        tabBarInactiveTintColor: "#000000",
      }}
    >
      <Tabs.Screen
        name="homeFeedContainer"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
          headerShown: false,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    //color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="activityPagesComponents"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="golf" size={24} color={color} />
          ),
          title: "",
          //tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="userStatContainer"
        options={{
          //headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clipboard-search"
              size={24}
              color={color}
            />
          ),
          //tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
