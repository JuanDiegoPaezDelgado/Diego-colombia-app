import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

type LoadingComponentProps = {
  message?: string;
};

const LoadingComponent = ({
  message = "Cargando...",
}: LoadingComponentProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007bff" />
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  messageText: {
    fontSize: 16,
    marginTop: 15,
    color: "#555",
  },
});

export default LoadingComponent;
