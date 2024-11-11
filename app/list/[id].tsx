import { View, Text } from "react-native";
import React from "react";
import { Stack, SearchParams } from "expo-router";

const DetailsPage = () => {
  return (
    <View>
      <Stack.Screen options={{ headerTitle: `Details ` }} />

      <Text>Details for item </Text>
    </View>
  );
};

export default DetailsPage;
