import React from "react";
import { StyleSheet, View } from "react-native";
import HomeDetailScreen from "@/components/HomedetailScreenComponent/detailScreen";

export default function detailScreenContainer(){
  return (
    <View style={styles.container}>
      <HomeDetailScreen></HomeDetailScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  }
});
