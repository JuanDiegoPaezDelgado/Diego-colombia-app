import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { styles } from "../styles/welcome.styles";

const WelcomePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido a mi App</Text>
      <Text style={styles.welcomeText}> Espero disfrutes!!</Text>
      <Image source={require("../assets/welcome.jpg")} style={styles.image} />
      <Link style={[styles.link, styles.welcomeText]} href={"/hobbies"}>
        <Text>Ir al portafolio{"\n"}</Text>
        <Text>{"--------------------->"}</Text>
      </Link>
    </View>
  );
};

export default WelcomePage;
