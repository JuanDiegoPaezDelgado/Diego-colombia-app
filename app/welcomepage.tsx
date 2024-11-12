// src/screens/WelcomePage.js

import { View, Text, Image, Button } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import { lightTheme } from "../styles/theme";

const WelcomePage = () => {
  const router = useRouter();

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
      <Link href={"/hobbies"}>
        <Text>Ir al portafolio</Text>
      </Link>
    </View>
  );
};

export default WelcomePage;
