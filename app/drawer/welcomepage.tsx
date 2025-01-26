import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { styles } from "../../styles/welcome.styles";
import { StatusBar } from "expo-status-bar";

const WelcomePage = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#000000" />
      <Text style={styles.welcomeText}>Bienvenido a mi App</Text>
      <Text style={styles.welcomeText}> Espero disfrutes!!</Text>
      <Image
        source={require("../../assets/welcome.jpg")}
        style={styles.image}
      />
      {/* <Link style={[styles.link, styles.welcomeText]} href={"/hobbies"}>
        <Text>Ir al portafolio{"\n"}</Text>
        <Text>{"--------------------->"}</Text>
      </Link>
      <Link style={[styles.link, styles.welcomeText]} href={"store/mystore"}>
        <Text>Ir a la tiendita{"\n"}</Text>
        <Text>{"--------------------->"}</Text>
      </Link> */}
    </View>
  );
};

export default WelcomePage;
