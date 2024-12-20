import { Text } from "@/components/Themed";
import React from "react";
import { StyleSheet } from "react-native";

import { View } from "react-native";

export default function settingComponentContainer(){
  return (
    <View style={styles.container}>
      <Text>add setting component here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
});
