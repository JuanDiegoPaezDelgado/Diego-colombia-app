import { View, Text, Image, Button } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { lightTheme } from "../styles/theme";

const WelcomePage = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: lightTheme.background,
      }}
    >
      <Text style={{ color: lightTheme.text, fontSize: 24, marginBottom: 20 }}>
        Bienvenido a mi App
      </Text>
      <Image
        source={require("../assets/welcome.jpg")}
        style={{ width: 150, height: 150, marginBottom: 20 }}
      />
      <Link
        style={{ padding: 10, backgroundColor: "lightblue" }}
        href={"/hobbies"}
      >
        <Text>Ir al portafolio</Text>
      </Link>
    </View>
  );
};

export default WelcomePage;
