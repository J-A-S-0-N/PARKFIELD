import React from "react";
import { StyleSheet, View } from "react-native";
import CommentScreen from "@/components/HomecommentComponents/comment";

export default function commentContainer() {
  return (
    <View style={styles.container}>
      <CommentScreen></CommentScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  }
});
