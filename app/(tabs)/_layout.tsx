import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

//import { useClientOnlyValue } from '@/components/useClientOnlyValue';


export default function mainLayoutRouter() {
  return (
    <Tabs
      screenOptions={{
        //headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="homeFeedContainer"
        options={{
          title: 'HOME',
          //tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
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
          title: 'PLAY',
          //tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="userStatContainer"
        options={{
          //headerShown: false,
          title: 'YOU',
          //tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
