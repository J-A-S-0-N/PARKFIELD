import React from "react";
import { View } from 'react-native';
import { Text } from "../Themed";
import { useSearchParams } from "expo-router/build/hooks";

const userSTAT: React.FC = () => {
  const { cd } = useSearchParams();
  const comments = JSON.parse( cd || "[]");
  return (
    <View>
      <Text>
        this is the user stats page 
        working...
      </Text>
    </View>
  );
}

export default userSTAT;
